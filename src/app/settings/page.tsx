import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateGoal } from "./actions";

export default async function SettingsPage() {
    const { userId } = await auth();

    if (!userId) {
        redirect("/sign-in");
    }

    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
    });

    return (
        <main className="max-w-2xl mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6">
                Settings
            </h1>

            <form action={updateGoal}>
                <label className="block mb-2">
                    Daily Calorie Goal
                </label>

                <input
                    name="calorieGoal"
                    type="number"
                    defaultValue={user?.calorieGoal}
                    className="w-full border rounded p-3"
                />
                <button
                    type="submit"
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                >
                    save Goal
                </button>

            </form>
        </main>
    );
}