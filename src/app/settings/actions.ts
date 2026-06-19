"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Updates the authenticated user's daily calorie goal
export async function updateGoal(
    formData: FormData
) {
    // Get the currently authenticated user's Clerk ID
    const { userId } = await auth();

    // Prevent unauthenticated users from updating goals
    if (!userId) {
        throw new Error("Unauthorized");
    }

    // Convert the submitted calorie goal from a string to a number
    const calorieGoal = Number(
        formData.get("calorieGoal")
    );

    // Update the user's calorie goal in the database
    await prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            calorieGoal,
        },
    });

    // Refresh cached pages that display calorie goal data
    revalidatePath("/dashboard");
    revalidatePath("/settings");

    // Return the user to the dashboard after saving changes
    redirect("/dashboard");
}