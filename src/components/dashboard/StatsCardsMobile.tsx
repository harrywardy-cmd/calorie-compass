type StatsCardsProps = {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

// Mobile nutrition summary
// Displays all macros inside a single card
export default function StatsCardsMobile({
  calories,
  protein,
  carbs,
  fat,
}: StatsCardsProps) {
  return (
    <div className="bg-white rounded-3xl border p-5 shadow-sm mb-8">

      {/* Card Title */}
      <h2 className="font-bold text-lg mb-4">
        Nutrition Summary
      </h2>

      {/* Calories */}
      <div className="flex justify-between py-3 border-b">
        <span className="flex items-center gap-2">
          🔥 Calories
        </span>

        <span className="font-semibold">
          {calories} kcal
        </span>
      </div>

      {/* Protein */}
      <div className="flex justify-between py-3 border-b">
        <span className="flex items-center gap-2">
          💪 Protein
        </span>

        <span className="font-semibold">
          {protein}g
        </span>
      </div>

      {/* Carbs */}
      <div className="flex justify-between py-3 border-b">
        <span className="flex items-center gap-2">
          🍞 Carbs
        </span>

        <span className="font-semibold">
          {carbs}g
        </span>
      </div>

      {/* Fat */}
      <div className="flex justify-between py-3">
        <span className="flex items-center gap-2">
          🥑 Fat
        </span>

        <span className="font-semibold">
          {fat}g
        </span>
      </div>
    </div>
  );
}