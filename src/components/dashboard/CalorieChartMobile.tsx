"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  XAxis,
  Tooltip,
} from "recharts";

type CalorieChartProps = {
  data: {
    day: string;
    calories: number;
  }[];
  calorieGoal: number;
};

// Mobile chart view
// Simplified for small screens
export default function CalorieChartMobile({
  data,
  calorieGoal,
}: CalorieChartProps) {
  return (
    <div className="h-56">
      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <BarChart data={data}>
          
          {/* Only show day labels */}
          <XAxis
            dataKey="day"
            tick={{ fontSize: 12 }}
          />

          {/* Tooltip still available */}
          <Tooltip />

          <Bar
            dataKey="calories"
            radius={[6, 6, 0, 0]}
          >
            {data.map((entry, index) => {
              let color = "#d1d5db";

              if (
                entry.calories >= calorieGoal * 0.8 &&
                entry.calories <= calorieGoal * 1.2
              ) {
                color = "#3b82f6";
              }

              if (
                entry.calories > calorieGoal * 1.2
              ) {
                color = "#ef4444";
              }

              return (
                <Cell
                  key={index}
                  fill={color}
                />
              );
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}