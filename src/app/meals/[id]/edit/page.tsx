import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { updateMeal } from "./actions";

export default async function EditMealPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const meal = await prisma.meal.findUnique({
    where: {
      id,
    },
  });

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
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-8 text-white">
          <h1 className="text-4xl font-bold">
            ✏️ Edit Meal
          </h1>

          <p className="mt-2 text-orange-100">
            Update your meal information and nutrition details.
          </p>
        </div>

        {/* Form */}
        <div className="p-8">
          <form
            action={updateMeal.bind(
              null,
              meal.id
            )}
            className="space-y-6"
          >
            {/* Meal Name */}
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

            {/* Calories */}
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

            {/* Meal Type */}
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

            {/* Meal Info */}
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

            {/* Buttons */}
            <div className="flex justify-end gap-4 pt-4">
              <Link
                href="/dashboard"
                className="rounded-xl border px-6 py-3 font-medium hover:bg-gray-100 transition"
              >
                Cancel
              </Link>

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