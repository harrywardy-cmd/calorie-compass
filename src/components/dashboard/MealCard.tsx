import LoadingLink from "@/components/ui/LoadingLink";
import { Pencil, Trash2, Flame } from "lucide-react";
import { Meal } from "@prisma/client";
import SubmitButton from "@/components/ui/SubmitButton";
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
          <LoadingLink
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
          </LoadingLink>

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

            <AlertDialogContent className="max-w-md">

              <AlertDialogHeader>

                {/* Dialog Title */}
                <AlertDialogTitle className="flex items-center gap-2 text-red-600">
                  <Trash2 size={18} />
                  Delete Meal?
                </AlertDialogTitle>

                {/* Warning Message */}
                <AlertDialogDescription className="text-left">
                  This action cannot be undone.

                  <span className="block mt-2 font-medium text-gray-900">
                    "{meal.mealName}"
                  </span>

                  will be permanently removed from your meal history.
                </AlertDialogDescription>

              </AlertDialogHeader>

              {/* Mobile + Desktop Friendly Actions */}
              <AlertDialogFooter
                className="
      flex-col-reverse
      sm:flex-row
      gap-2
    "
              >

                {/* Cancel Button */}
                <AlertDialogCancel
                  className="
        w-full
        sm:w-auto
      "
                >
                  Cancel
                </AlertDialogCancel>

                {/* Delete Form */}
                <form
                  action={deleteMeal}
                  className="
        w-full
        sm:w-auto
      "
                >
                  <input
                    type="hidden"
                    name="mealId"
                    value={meal.id}
                  />

                  <SubmitButton
                    loadingText="Deleting..."
                    className="
          w-full
          sm:w-auto
          bg-red-600
          hover:bg-red-700
          text-white
          px-5
          py-2
          rounded-md
          font-medium
          transition
        "
                  >
                    Delete Meal
                  </SubmitButton>
                </form>

              </AlertDialogFooter>

            </AlertDialogContent>
          </AlertDialog>

        </div>
      </div>
    </div>
  );
}