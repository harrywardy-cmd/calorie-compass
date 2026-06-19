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

type CalorieChartProps = {
  data: {
    day: string;
    calories: number;
  }[];
  calorieGoal: number;
};

export default function CalorieChart({
    data,
    calorieGoal,
}: CalorieChartProps) {
    return (
        <div className="h-72">
            <ResponsiveContainer
                width="100%"
                height="100%"
            >
                <BarChart data={data}>
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

                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />

                    <Bar
                        dataKey="calories"
                        radius={[8, 8, 0, 0]}
                    >
                        {data.map((entry, index) => {
                            let color = "#d1d5db"; // gray

                            if (
                                entry.calories >= calorieGoal * 0.8 &&
                                entry.calories <= calorieGoal * 1.2
                            ) {
                                color = "#3b82f6"; // blue
                            }

                            if (
                                entry.calories > calorieGoal * 1.2
                            ) {
                                color = "#ef4444"; // red
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