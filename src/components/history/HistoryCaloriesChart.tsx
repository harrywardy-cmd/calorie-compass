import { Meal } from "@prisma/client";
import { formatMealTime } from "@/utils/date";

type HistoryCaloriesChartProps = {
  meals: Meal[];
  calorieGoal: number;
};

export default function HistoryCaloriesChart({
  meals,
  calorieGoal,
}: HistoryCaloriesChartProps) {

  const chartData = meals.map((meal) => ({
    name: meal.mealName,
    calories: meal.calories,
    time: formatMealTime(meal.createdAt),
  }));

  const totalCalories = meals.reduce(
    (sum, meal) => sum + meal.calories,
    0
  );

  const caloriePercentage = Math.min(
    (totalCalories / calorieGoal) * 100,
    100
  );

  return (
    <section
      className="
      rounded-3xl
      border
      bg-white
      p-6
      shadow-sm
    "
    >

      {/* Header */}
      <div className="mb-8 flex items-center justify-between">

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-blue-50 p-3">
            📊
          </div>

          <div>

            <h2 className="text-2xl font-bold">
              Meal Calories
            </h2>

            <p className="text-sm text-gray-500">
              Calories consumed by meal
            </p>

          </div>

        </div>

      </div>

      {/* Chart */}
      <div
        className="
    mb-8
    flex
    h-80
    items-center
    justify-center
    rounded-2xl
    border-2
    border-dashed
    border-gray-200
  "
      >
        Chart goes here
      </div>
      {/* Footer */}
      <div className="rounded-2xl bg-gray-50 p-6">

        <div className="flex flex-wrap items-center justify-between gap-6">

          <div>

            <p className="text-sm text-gray-500">
              Total Calories
            </p>

            <h3 className="text-3xl font-bold">
              {totalCalories} kcal
            </h3>

          </div>

          <div>

            <p className="text-sm text-gray-500">
              Daily Goal
            </p>

            <h3 className="text-3xl font-bold">
              {calorieGoal} kcal
            </h3>

          </div>

        </div>

        <div className="mt-6">

          <div className="h-3 overflow-hidden rounded-full bg-gray-200">

            <div
              className="h-full rounded-full bg-blue-600 transition-all"
              style={{
                width: `${caloriePercentage}%`,
              }}
            />

          </div>

          <p className="mt-2 text-right text-sm font-medium text-blue-600">
            {Math.round(caloriePercentage)}%
          </p>

        </div>

      </div>

    </section>
  );
}