import { Meal } from "@prisma/client";
import { CalendarDays, Flame, Pencil, Trash2 } from "lucide-react";
import MealIcon from "./MealIcon";
import { formatMealDate } from "@/utils/date";

type MealCardProps = {
  meal: Meal;
};

export default function MealCard({ meal }: MealCardProps) {
  return (
    <div
      className="
    px-6
    py-5
    transition-colors
    hover:bg-gray-50
  "
    >
      <div
        className="
  grid
  gap-6
  lg:grid-cols-3
  lg:items-center
"
      >
        {/* Left */}
        <div className="flex items-center gap-4">
          {/* Meal Icon */}
            <MealIcon mealType={meal.mealType} />


          {/* Meal Information */}
          <div>
            <h3
              className="
        text-lg
        font-semibold
        text-slate-900
      "
            >
              {meal.mealName}
            </h3>

            <div className="mt-1 flex flex-wrap items-center gap-3">
              {/* Meal Type Badge */}
              <span
                className="
          rounded-full
          bg-blue-50
          border
          border-blue-100
          px-3
          py-1
          text-xs
          font-semibold
          text-blue-700
        "
              >
                {meal.mealType}
              </span>

              {/* Calories */}
              <span
                className="
          flex
          items-center
          gap-1
          text-sm
          font-medium
          text-slate-500
        "
              >
                <Flame size={15} className="text-orange-500" />
                {meal.calories} kcal
              </span>
            </div>
          </div>
        </div>

        {/* Middle */}
        <div
          className="
    flex
    justify-center
    items-center
    text-sm
    text-gray-500
  "
        >
          <CalendarDays size={16} className="text-gray-400" />

          <span>{formatMealDate(meal.createdAt)}</span>
        </div>

        {/* Right */}
        <div
          className="
    flex
    justify-end
    items-center
    gap-3
  "
        >
          <button
            className="
            inline-flex
            items-center
            gap-2
            rounded-xl
            border
            border-blue-200
            bg-white
            px-4
            py-2
            text-sm
            font-semibold
            text-blue-600
            shadow-sm
            transition-all
            duration-200
            hover:-translate-y-0.5
            hover:border-blue-300
            hover:bg-blue-50
            hover:shadow-md
          "
          >
            <Pencil size={16} />

            <span className="hidden sm:inline">Edit</span>
          </button>

          <button
            className="
            inline-flex
            items-center
            gap-2
            rounded-xl
            border
            border-red-200
            bg-white
            px-4
            py-2
            text-sm
            font-semibold
            text-red-600
            shadow-sm
            transition-all
            duration-200
            hover:-translate-y-0.5
            hover:border-red-300
            hover:bg-red-50
            hover:shadow-md
          "
          >
            <Trash2 size={16} />

            <span className="hidden sm:inline">Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
}
