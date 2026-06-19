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
  // Determine status message
  const statusMessage =
    caloriePercentage > 100
      ? "You've exceeded your calorie goal today."
      : caloriePercentage >= 75
        ? "You're getting close to your daily goal."
        : "Keep logging meals and stay on track.";

  // Determine status icon
  const statusIcon =
    caloriePercentage > 100
      ? "⚠️"
      : caloriePercentage >= 75
        ? "🔥"
        : "🚀";

  return (
    <div className="bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 text-white rounded-3xl p-6 shadow-lg overflow-hidden relative">

      {/* Background decoration */}
      <div className="absolute top-0 right-0 text-[120px] opacity-10">
        🧭
      </div>

      {/* Header */}
      <div className="relative flex items-center justify-between mb-6">

        <div>
          <p className="text-blue-100 text-sm">
            Daily Insights
          </p>

          <h2 className="text-2xl font-bold">
            Today's Summary
          </h2>
        </div>

        <span className="text-4xl">
          📈
        </span>
      </div>

      {/* Main Stats */}
      <div className="relative grid grid-cols-2 gap-4 mb-6">

        {/* Calories */}
        <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">

          <p className="text-blue-100 text-xs uppercase tracking-wide">
            Calories
          </p>

          <p className="text-3xl font-bold mt-1">
            {totalCalories.toLocaleString()}
          </p>

          <p className="text-xs text-blue-100 mt-1">
            kcal consumed
          </p>
        </div>

        {/* Meals */}
        <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">

          <p className="text-blue-100 text-xs uppercase tracking-wide">
            Meals
          </p>

          <p className="text-3xl font-bold mt-1">
            {mealsCount}
          </p>

          <p className="text-xs text-blue-100 mt-1">
            logged today
          </p>
        </div>
      </div>

      {/* Progress */}
      <div className="relative">

        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium">
            Goal Progress
          </span>

          <span className="text-sm">
            {Math.round(caloriePercentage)}%
          </span>
        </div>

        <div className="w-full bg-white/20 rounded-full h-3">
          <div
            className="bg-white h-3 rounded-full transition-all"
            style={{
              width: `${Math.min(
                caloriePercentage,
                100
              )}%`,
            }}
          />
        </div>
      </div>

      {/* Status Message */}
      <div className="relative mt-6 border-t border-white/20 pt-4">

        <div className="flex items-start gap-3">

          <span className="text-xl">
            {statusIcon}
          </span>

          <p className="text-sm text-blue-50">
            {statusMessage}
          </p>
        </div>
      </div>
    </div>
  );
}