import MealCard from "./MealCard";

import { Meal } from "@prisma/client";
import LoadingLink from "../ui/LoadingLink";
import { ROUTES } from "@/lib/routes";

// Props required for displaying the user's recent meals
type RecentMealsProps = {
  meals: Meal[];
};

// Displays a list of recently logged meals
export default function RecentMeals({
  meals,
}: RecentMealsProps) {
  return (
    <section className="mb-8">

      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">

        <div>
          <h2 className="text-2xl font-bold">
            Recent Meals
          </h2>

          <p className="text-sm text-gray-500">
            Your latest logged meals
          </p>
        </div>

        {/* Meal Counter */}
        <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
          {meals.length} Meal{meals.length !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-3xl border shadow-sm overflow-hidden">

        {/* Empty State */}
        {meals.length === 0 ? (
          <div className="text-center py-16 px-6">

            {/* Illustration */}
            <div className="text-6xl mb-4">
              🍎
            </div>

            <h3 className="text-xl font-semibold">
              No meals logged yet
            </h3>

            <p className="text-gray-500 mt-2 max-w-sm mx-auto">
              Start tracking your nutrition journey by
              adding your first meal.
            </p>

            {/* Call To Action */}
            <LoadingLink
              href="/meals/new"
              className="
                inline-flex
                items-center
                gap-2
                mt-6
                bg-black
                text-white
                px-5
                py-3
                rounded-xl
                font-medium
                hover:bg-gray-800
                transition
              "
            >
              ➕ Add First Meal
            </LoadingLink>
          </div>
        ) : (

          /* Meal List */
          <div className="divide-y">
            {meals.map((meal) => (
              <MealCard
                key={meal.id}
                meal={meal}
                redirectTo={ROUTES.dashboard}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}