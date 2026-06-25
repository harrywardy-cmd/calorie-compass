"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ROUTES } from "@/lib/routes";

// Deletes a meal belonging to the currently authenticated user
export async function deleteMeal(
  formData: FormData
) {
  // Get the currently logged-in user's Clerk ID
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  // Retrieve values from the form
  const mealId = formData.get(
    "mealId"
  ) as string;

const redirectTo =
  (formData.get("redirectTo") as string) ??
  ROUTES.dashboard;

  // Validate the meal ID
  if (!mealId) {
    throw new Error("Meal ID is missing");
  }

  // Find the meal
  const meal = await prisma.meal.findUnique({
    where: {
      id: mealId,
    },
  });

  if (!meal) {
    throw new Error("Meal not found");
  }

  // Ensure the meal belongs to the logged-in user
  if (meal.userId !== userId) {
    throw new Error("Unauthorized");
  }

  // Delete the meal
  await prisma.meal.delete({
    where: {
      id: mealId,
    },
  });

  // Refresh the page the user came from
  revalidatePath(redirectTo);

  // Redirect back to that page
  redirect(redirectTo);
}