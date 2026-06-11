"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function CalorieChart({
  data,
}: {
  data: {
    day: string;
    calories: number;
  }[];
}) {
  return (
    <ResponsiveContainer
      width="100%"
      height={300}
    >
      <BarChart data={data}>
        <XAxis dataKey="day" />

        <YAxis />

        <Tooltip />

        <Bar
          dataKey="calories"
          radius={[8, 8, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}