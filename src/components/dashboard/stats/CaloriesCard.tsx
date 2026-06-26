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
      h-full
      rounded-3xl
      border border-gray-200
      bg-white
      p-6
      shadow-sm
      transition-all
      duration-300
      hover:-translate-y-1
      hover:shadow-lg
    "
  >
    <div className="flex h-full items-center justify-between">
      {/* Left Content */}
      <div className="flex min-w-0 flex-1 flex-col justify-between">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100">
            <Flame
              size={20}
              className="text-orange-500"
            />
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">
              Calories
            </p>

            <h3 className="text-lg font-semibold text-gray-900">
              Today
            </h3>
          </div>
        </div>

        {/* Value */}
        <div className="mt-8">
          <div className="flex items-end gap-2">
            <h2 className="text-3xl font-bold leading-none tracking-tight text-gray-900">
              {calories.toLocaleString()}
            </h2>

            <span className="mb-2 text-1xl font-medium text-gray-500">
              kcal
            </span>
          </div>
        </div>
      </div>

      {/* Progress Ring */}
      <div className="ml-8 flex flex-shrink-0 items-center justify-center">
        <CircularProgress
          value={calories}
          goal={goal}
        />
      </div>
    </div>
  </div>
);
}
