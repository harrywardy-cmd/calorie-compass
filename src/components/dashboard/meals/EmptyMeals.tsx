import { Salad, Plus } from "lucide-react";
import Link from "next/link";

import { ROUTES } from "@/lib/routes";

export default function EmptyMeals() {
  return (
    <div
      className="
        flex
        flex-col
        items-center
        justify-center
        rounded-3xl
        border
        border-dashed
        border-gray-300
        bg-white
        py-16
        text-center
      "
    >
      <div
        className="
          flex
          h-20
          w-20
          items-center
          justify-center
          rounded-full
          bg-blue-50
          text-blue-600
        "
      >
        <Salad size={36} />
      </div>

      <h3 className="mt-6 text-xl font-semibold text-gray-900">
        No meals logged
      </h3>

      <p className="mt-2 max-w-sm text-gray-500">
        Start tracking your nutrition by adding your first meal.
      </p>

      <Link
        href={ROUTES.newMeal}
        className="
          mt-6
          inline-flex
          items-center
          gap-2
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
        <Plus size={18} />
        Add Meal
      </Link>
    </div>
  );
}