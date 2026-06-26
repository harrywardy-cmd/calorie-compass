import { Meal } from "@prisma/client";
import { CalendarDays, Flame, Pencil, Trash2 } from "lucide-react";
import MealIcon from "./MealIcon";
import { formatMealDate } from "@/utils/date";
import MealBadge from "./MealBadge";
import DeleteMealDialog from "./DeleteMealDialog";
import { deleteMeal } from "@/app/dashboard/actions";
import EditMealDialog from "./EditMealDialog";

type MealCardProps = {
  meal: Meal;
  redirectTo?: string;
};

export default function MealCard({
  meal,
  redirectTo = "/dashboard",
}: MealCardProps) {
  return (
    <div
      className="
  group
  px-6
  py-5
  transition-all
  duration-300
  hover:bg-blue-50/40
  hover:shadow-inner
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
    text-gray-900
    transition-colors
    group-hover:text-blue-700
  "
            >
              {meal.mealName}
            </h3>

            <div className="mt-1 flex flex-wrap items-center gap-3">
              {/* Meal Type Badge */}
              <MealBadge mealType={meal.mealType} />

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
          <EditMealDialog meal={meal} />

          <DeleteMealDialog
            mealId={meal.id}
            mealName={meal.mealName}
            deleteAction={deleteMeal}
          />
        </div>
      </div>
    </div>
  );
}
