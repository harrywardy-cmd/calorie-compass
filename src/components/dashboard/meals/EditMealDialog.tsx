"use client";

import { Meal } from "@prisma/client";
import { Pencil } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import EditMealForm from "./EditMealForm";

type EditMealDialogProps = {
  meal: Meal;
};

export default function EditMealDialog({ meal }: EditMealDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="
            group
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            text-blue-600
            transition-all
            duration-200
            hover:bg-blue-100
          "
        >
          <Pencil
            size={18}
            className="
              transition-transform
              duration-200
              group-hover:scale-110
            "
          />
        </button>
      </DialogTrigger>

      <DialogContent
        className="
    max-h-[90vh]
    overflow-y-auto
    sm:max-w-4xl
  "
      >
        <DialogHeader>
          <DialogTitle> </DialogTitle>
        </DialogHeader>

        <EditMealForm meal={meal} />
      </DialogContent>
    </Dialog>
  );
}
