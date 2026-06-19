import Link from "next/link";

import MealCard from "./MealCard";

import { Meal } from "@/generated/prisma/client";

type RecentMealsProps = {
  meals: Meal[];
};

export default function RecentMeals({
  meals,
}: RecentMealsProps) {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">
          Recent Meals
        </h2>

        <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
          {meals.length} Meals
        </span>
      </div>

      <div className="bg-white rounded-2xl border p-6 shadow-sm hover:shadow-md transition">
        {meals.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-5xl mb-4">
              🍎
            </p>

            <h3 className="font-semibold text-lg">
              No meals logged yet
            </h3>

            <p className="text-gray-500 mt-2">
              Add your first meal to start tracking.
            </p>

            <Link
              href="/meals/new"
              className="inline-block mt-4 bg-black text-white px-4 py-2 rounded-lg"
            >
              Add First Meal
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {meals.map((meal) => (
              <MealCard
                key={meal.id}
                meal={meal}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}