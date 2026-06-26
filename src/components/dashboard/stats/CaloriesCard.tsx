import { Flame } from "lucide-react";

import CircularProgress from "./CircularProgress";

type CaloriesCardProps = {
  calories: number;
  goal: number;
};

export default function CaloriesCard({
  calories,
  goal,
}: CaloriesCardProps) {
  const remaining = Math.max(goal - calories, 0);

  return (
    <div
      className="
        rounded-3xl
        border
        bg-white
        p-6
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-lg
      "
    >
      <div className="flex items-start justify-between gap-6">

        {/* Left */}

        <div className="flex flex-1 flex-col">

          <div className="flex items-center gap-2">

            <div className="rounded-xl bg-orange-100 p-2">
              <Flame
                size={18}
                className="text-orange-500"
              />
            </div>

            <span className="text-sm font-semibold text-gray-500">
              Calories Today
            </span>

          </div>

          <div className="mt-6">

            <h2 className="text-5xl font-bold tracking-tight text-gray-900">
              {calories.toLocaleString()}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              kcal consumed
            </p>

          </div>

          <div className="mt-6 space-y-2">

            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">
                Goal
              </span>

              <span className="font-semibold text-gray-800">
                {goal.toLocaleString()} kcal
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">

              <span className="text-gray-500">
                Remaining
              </span>

              <span className="font-semibold text-blue-600">
                {remaining.toLocaleString()} kcal
              </span>

            </div>

          </div>

        </div>

        {/* Progress */}

        <CircularProgress
          value={calories}
          goal={goal}
        />

      </div>
    </div>
  );
}