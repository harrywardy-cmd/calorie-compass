"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createMealDate } from "@/utils/date";

// Creates a new meal and associates it with the currently logged-in user
export async function createMeal(formData: FormData) {
  // Get the authenticated user's Clerk ID
  const { userId } = await auth();

  // Prevent unauthenticated users from creating meals
  if (!userId) {
    throw new Error("Unauthorized");
  }

  // Fetch the user's regional settings
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      timezone: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // Extract form values submitted by the user
  const mealName = formData.get("mealName") as string;

  const calories = Number(
    formData.get("calories")
  );

  const mealType = formData.get("mealType") as string;

  // Optional meal date selected by the user
  const mealDate = formData.get(
    "mealDate"
  ) as string;

  // Nutrition values
  const protein = Number(
    formData.get("protein") ?? 0
  );

  const carbs = Number(
    formData.get("carbs") ?? 0
  );

  const fat = Number(
    formData.get("fat") ?? 0
  );

  // AI values (optional)
  const confidenceValue =
    formData.get("confidence");

  const confidence = confidenceValue
    ? Number(confidenceValue)
    : null;

  const aiGenerated =
    formData.get("aiGenerated") ===
    "true";

  // Create the meal date using the user's selected timezone
  const createdAt = createMealDate(
    mealDate,
    user.timezone
  );

  // Create a new meal record in the database
  await prisma.meal.create({
    data: {
      userId,

      mealName,
      mealType,

      calories,
      protein,
      carbs,
      fat,

      confidence,
      aiGenerated,

      createdAt,
      timeZone: user.timezone,

      imageUrl: null,
    },
  });

  // Refresh cached pages so the new meal appears immediately
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/history");

  // Redirect back to dashboard
  redirect(
    `/dashboard?success=meal-added&meal=${encodeURIComponent(
      mealName
    )}&calories=${calories}`
  );
}