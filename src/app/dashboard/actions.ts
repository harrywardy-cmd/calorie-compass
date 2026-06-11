"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function deleteMeal(formData: FormData) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const mealId = formData.get("mealId") as string;

  console.log("Deleting meal:", mealId);

  const meal = await prisma.meal.findUnique({
    where: {
      id: mealId,
    },
  });

  if (!meal) {
    throw new Error("Meal not found");
  }

  if (meal.userId !== userId) {
    throw new Error("Unauthorized");
  }

  await prisma.meal.delete({
    where: {
      id: mealId,
    },
  });

  revalidatePath("/dashboard");
}