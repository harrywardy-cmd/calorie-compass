"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function getBarColor(
  calories: number,
  calorieGoal: number
) {
  const percentage =
    (calories / calorieGoal) * 100;

  if (percentage > 100) {
    return "#EF4444"; // Red
  }

  if (percentage >= 90) {
    return "#EAB308"; // Yellow
  }

  if (percentage >= 50) {
    return "#22C55E"; // Green
  }

  return "#3B82F6"; // Blue
}

const CustomBar = (props: any) => {
  const {
    x,
    y,
    width,
    height,
    payload,
    calorieGoal,
  } = props;

  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      rx={12}
      ry={12}
      fill={getBarColor(
        payload.calories,
        calorieGoal
      )}
    />
  );
};

export default function CalorieChart({
  data,
  calorieGoal,
}: {
  data: {
    day: string;
    calories: number;
  }[];
  calorieGoal: number;
}) {
  return (
    <ResponsiveContainer
      width="100%"
      height={300}
    >
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 20,
          left: 0,
          bottom: 5,
        }}
      >
        <XAxis
          dataKey="day"
          tickLine={false}
          axisLine={false}
        />

        <YAxis
          tickLine={false}
          axisLine={false}
        />

        <Tooltip
          formatter={(value) => [
            `${value} kcal`,
            "Calories",
          ]}
          cursor={{
            fill: "rgba(0,0,0,0.05)",
          }}
        />

        <Bar
          dataKey="calories"
          shape={(props) => (
            <CustomBar
              {...props}
              calorieGoal={calorieGoal}
            />
          )}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}