"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateGoal(
    formData: FormData
) {
    const { userId } = await auth();

    if (!userId) {
        throw new Error("Unauthorized");
    }

    const calorieGoal = Number(
        formData.get("calorieGoal")
    );

    await prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            calorieGoal,
        },
    });
    revalidatePath("/dashboard");
    revalidatePath("/settings");

    redirect("/dashboard");
}