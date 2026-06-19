"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

// Props expected by the calorie chart component
type CalorieChartProps = {
  data: {
    day: string;
    calories: number;
  }[];
  calorieGoal: number;
};

// Displays a weekly calorie intake chart
export default function CalorieChart({
  data,
  calorieGoal,
}: CalorieChartProps) {
  return (
    <div className="h-72">

      {/* Makes the chart automatically resize with its parent container */}
      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <BarChart data={data}>

          {/* Gradient definition available for future chart styling */}
          <defs>
            <linearGradient
              id="calorieGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor="#3b82f6"
              />

              <stop
                offset="100%"
                stopColor="#06b6d4"
              />
            </linearGradient>
          </defs>

          {/* Horizontal axis displaying day labels */}
          <XAxis dataKey="day" />

          {/* Vertical axis displaying calorie values */}
          <YAxis />

          {/* Shows calorie information when hovering over a bar */}
          <Tooltip />

          {/* Bar chart displaying daily calorie totals */}
          <Bar
            dataKey="calories"
            radius={[8, 8, 0, 0]}
          >
            {data.map((entry, index) => {
              // Default colour for days significantly under goal
              let color = "#d1d5db"; // gray

              // Blue indicates the user is within 80%–120% of their goal
              if (
                entry.calories >= calorieGoal * 0.8 &&
                entry.calories <= calorieGoal * 1.2
              ) {
                color = "#3b82f6"; // blue
              }

              // Red indicates the user has exceeded their goal by more than 20%
              if (
                entry.calories > calorieGoal * 1.2
              ) {
                color = "#ef4444"; // red
              }

              // Apply the calculated colour to each individual bar
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