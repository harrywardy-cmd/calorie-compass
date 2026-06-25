"use server";

import { prisma } from "@/lib/prisma";
import { ROUTES } from "@/lib/routes";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Updates an existing meal
export async function updateMeal(
  mealId: string,
  formData: FormData
) {
  // =====================================================
  // Basic meal information
  // =====================================================

  const mealName =
    formData.get("mealName") as string;

  const mealType =
    formData.get("mealType") as string;

  const calories = Number(
    formData.get("calories")
  );

  // =====================================================
  // Nutrition values
  // =====================================================

  const protein = Number(
    formData.get("protein")
  );

  const carbs = Number(
    formData.get("carbs")
  );

  const fat = Number(
    formData.get("fat")
  );

  // =====================================================
  // AI metadata
  // =====================================================

  const confidence = Number(
    formData.get("confidence")
  );

  const aiGenerated =
    formData.get("aiGenerated") ===
    "true";

  // =====================================================
  // Update meal
  // =====================================================

  await prisma.meal.update({
    where: {
      id: mealId,
    },
    data: {
      mealName,
      mealType,
      calories,
      protein,
      carbs,
      fat,
      confidence,
      aiGenerated,
    },
  });

  // =====================================================
  // Refresh pages
  // =====================================================

  revalidatePath("/dashboard");
  revalidatePath("/meals");
  revalidatePath(
    `/meals/${mealId}/edit`
  );

  // =====================================================
  // Return user to dashboard
  // =====================================================
  const redirectTo =
    (formData.get("redirectTo") as string) ??
    ROUTES.dashboard;

  redirect(
    `${redirectTo}?success=meal-updated&meal=${encodeURIComponent(
      mealName
    )}`
  );
}