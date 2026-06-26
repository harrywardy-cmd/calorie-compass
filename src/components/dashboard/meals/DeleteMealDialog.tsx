"use client";

import { Trash2 } from "lucide-react";

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

type DeleteMealDialogProps = {
  mealId: string;
  mealName: string;
  deleteAction: (formData: FormData) => Promise<void>;
};

export default function DeleteMealDialog({
  mealId,
  mealName,
  deleteAction,
}: DeleteMealDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          className="
            group
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            text-red-600
            transition-all
            duration-200
            hover:bg-red-100
          "
        >
          <Trash2
            size={18}
            className="transition group-hover:scale-110"
          />
        </button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete Meal?
          </AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to delete{" "}
            <strong>{mealName}</strong>?
            <br />
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <form action={deleteAction}>
          <input
            type="hidden"
            name="mealId"
            value={mealId}
          />

          <input
            type="hidden"
            name="redirectTo"
            value="/dashboard"
          />

          <AlertDialogFooter>
            <AlertDialogCancel>
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              type="submit"
              className="bg-red-600 hover:bg-red-700"
            >
              Delete Meal
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}