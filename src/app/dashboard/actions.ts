"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Deletes a meal belonging to the currently authenticated user
export async function deleteMeal(
  formData: FormData
) {
  // Get the currently logged-in user's Clerk ID
  const { userId } = await auth();

  // Prevent unauthenticated users from deleting meals
  if (!userId) {
    throw new Error("Unauthorized");
  }

  // Retrieve the meal ID from the form submission
  const mealId = formData.get(
    "mealId"
  ) as string;

  // Find the meal in the database
  const meal = await prisma.meal.findUnique({
    where: {
      id: mealId,
    },
  });

  // Ensure the meal exists before attempting deletion
  if (!meal) {
    throw new Error("Meal not found");
  }

  // Verify that the meal belongs to the current user
  // This prevents users from deleting other users' meals
  if (meal.userId !== userId) {
    throw new Error("Unauthorized");
  }

  // Delete the meal from the database
  await prisma.meal.delete({
    where: {
      id: mealId,
    },
  });

  // Clear the cached dashboard page so fresh data is shown
  revalidatePath("/dashboard");

  // Redirect the user back to the dashboard
  redirect("/dashboard");
}