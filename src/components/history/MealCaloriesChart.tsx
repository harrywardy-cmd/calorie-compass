"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Cell,
} from "recharts";

type Meal = {
  id: string;
  mealName: string;
  calories: number;
};

type Props = {
  meals: Meal[];
};

const BAR_COLORS = [
  "#F59E0B",
  "#2563EB",
  "#8B5CF6",
  "#22C55E",
  "#EF4444",
  "#06B6D4",
];

export default function MealCaloriesChart({
  meals,
}: Props) {
  const chartData = meals.map((meal) => ({
    name: meal.mealName,
    calories: meal.calories,
  }));

  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm">

      <div className="mb-6">

        <h2 className="text-2xl font-bold">
          📊 Meal Calories
        </h2>

        <p className="text-sm text-gray-500">
          Calories consumed by each meal today
        </p>

      </div>

      <div className="h-80">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <BarChart data={chartData}>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="calories"
              radius={[8, 8, 0, 0]}
            >
              {chartData.map((_, index) => (
                <Cell
                  key={index}
                  fill={
                    BAR_COLORS[
                      index %
                        BAR_COLORS.length
                    ]
                  }
                />
              ))}
            </Bar>

          </BarChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
}