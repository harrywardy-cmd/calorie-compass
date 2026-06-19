"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Updates an existing meal with new information
export async function updateMeal(
  mealId: string,
  formData: FormData
) {
  // Extract the updated meal name from the form
  const mealName = formData.get("mealName") as string;

  // Convert the calories value from a string to a number
  const calories = Number(
    formData.get("calories")
  );

  // Update the meal record in the database
  await prisma.meal.update({
    where: {
      id: mealId,
    },
    data: {
      mealName,
      calories,
    },
  });

  // Refresh the dashboard cache so the latest data is displayed
  revalidatePath("/dashboard");

  // Redirect the user back to the dashboard after updating
  redirect("/dashboard");
}