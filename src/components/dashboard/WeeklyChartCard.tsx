import CalorieChart from "./CalorieChart";

// Props required for displaying weekly calorie chart data
type WeeklyChartCardProps = {
  chartData: {
    day: string;
    calories: number;
  }[];
  calorieGoal: number;
};

// Displays a weekly overview of calorie intake
export default function WeeklyChartCard({
  chartData,
  calorieGoal,
}: WeeklyChartCardProps) {
  return (
    <div className="bg-white border rounded-2xl p-6 shadow-sm">

      {/* Card header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          📊 Weekly Calories
        </h2>

        {/* Indicates the chart time period */}
        <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
          Last 7 Days
        </span>
      </div>

      {/* Weekly calorie chart visualization */}
      <CalorieChart
        data={chartData}
        calorieGoal={calorieGoal}
      />
    </div>
  );
}