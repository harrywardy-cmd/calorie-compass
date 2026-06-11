import { createMeal } from "./actions";

export default function NewMealPage() {
  return (
    <main className="max-w-xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">
        Add Meal
      </h1>

      <form action={createMeal} className="space-y-4">
        <div>
          <label className="block mb-2">
            Meal Name
          </label>

          <input
            name="mealName"
            required
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block mb-2">
            Calories
          </label>

          <input
            name="calories"
            type="number"
            required
            className="w-full border rounded p-2"
          />
        </div>

        <button
          type="submit"
          className="border rounded px-4 py-2"
        >
          Save Meal
        </button>
      </form>
    </main>
  );
}