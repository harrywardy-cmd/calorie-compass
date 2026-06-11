import Link from "next/link";
import { createMeal } from "./actions";

export default function NewMealPage() {
  return (
    <main className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl border p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">
            Add Meal
          </h1>

          <p className="text-gray-500 mt-2">
            Log a meal and track your daily nutrition.
          </p>
        </div>

        <form action={createMeal} className="space-y-5">
          <div>
            <label className="block mb-2 text-sm font-medium">
              Meal Name
            </label>

            <input
              name="mealName"
              required
              placeholder="Chicken Wrap"
              className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              Calories
            </label>

            <input
              name="calories"
              type="number"
              required
              placeholder="650"
              className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              Meal Type
            </label>

            <select
              name="mealType"
              required
              className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-black"
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

          <div className="flex justify-end gap-3 pt-4">
            <Link
              href="/dashboard"
              className="rounded-lg border px-4 py-2 hover:bg-gray-100"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="rounded-lg bg-black text-white px-5 py-2 hover:bg-gray-800"
            >
              Save Meal
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}