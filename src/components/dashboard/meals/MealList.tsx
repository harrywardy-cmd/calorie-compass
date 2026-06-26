import { Meal } from "@prisma/client";

import MealCard from "./MealCard";
import MealListHeader from "./MealListHeader";
import EmptyMeals from "./EmptyMeals";

type MealListProps = {
  meals: Meal[];
};

export default function MealList({
  meals,
}: MealListProps) {
  return (
    <section className="mt-8">
      <MealListHeader />

      {meals.length === 0 ? (
        <EmptyMeals />
      ) : (
        <div
          className="
            overflow-hidden
            rounded-3xl
            border
            border-gray-200
            bg-white
            shadow-sm
          "
        >
          {meals.map((meal, index) => (
            <div key={meal.id}>
              <MealCard meal={meal} />

              {/* Divider */}
              {index !== meals.length - 1 && (
                <div className="border-b border-gray-100" />
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}