"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

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

  // Convert calories from a string to a number
  const calories = Number(
    formData.get("calories")
  );

  // Get the selected meal type (Breakfast, Lunch, Dinner, Snack)
  const mealType = formData.get("mealType") as string;

  // Create a new meal record in the database
  await prisma.meal.create({
    data: {
      // Associate the meal with the current user
      userId,

      // Meal details entered by the user
      mealName,
      mealType,
      calories,

      // Default nutrition values
      // These can be updated later if nutrition tracking is added
      protein: 0,
      carbs: 0,
      fat: 0,

      // Placeholder image URL
      imageUrl: "",
    },
  });

  // Redirect back to the dashboard with success parameters
  // These parameters can be used to display a toast notification
  redirect(
    `/dashboard?success=meal-added&meal=${encodeURIComponent(
      mealName
    )}&calories=${calories}`
  );
}