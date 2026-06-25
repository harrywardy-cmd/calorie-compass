"use client";
import { Meal } from "@prisma/client";
import { formatMealTime } from "@/utils/date";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  LabelList,
} from "recharts";

type HistoryCaloriesChartProps = {
  meals: Meal[];
  calorieGoal: number;
};

export default function HistoryCaloriesChart({
  meals,
  calorieGoal,
}: HistoryCaloriesChartProps) {

  const mealTypes = [
    "Breakfast",
    "Lunch",
    "Dinner",
    "Snack",
  ];

  const chartData = mealTypes
    .map((mealType) => {
      const mealsForType = meals.filter(
        (meal) => meal.mealType === mealType
      );

      return {
        mealType,
        calories: mealsForType.reduce(
          (sum, meal) => sum + meal.calories,
          0
        ),
      };
    })
    .filter((item) => item.calories > 0);

  const totalCalories = meals.reduce(
    (sum, meal) => sum + meal.calories,
    0
  );

  const caloriePercentage = Math.min(
    (totalCalories / calorieGoal) * 100,
    100
  );

  function getMealColor(mealType: string | null) {
    switch (mealType) {
      case "Breakfast":
        return "#0EA5E9"; // Sky Blue

      case "Lunch":
        return "#2563EB"; // Primary Blue

      case "Dinner":
        return "#1D4ED8"; // Deep Blue

      case "Snack":
        return "#06B6D4"; // Cyan

      default:
        return "#94A3B8"; // Slate Gray
    }
  }

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
      <div className="mb-8 h-80">

        <ResponsiveContainer width="100%" height="100%">

          <BarChart data={chartData}>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis dataKey="mealType" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="calories"
              radius={[10, 10, 0, 0]}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={getMealColor(entry.mealType)}
                />
              ))}
            </Bar>

          </BarChart>

        </ResponsiveContainer>

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