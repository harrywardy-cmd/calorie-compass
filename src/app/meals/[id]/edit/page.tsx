import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { updateMeal } from "./actions";

// Edit Meal page component
// Displays a form allowing users to update an existing meal
export default async function EditMealPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Extract the meal ID from the route parameters
  const { id } = await params;

  // Fetch the meal from the database
  const meal = await prisma.meal.findUnique({
    where: {
      id,
    },
  });

  // Show a friendly error page if the meal doesn't exist
  if (!meal) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="bg-white border rounded-2xl p-8 shadow">
          <h1 className="text-2xl font-bold">
            Meal Not Found
          </h1>

          <Link
            href="/dashboard"
            className="inline-block mt-4 text-blue-600"
          >
            Return to Dashboard
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md p-4">
      <div className="w-full max-w-2xl rounded-3xl bg-white shadow-2xl border overflow-hidden">

        {/* Page header */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-8 text-white">
          <h1 className="text-4xl font-bold">
            ✏️ Edit Meal
          </h1>

          <p className="mt-2 text-orange-100">
            Update your meal information and nutrition details.
          </p>
        </div>

        {/* Edit meal form */}
        <div className="p-8">
          <form
            // Bind the meal ID so the server action knows which meal to update
            action={updateMeal.bind(
              null,
              meal.id
            )}
            className="space-y-6"
          >
            {/* Input for updating the meal name */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Meal Name
              </label>

              <input
                name="mealName"
                defaultValue={meal.mealName}
                required
                className="w-full rounded-xl border border-gray-300 p-4 text-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* Input for updating calorie count */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Calories
              </label>

              <input
                name="calories"
                type="number"
                defaultValue={meal.calories}
                required
                className="w-full rounded-xl border border-gray-300 p-4 text-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* Dropdown for selecting meal type */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Meal Type
              </label>

              <select
                name="mealType"
                defaultValue={meal.mealType ?? ""}
                className="w-full rounded-xl border border-gray-300 p-4 text-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">
                  Select Meal Type
                </option>

                <option value="Breakfast">
                  🍳 Breakfast
                </option>

                <option value="Lunch">
                  🥪 Lunch
                </option>

                <option value="Dinner">
                  🍝 Dinner
                </option>

                <option value="Snack">
                  🍎 Snack
                </option>
              </select>
            </div>

            {/* Displays information about the current meal */}
            <div className="rounded-2xl border border-orange-200 bg-orange-50 p-6">
              <h3 className="font-semibold text-orange-900">
                📊 Current Meal
              </h3>

              <p className="text-sm text-orange-700 mt-2">
                Created:{" "}
                {new Date(
                  meal.createdAt
                ).toLocaleDateString()}
              </p>

              <p className="text-sm text-orange-700">
                Current Calories: {meal.calories}
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex justify-end gap-4 pt-4">

              {/* Return to dashboard without saving */}
              <Link
                href="/dashboard"
                className="rounded-xl border px-6 py-3 font-medium hover:bg-gray-100 transition"
              >
                Cancel
              </Link>

              {/* Submit the form and save changes */}
              <button
                type="submit"
                className="rounded-xl bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 font-medium transition"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}