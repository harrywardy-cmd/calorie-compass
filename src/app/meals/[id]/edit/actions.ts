"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateMeal(
  mealId: string,
  formData: FormData
) {
  const mealName = formData.get("mealName") as string;

  const calories = Number(
    formData.get("calories")
  );

  await prisma.meal.update({
    where: {
      id: mealId,
    },
    data: {
      mealName,
      calories,
    },
  });

  revalidatePath("/dashboard");

  redirect("/dashboard");
}