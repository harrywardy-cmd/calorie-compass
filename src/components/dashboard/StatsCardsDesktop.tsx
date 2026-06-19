// Props required for displaying nutrition statistics
type StatsCardsProps = {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

// Displays key nutrition metrics for the current day
export default function StatsCards({
  calories,
  protein,
  carbs,
  fat,
}: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">

      {/* Total calories consumed today */}
      <div className="bg-white rounded-2xl border p-6 shadow-sm hover:shadow-md transition">
        <h2 className="text-sm text-gray-500">
          🔥 Calories Today
        </h2>

        <p className="text-4xl font-bold mt-2 text-blue-500">
          {calories.toLocaleString()}
        </p>

        <p className="text-sm text-gray-500 mt-1">
          kcal
        </p>
      </div>

      {/* Total protein consumed today */}
      <div className="bg-white rounded-2xl border p-6 shadow-sm hover:shadow-md transition">
        <h2 className="text-sm text-gray-500">
          💪 Protein
        </h2>

        <p className="text-4xl font-bold mt-2 text-blue-500">
          {protein}g
        </p>
      </div>

      {/* Total carbohydrates consumed today */}
      <div className="bg-white rounded-2xl border p-6 shadow-sm hover:shadow-md transition">
        <h2 className="text-sm text-gray-500">
          🍞 Carbs
        </h2>

        <p className="text-4xl font-bold mt-2 text-blue-500">
          {carbs}g
        </p>
      </div>

      {/* Total fat consumed today */}
      <div className="bg-white rounded-2xl border p-6 shadow-sm hover:shadow-md transition">
        <h2 className="text-sm text-gray-500">
          🥑 Fat
        </h2>

        <p className="text-4xl font-bold mt-2 text-blue-500">
          {fat}g
        </p>
      </div>
    </div>
  );
}