import { Beef, Salad, Wheat } from "lucide-react";

import CaloriesCard from "./stats/CaloriesCard";
import MacroCard from "./stats/MacroCard";

import { NutritionGoals } from "@/types/nutrition";

type StatsCardsProps = {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;

  goals: NutritionGoals;
};

export default function StatsCardsDesktop({
  calories,
  protein,
  carbs,
  fat,
  goals,
}: StatsCardsProps) {
  return (
    <section className="mb-8">
      {/* Section Header */}
      <div className="mb-5">
        <h2 className="text-xl font-bold text-gray-900">
          Today's Nutrition
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Track your calories and macros for today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        <CaloriesCard
          calories={calories}
          goal={goals.calories}
        />

        <MacroCard
          title="Protein"
          value={protein}
          goal={goals.protein}
          unit="g"
          icon={Beef}
          iconColor="text-red-500"
        />

        <MacroCard
          title="Carbohydrates"
          value={carbs}
          goal={goals.carbs}
          unit="g"
          icon={Wheat}
          iconColor="text-amber-500"
        />

        <MacroCard
          title="Fat"
          value={fat}
          goal={goals.fat}
          unit="g"
          icon={Salad}
          iconColor="text-green-500"
        />
      </div>
    </section>
  );
}