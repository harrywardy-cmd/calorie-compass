import Link from "next/link";
import { Pencil, Trash2, Flame } from "lucide-react";
import { Meal } from "@/generated/prisma/client";

import { deleteMeal } from "@/app/dashboard/actions";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Props required for displaying an individual meal
type MealCardProps = {
  meal: Meal;
};

// Displays a single meal with edit and delete actions
export default function MealCard({
  meal,
}: MealCardProps) {
  return (
    <div
      className="
        p-5
        transition
        hover:bg-gray-50
      "
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        {/* Meal Information */}
        <div className="flex-1">

          {/* Meal Name */}
          <h3 className="font-semibold text-lg">
            {meal.mealName}
          </h3>

          {/* Meal Type + Calories */}
          <div className="flex flex-wrap items-center gap-3 mt-2">

            {/* Meal Type Badge */}
            <span className="
              inline-flex
              items-center
              rounded-full
              bg-blue-50
              text-blue-700
              px-3
              py-1
              text-xs
              font-medium
            ">
              {meal.mealType}
            </span>

            {/* Calories */}
            <span className="
              inline-flex
              items-center
              gap-1
              text-gray-600
              text-sm
            ">
              <Flame size={14} />
              {meal.calories} kcal
            </span>
          </div>

          {/* Created Date */}
          <p className="text-xs text-gray-400 mt-3">
            Logged {new Date(meal.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">

          {/* Edit */}
          <Link
            href={`/meals/${meal.id}/edit`}
            className="
              inline-flex
              items-center
              gap-2
              px-3
              py-2
              rounded-lg
              border
              text-blue-600
              hover:bg-blue-50
              transition
            "
          >
            <Pencil size={16} />
            <span className="hidden sm:inline">
              Edit
            </span>
          </Link>

          {/* Delete */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button
                type="button"
                className="
                  inline-flex
                  items-center
                  gap-2
                  px-3
                  py-2
                  rounded-lg
                  border
                  text-red-600
                  hover:bg-red-50
                  transition
                "
              >
                <Trash2 size={16} />

                <span className="hidden sm:inline">
                  Delete
                </span>
              </button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>

                <AlertDialogTitle>
                  Delete Meal?
                </AlertDialogTitle>

                <AlertDialogDescription>
                  This will permanently delete "{meal.mealName}".
                </AlertDialogDescription>

              </AlertDialogHeader>

              <AlertDialogFooter>

                <AlertDialogCancel>
                  Cancel
                </AlertDialogCancel>

                <form action={deleteMeal}>
                  <input
                    type="hidden"
                    name="mealId"
                    value={meal.id}
                  />

                  <AlertDialogAction asChild>
                    <button
                      type="submit"
                      className="
                        bg-red-600
                        text-white
                        px-4
                        py-2
                        rounded
                      "
                    >
                      Delete
                    </button>
                  </AlertDialogAction>
                </form>

              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

        </div>
      </div>
    </div>
  );
}