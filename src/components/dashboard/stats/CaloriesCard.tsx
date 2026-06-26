import { Flame } from "lucide-react";

import CircularProgress from "./CircularProgress";

type CaloriesCardProps = {
  calories: number;
  goal: number;
};

export default function CaloriesCard({ calories, goal }: CaloriesCardProps) {
  const remaining = Math.max(goal - calories, 0);

  return (
    <div
      className="
        flex
        h-full
        rounded-3xl
        border
        border-gray-200
        bg-white
        p-6
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-lg
      "
    >
      <div className="flex w-full items-start justify-between gap-6">
        {/* Left */}
        <div className="flex flex-1 flex-col">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-orange-100
              "
            >
              <Flame size={18} className="text-orange-500" />
            </div>

            <h3 className="text-base font-semibold text-gray-700">
              Calories Today
            </h3>
          </div>

          {/* Calories */}
          <div className="mt-6">
            <div className="flex items-end gap-2">
              <span className="text-5xl font-bold leading-none text-gray-900">
                {calories.toLocaleString()}
              </span>

              <span className="pb-1 text-lg font-medium text-gray-500">
                kcal
              </span>
            </div>
          </div>
        </div>

        {/* Progress Ring */}
        <div className="flex shrink-0 items-center justify-center">
          <CircularProgress value={calories} goal={goal} />
        </div>
      </div>
    </div>
  );
}
