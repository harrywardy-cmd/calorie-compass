"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

// Creates a new meal and associates it with the currently logged-in user
export async function createMeal(formData: FormData) {
  // Get the authenticated user's Clerk ID
  const { userId } = await auth();

  // Prevent unauthenticated users from creating meals
  if (!userId) {
    throw new Error("Unauthorized");
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

  // Use the selected meal date if provided.
  // Otherwise, default to the current date and time.
  const createdAt = mealDate
    ? (() => {
      const selectedDate = new Date(mealDate);
      const now = new Date();

      // Preserve the current time so meals appear
      // naturally within the selected day.
      selectedDate.setHours(
        now.getHours(),
        now.getMinutes(),
        now.getSeconds(),
        now.getMilliseconds()
      );

      return selectedDate;
    })()
    : new Date();
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

      imageUrl: null,
    },
  });
  // Refresh the dashboard cache so the new meal appears immediately
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/history");

  // Redirect back to dashboard
  redirect(
    `/dashboard?success=meal-added&meal=${encodeURIComponent(
      mealName
    )}&calories=${calories}`
  );
}