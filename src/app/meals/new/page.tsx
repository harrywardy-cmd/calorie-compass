import LoadingLink from "@/components/ui/LoadingLink";
import { createMeal } from "./actions";
import SubmitButton from "@/components/ui/SubmitButton";

// Page for creating a new meal entry
export default function NewMealPage() {
  return (
    <main className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md p-4">
      <div className="w-full max-w-2xl rounded-3xl bg-white shadow-2xl border overflow-hidden">

        {/* Page header */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-8 text-white">
          <h1 className="text-4xl font-bold">
            🍽️ Add Meal
          </h1>

          <p className="mt-2 text-blue-100">
            Track your nutrition and stay on course.
          </p>
        </div>

        {/* Meal creation form */}
        <div className="p-8">
          <form
            // Submits the form data to the createMeal server action
            action={createMeal}
            className="space-y-6"
          >
            {/* Input field for the meal name */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Meal Name
              </label>

              <input
                name="mealName"
                required
                placeholder="Chicken Wrap"
                className="w-full rounded-xl border border-gray-300 p-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Input field for calorie count */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Calories
              </label>

              <input
                name="calories"
                type="number"
                required
                placeholder="650"
                className="w-full rounded-xl border border-gray-300 p-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Dropdown menu for selecting the meal category */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Meal Type
              </label>

              <select
                name="mealType"
                required
                className="w-full rounded-xl border border-gray-300 p-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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

            {/* Placeholder section for future AI-powered meal recognition */}
            <div className="rounded-2xl border border-dashed border-blue-300 bg-blue-50 p-6">
              <h3 className="font-semibold text-blue-900">
                🤖 AI Meal Scanner
              </h3>

              <p className="text-sm text-blue-700 mt-2">
                Coming soon: Upload a photo and let AI estimate calories
                automatically.
              </p>
            </div>

            {/* Form action buttons */}
            <div className="flex justify-end gap-4 pt-4">

              {/* Return to dashboard without creating a meal */}
              <LoadingLink
                href="/dashboard"
                className="rounded-xl border px-6 py-3 font-medium hover:bg-gray-100 transition"
              >
                Cancel
              </LoadingLink>

              {/* Submit the form and save the meal */}
              <SubmitButton
                loadingText="Saving Meal..."
                className="
    rounded-xl
    bg-blue-600
    hover:bg-blue-700
    text-white
    px-6
    py-3
    font-medium
    transition
    min-w-[170px]
  "
              >
                Save Meal
              </SubmitButton>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}