import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateGoal } from "./actions";

// Settings page for managing user preferences
export default async function SettingsPage() {
  // Get the currently authenticated user's Clerk ID
  const { userId } = await auth();

  // Redirect unauthenticated users to the sign-in page
  if (!userId) {
    redirect("/sign-in");
  }

  // Fetch the user's settings and profile data from the database
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-8">

        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold">
            ⚙️ Settings
          </h1>

          <p className="text-gray-500 mt-2">
            Customize your Calorie Compass experience.
          </p>
        </div>

        {/* Card for updating daily calorie goals */}
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

          <form
            // Submits the updated goal to the server action
            action={updateGoal}
            className="space-y-6"
          >
            {/* Input field for calorie goal */}
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

                // Restrict values to a reasonable calorie range
                min="500"
                max="10000"

                // Populate input with the user's current goal
                defaultValue={user?.calorieGoal}
                className="w-full rounded-xl border p-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Suggested calorie goal presets */}
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

            {/* Form action buttons */}
            <div className="flex justify-end gap-4 pt-4">

              {/* Return to dashboard without saving changes */}
              <a
                href="/dashboard"
                className="border rounded-xl px-5 py-3 hover:bg-gray-100"
              >
                Cancel
              </a>

              {/* Save the updated calorie goal */}
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
              >
                Save Goal
              </button>
            </div>
          </form>
        </div>

        {/* Displays the user's currently active calorie goal */}
        <div className="bg-white border rounded-2xl shadow-sm p-8 mt-6">
          <h2 className="text-xl font-semibold mb-3">
            Current Goal
          </h2>

          <div className="flex items-center justify-between">
            <div>
              {/* Display the current calorie goal with formatting */}
              <p className="text-5xl font-bold">
                {user?.calorieGoal.toLocaleString()}
              </p>

              <p className="text-gray-500 mt-2">
                calories per day
              </p>
            </div>

            {/* Visual goal indicator */}
            <div className="text-6xl">
              🎯
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}