"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function createMeal(formData: FormData) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const mealName = formData.get("mealName") as string;
  const calories = Number(formData.get("calories"));

  await prisma.meal.create({
    data: {
      userId,
      mealName,
      calories,
      protein: 0,
      carbs: 0,
      fat: 0,
      imageUrl: "",
    },
  });
}