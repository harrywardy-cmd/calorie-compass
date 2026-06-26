"use client";

import SubmitButton from "./SubmitButton";

import { Meal } from "@prisma/client";
import {
  Beef,
  Flame,
  Salad,
  UtensilsCrossed,
  Wheat,
  Pencil,
} from "lucide-react";

import { updateMeal } from "@/app/meals/[id]/edit/actions";

type EditMealFormProps = {
  meal: Meal;
};

export default function EditMealForm({ meal }: EditMealFormProps) {
  const updateMealAction = updateMeal.bind(null, meal.id);

  return (
    <form action={updateMealAction} className="space-y-8">
      {/* ==========================================
          Hidden Fields
      ========================================== */}

      <input type="hidden" name="redirectTo" value="/dashboard" />

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

      {/* ==========================================
          Header
      ========================================== */}

      <section
        className="
          overflow-hidden
          rounded-3xl
          border
          bg-gradient-to-r
          from-blue-50
          via-white
          to-indigo-50
          shadow-sm
        "
      >
        <div className="flex items-center gap-5 p-6">
          {/* Meal Icon */}

          <div
            className="
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-2xl
              bg-white
              shadow-sm
            "
          >
            <Pencil size={28} className="text-blue-600" />
          </div>

          {/* Title */}

          <div className="flex-1">
            <h2
              className="
                text-2xl
                font-bold
                text-gray-900
              "
            >
              Edit Meal
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Update your meal information and nutrition values.
            </p>
          </div>

          {/* Summary */}

          <div className="hidden text-right md:block">
            <p
              className="
                text-lg
                font-semibold
                text-gray-900
              "
            >
              {meal.mealName}
            </p>

            <p className="text-sm text-gray-500">
              {meal.mealType} • {meal.calories} kcal
            </p>
          </div>
        </div>
      </section>

      {/* ==========================================
    Meal Details
========================================== */}

      <section
        className="
    rounded-3xl
    border
    bg-white
    p-6
    shadow-sm
  "
      >
        <div className="mb-6">
          <h3
            className="
        text-lg
        font-semibold
        text-gray-900
      "
          >
            Meal Details
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Give your meal a name and choose the meal category.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Meal Name */}

          <div>
            <label
              className="
          mb-2
          block
          text-sm
          font-semibold
          text-gray-700
        "
            >
              Meal Name
            </label>

            <input
              type="text"
              name="mealName"
              required
              defaultValue={meal.mealName}
              placeholder="Chicken Burrito"
              className="
          w-full
          rounded-2xl
          border
          border-gray-200
          bg-gray-50
          px-4
          py-3
          shadow-sm
          transition-all
          duration-200
          focus:border-blue-500
          focus:bg-white
          focus:outline-none
          focus:ring-4
          focus:ring-blue-100
        "
            />
          </div>

          {/* Meal Type */}

          <div>
            <label
              className="
          mb-2
          block
          text-sm
          font-semibold
          text-gray-700
        "
            >
              Meal Type
            </label>

            <div className="relative">
              <UtensilsCrossed
                size={18}
                className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-blue-500
          "
              />

              <select
                name="mealType"
                defaultValue={meal.mealType ?? ""}
                className="
            w-full
            appearance-none
            rounded-2xl
            border
            border-gray-200
            bg-gray-50
            py-3
            pl-12
            pr-10
            shadow-sm
            transition-all
            duration-200
            focus:border-blue-500
            focus:bg-white
            focus:outline-none
            focus:ring-4
            focus:ring-blue-100
          "
              >
                <option value="Breakfast">Breakfast</option>

                <option value="Lunch">Lunch</option>

                <option value="Dinner">Dinner</option>

                <option value="Snack">Snack</option>
              </select>

              <svg
                className="
            pointer-events-none
            absolute
            right-4
            top-1/2
            h-5
            w-5
            -translate-y-1/2
            text-gray-400
          "
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>
      {/* ==========================================
    Nutrition
========================================== */}

      <section
        className="
    rounded-3xl
    border
    bg-white
    p-6
    shadow-sm
  "
      >
        <div className="mb-6">
          <h3
            className="
        text-lg
        font-semibold
        text-gray-900
      "
          >
            Nutrition
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Update the nutritional values for this meal.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {/* Calories */}

          <div
            className="
        rounded-2xl
        border
        border-orange-100
        bg-orange-50/60
        p-5
        transition
        hover:border-orange-200
      "
          >
            <div className="mb-4 flex items-center gap-3">
              <div
                className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            bg-orange-100
          "
              >
                <Flame size={20} className="text-orange-600" />
              </div>

              <div>
                <p className="font-semibold text-gray-900">Calories</p>

                <p className="text-xs text-gray-500">kcal</p>
              </div>
            </div>

            <input
              type="number"
              name="calories"
              min={0}
              defaultValue={meal.calories}
              className="
          w-full
          rounded-xl
          border
          border-orange-100
          bg-white
          px-4
          py-3
          text-lg
          font-semibold
          shadow-sm
          transition
          focus:border-orange-400
          focus:outline-none
          focus:ring-4
          focus:ring-orange-100
        "
            />
          </div>

          {/* Protein */}

          <div
            className="
        rounded-2xl
        border
        border-red-100
        bg-red-50/60
        p-5
        transition
        hover:border-red-200
      "
          >
            <div className="mb-4 flex items-center gap-3">
              <div
                className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            bg-red-100
          "
              >
                <Beef size={20} className="text-red-600" />
              </div>

              <div>
                <p className="font-semibold text-gray-900">Protein</p>

                <p className="text-xs text-gray-500">grams</p>
              </div>
            </div>

            <input
              type="number"
              name="protein"
              step="0.1"
              min={0}
              defaultValue={meal.protein ?? 0}
              className="
          w-full
          rounded-xl
          border
          border-red-100
          bg-white
          px-4
          py-3
          text-lg
          font-semibold
          shadow-sm
          transition
          focus:border-red-400
          focus:outline-none
          focus:ring-4
          focus:ring-red-100
        "
            />
          </div>

          {/* Carbs */}

          <div
            className="
        rounded-2xl
        border
        border-amber-100
        bg-amber-50/60
        p-5
        transition
        hover:border-amber-200
      "
          >
            <div className="mb-4 flex items-center gap-3">
              <div
                className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            bg-amber-100
          "
              >
                <Wheat size={20} className="text-amber-600" />
              </div>

              <div>
                <p className="font-semibold text-gray-900">Carbohydrates</p>

                <p className="text-xs text-gray-500">grams</p>
              </div>
            </div>

            <input
              type="number"
              name="carbs"
              step="0.1"
              min={0}
              defaultValue={meal.carbs ?? 0}
              className="
          w-full
          rounded-xl
          border
          border-amber-100
          bg-white
          px-4
          py-3
          text-lg
          font-semibold
          shadow-sm
          transition
          focus:border-amber-400
          focus:outline-none
          focus:ring-4
          focus:ring-amber-100
        "
            />
          </div>

          {/* Fat */}

          <div
            className="
        rounded-2xl
        border
        border-green-100
        bg-green-50/60
        p-5
        transition
        hover:border-green-200
      "
          >
            <div className="mb-4 flex items-center gap-3">
              <div
                className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            bg-green-100
          "
              >
                <Salad size={20} className="text-green-600" />
              </div>

              <div>
                <p className="font-semibold text-gray-900">Fat</p>

                <p className="text-xs text-gray-500">grams</p>
              </div>
            </div>

            <input
              type="number"
              name="fat"
              step="0.1"
              min={0}
              defaultValue={meal.fat ?? 0}
              className="
          w-full
          rounded-xl
          border
          border-green-100
          bg-white
          px-4
          py-3
          text-lg
          font-semibold
          shadow-sm
          transition
          focus:border-green-400
          focus:outline-none
          focus:ring-4
          focus:ring-green-100
        "
            />
          </div>
        </div>
      </section>
      {/* ==========================================
    Footer
========================================== */}

      <section
        className="
    border-t
    bg-gray-50
    px-6
    py-5
    rounded-b-3xl
  "
      >
        <div
          className="
      flex
      flex-col-reverse
      gap-3
      sm:flex-row
      sm:justify-between
      sm:items-center
    "
        >
          {/* Left */}

          <div>
            <p
              className="
          text-sm
          font-medium
          text-gray-700
        "
            >
              Editing:
            </p>

            <p className="text-sm text-gray-500">{meal.mealName}</p>
          </div>

          {/* Right */}

          <div className="flex gap-3">
            <button
              type="reset"
              className="
          rounded-xl
          border
          border-gray-200
          bg-white
          px-5
          py-3
          font-medium
          text-gray-700
          transition-all
          duration-200
          hover:bg-gray-100
        "
            >
              Reset
            </button>

            <SubmitButton>Save Changes</SubmitButton>
          </div>
        </div>
      </section>
    </form>
  );
}
