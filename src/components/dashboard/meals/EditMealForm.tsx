"use client";

import { Meal } from "@prisma/client";
import { updateMeal } from "@/app/meals/[id]/edit/actions";

type EditMealFormProps = {
  meal: Meal;
};

export default function EditMealForm({ meal }: EditMealFormProps) {
  const updateMealAction = updateMeal.bind(null, meal.id);

  return (
    <form action={updateMealAction} className="space-y-6">
      {/* Return to dashboard after save */}
      <input type="hidden" name="redirectTo" value="/dashboard" />

      {/* AI Metadata */}
      <input
        type="hidden"
        name="confidence"
        defaultValue={meal.confidence ?? 0}
      />

      <input
        type="hidden"
        name="aiGenerated"
        defaultValue={String(meal.aiGenerated)}
      />

      {/* Meal Name */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Meal Name
        </label>

        <input
          name="mealName"
          defaultValue={meal.mealName}
          required
          className="
            w-full
            rounded-xl
            border
            border-gray-200
            px-4
            py-3
            focus:border-blue-500
            focus:outline-none
          "
        />
      </div>

      {/* Meal Type */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Meal Type
        </label>

        <select
          name="mealType"
          defaultValue={meal.mealType ?? ""}
          className="
            w-full
            rounded-xl
            border
            border-gray-200
            px-4
            py-3
            focus:border-blue-500
            focus:outline-none
          "
        >
          <option>Breakfast</option>
          <option>Lunch</option>
          <option>Dinner</option>
          <option>Snack</option>
        </select>
      </div>

      {/* Nutrition */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Calories
          </label>

          <input
            type="number"
            name="calories"
            defaultValue={meal.calories}
            className="
              w-full
              rounded-xl
              border
              border-gray-200
              px-4
              py-3
            "
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Protein (g)
          </label>

          <input
            type="number"
            step="0.1"
            name="protein"
            defaultValue={meal.protein ?? 0}
            className="
              w-full
              rounded-xl
              border
              border-gray-200
              px-4
              py-3
            "
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Carbs (g)
          </label>

          <input
            type="number"
            step="0.1"
            name="carbs"
            defaultValue={meal.carbs ?? 0}
            className="
              w-full
              rounded-xl
              border
              border-gray-200
              px-4
              py-3
            "
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Fat (g)
          </label>

          <input
            type="number"
            step="0.1"
            name="fat"
            defaultValue={meal.fat ?? 0}
            className="
              w-full
              rounded-xl
              border
              border-gray-200
              px-4
              py-3
            "
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 pt-4">
        <button
          type="reset"
          className="
            rounded-xl
            border
            px-5
            py-3
            font-medium
            hover:bg-gray-50
          "
        >
          Reset
        </button>

        <button
          type="submit"
          className="
            rounded-xl
            bg-blue-600
            px-5
            py-3
            font-medium
            text-white
            transition
            hover:bg-blue-700
          "
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}
