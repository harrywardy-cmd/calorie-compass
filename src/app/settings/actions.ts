"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Updates one of the authenticated user's nutrition goals
export async function updateNutritionGoal(
  formData: FormData
) {
  // Get the currently authenticated user's Clerk ID
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  // Get the goal name and value from the submitted form
  const goal = formData.get("goal") as string;
  const value = Number(formData.get("value"));

  // Only allow these fields to be updated
  const allowedGoals = [
    "calorieGoal",
    "proteinGoal",
    "carbGoal",
    "fatGoal",
  ] as const;

  if (!allowedGoals.includes(goal as (typeof allowedGoals)[number])) {
    throw new Error("Invalid goal");
  }

  // Update the selected goal
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      [goal]: value,
    },
  });

  // Refresh pages that use this data
  revalidatePath("/settings");
  revalidatePath("/dashboard");
}

// Updates one of the authenticated user's regional settings
export async function updateRegionalSetting(
  formData: FormData
) {
  // Get the currently authenticated user's Clerk ID
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  // Get the setting name and value from the submitted form
  const setting = formData.get("setting") as string;
  const value = formData.get("value") as string;

  // Only allow these fields to be updated
  const allowedSettings = [
    "timezone",
    "weekStartsOn",
    "dateFormat",
  ] as const;

  if (
    !allowedSettings.includes(
      setting as (typeof allowedSettings)[number]
    )
  ) {
    throw new Error("Invalid regional setting");
  }

  // Update the selected setting
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      [setting]: value,
    },
  });

  // Refresh pages that use this data
  revalidatePath("/settings");
  revalidatePath("/dashboard");
}