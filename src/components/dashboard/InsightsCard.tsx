// Props required for displaying daily nutrition insights
type InsightsCardProps = {
  totalCalories: number;
  mealsCount: number;
  caloriePercentage: number;
};

// Displays a summary of the user's daily nutrition progress
export default function InsightsCard({
  totalCalories,
  mealsCount,
  caloriePercentage,
}: InsightsCardProps) {
  return (
    <div className="bg-gradient-to-br from-blue-600 to-cyan-500 text-white rounded-3xl p-6 shadow-lg">

      {/* Card header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">
          📈 Today's Summary
        </h2>

        <span className="text-4xl">
          🧭
        </span>
      </div>

      <div className="space-y-4">

        {/* Total calories consumed today */}
        <div>
          <p className="text-blue-100 text-sm">
            Calories Consumed
          </p>

          <p className="text-4xl font-bold">
            {totalCalories.toLocaleString()}
          </p>
        </div>

        {/* Number of meals logged today */}
        <div>
          <p className="text-blue-100 text-sm">
            Meals Logged
          </p>

          <p className="text-2xl font-semibold">
            {mealsCount}
          </p>
        </div>

        {/* Dynamic progress message based on calorie goal completion */}
        <div className="pt-2 border-t border-white/20">
          <p className="text-sm text-blue-100">
            {caloriePercentage > 100
              ? "⚠️ You've exceeded your calorie goal today."
              : caloriePercentage >= 75
                ? "🔥 You're getting close to your daily goal."
                : "🚀 Keep logging meals and stay on track."}
          </p>
        </div>
      </div>
    </div>
  );
}