import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
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
    <div className="flex justify-between items-center border rounded-lg p-4 hover:bg-gray-50">

      {/* Meal information */}
      <div>
        <p className="font-semibold">
          {meal.mealName}
        </p>

        {/* Meal category badge */}
        <span className="inline-block px-2 py-1 rounded-full bg-gray-100 text-xs">
          {meal.mealType}
        </span>

        {/* Calorie information */}
        <p className="text-sm text-gray-500 mt-1">
          {meal.calories} kcal
        </p>
      </div>

      {/* Meal action buttons */}
      <div className="flex items-center gap-4">

        {/* Navigate to the edit meal page */}
        <Link href={`/meals/${meal.id}/edit`}>
          <Pencil
            size={18}
            className="text-blue-600 hover:text-blue-800"
          />
        </Link>

        {/* Confirmation dialog before permanently deleting a meal */}
        <AlertDialog>

          {/* Opens the delete confirmation dialog */}
          <AlertDialogTrigger asChild>
            <button
              type="button"
              className="text-red-600 hover:text-red-800"
            >
              <Trash2 size={18} />
            </button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>

              {/* Dialog title */}
              <AlertDialogTitle>
                Delete Meal?
              </AlertDialogTitle>

              {/* Warn the user before deleting */}
              <AlertDialogDescription>
                This will permanently delete "{meal.mealName}".
              </AlertDialogDescription>

            </AlertDialogHeader>

            <AlertDialogFooter>

              {/* Close the dialog without deleting */}
              <AlertDialogCancel>
                Cancel
              </AlertDialogCancel>

              {/* Submit deletion request to the server action */}
              <form action={deleteMeal}>

                {/* Hidden field used to identify which meal to delete */}
                <input
                  type="hidden"
                  name="mealId"
                  value={meal.id}
                />

                {/* Confirm meal deletion */}
                <AlertDialogAction asChild>
                  <button
                    type="submit"
                    className="bg-red-600 text-white px-4 py-2 rounded"
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
  );
}