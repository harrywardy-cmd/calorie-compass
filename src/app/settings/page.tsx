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
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold">
            ⚙️ Settings
          </h1>

          <p className="text-gray-500 mt-2">
            Customize your Calorie Compass experience.
          </p>
        </div>

        {/* Goal Card */}
        <div className="bg-white border rounded-2xl shadow-sm p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold">
              Daily Calorie Goal
            </h2>

            <p className="text-gray-500 mt-1">
              Set your daily calorie target. Your dashboard
              progress bar and mascot will use this value.
            </p>
          </div>

          <form action={updateGoal} className="space-y-6">
            <div>
              <label
                htmlFor="calorieGoal"
                className="block text-sm font-medium mb-2"
              >
                Goal (kcal)
              </label>

              <input
                id="calorieGoal"
                name="calorieGoal"
                type="number"
                min="500"
                max="10000"
                defaultValue={user?.calorieGoal}
                className="w-full rounded-xl border p-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Quick Presets */}
            <div>
              <p className="text-sm font-medium mb-3">
                Common Goals
              </p>

              <div className="flex flex-wrap gap-3">
                <div className="rounded-full border px-4 py-2 text-sm">
                  1800 kcal
                </div>

                <div className="rounded-full border px-4 py-2 text-sm">
                  2200 kcal
                </div>

                <div className="rounded-full border px-4 py-2 text-sm">
                  2500 kcal
                </div>

                <div className="rounded-full border px-4 py-2 text-sm">
                  3000 kcal
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <a
                href="/dashboard"
                className="border rounded-xl px-5 py-3 hover:bg-gray-100"
              >
                Cancel
              </a>

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
              >
                Save Goal
              </button>
            </div>
          </form>
        </div>

        {/* Preview Card */}
        <div className="bg-white border rounded-2xl shadow-sm p-8 mt-6">
          <h2 className="text-xl font-semibold mb-3">
            Current Goal
          </h2>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-5xl font-bold">
                {user?.calorieGoal.toLocaleString()}
              </p>

              <p className="text-gray-500 mt-2">
                calories per day
              </p>
            </div>

            <div className="text-6xl">
              🎯
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}