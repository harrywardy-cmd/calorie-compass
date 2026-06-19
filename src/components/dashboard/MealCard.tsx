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

type MealCardProps = {
  meal: Meal;
};

export default function MealCard({
  meal,
}: MealCardProps) {
  return (
    <div className="flex justify-between items-center border rounded-lg p-4 hover:bg-gray-50">
      <div>
        <p className="font-semibold">
          {meal.mealName}
        </p>

        <span className="inline-block px-2 py-1 rounded-full bg-gray-100 text-xs">
          {meal.mealType}
        </span>

        <p className="text-sm text-gray-500 mt-1">
          {meal.calories} kcal
        </p>
      </div>

      <div className="flex items-center gap-4">
        <Link href={`/meals/${meal.id}/edit`}>
          <Pencil
            size={18}
            className="text-blue-600 hover:text-blue-800"
          />
        </Link>

        <AlertDialog>
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