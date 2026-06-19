import CalorieChart from "./CalorieChart";

type WeeklyChartCardProps = {
  chartData: {
    day: string;
    calories: number;
  }[];
  calorieGoal: number;
};

export default function WeeklyChartCard({
    chartData,
    calorieGoal,
}: WeeklyChartCardProps) {
    return (
        <div className="bg-white border rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                    📊 Weekly Calories
                </h2>

                <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                    Last 7 Days
                </span>
            </div>

            <CalorieChart
                data={chartData}
                calorieGoal={calorieGoal}
            />
        </div>
    );
}