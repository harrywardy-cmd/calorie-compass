import Link from "next/link";
import { UtensilsCrossed, ChevronRight } from "lucide-react";

import { ROUTES } from "@/lib/routes";

export default function MealListHeader() {
  return (
    <div className="mb-6 flex items-start justify-between">
      {/* Left */}
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-2xl
            bg-blue-50
            text-blue-600
          "
        >
          <UtensilsCrossed size={22} />
        </div>

        {/* Title */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Recent Meals
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Your latest logged meals
          </p>
        </div>
      </div>

      {/* View All */}
      <Link
        href={ROUTES.history}
        className="
          inline-flex
          items-center
          gap-1
          text-sm
          font-semibold
          text-blue-600
          transition-colors
          hover:text-blue-700
        "
      >
        View All Meals

        <ChevronRight size={16} />
      </Link>
    </div>
  );
}