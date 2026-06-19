import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateGoal } from "./actions";
import CalorieGoalForm from "./CalorieGoalForm";

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

        <CalorieGoalForm
          defaultGoal={user?.calorieGoal ?? 2200}
          updateGoal={updateGoal}
        />
        </div>

        {/* Displays the user's currently active calorie goal */}
        <div className="bg-gradient-to-br from-blue-600 to-cyan-500 text-white rounded-3xl p-8 shadow-lg mb-6">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-blue-100 text-sm">
                Current Goal
              </p>

              <p className="text-5xl font-bold mt-2">
                {user?.calorieGoal.toLocaleString()}
              </p>

              <p className="text-blue-100 mt-2">
                calories per day
              </p>
            </div>

            <div className="text-7xl">
              🎯
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}