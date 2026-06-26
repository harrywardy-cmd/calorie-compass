import { Beef, Salad, Wheat } from "lucide-react";

import CaloriesCard from "./stats/CaloriesCard";
import MacroCard from "./stats/MacroCard";

import { NutritionSummary } from "@/types/dashboard";

type StatsCardsProps = {
  nutrition: NutritionSummary;
};

export default function StatsCards({
  nutrition,
}: StatsCardsProps) {
  return (
    <section className="mb-10">
      {/* Section Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Today's Nutrition
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Track your calories and macronutrients for today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <CaloriesCard
          calories={nutrition.totals.calories}
          goal={nutrition.goals.calories}
        />

        <MacroCard
          title="Protein"
          value={nutrition.totals.protein}
          goal={nutrition.goals.protein}
          unit="g"
          icon={Beef}
          iconColor="text-red-500"
        />

        <MacroCard
          title="Carbohydrates"
          value={nutrition.totals.carbs}
          goal={nutrition.goals.carbs}
          unit="g"
          icon={Wheat}
          iconColor="text-amber-500"
        />

        <MacroCard
          title="Fat"
          value={nutrition.totals.fat}
          goal={nutrition.goals.fat}
          unit="g"
          icon={Salad}
          iconColor="text-green-500"
        />
      </div>
    </section>
  );
}