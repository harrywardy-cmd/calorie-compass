import { LucideIcon } from "lucide-react";

import ProgressBar from "./ProgressBar";

type MacroCardProps = {
  title: string;
  value: number;
  goal: number;
  unit?: string;
  icon: LucideIcon;
  iconColor?: string;
};

export default function MacroCard({
  title,
  value,
  goal,
  unit = "g",
  icon: Icon,
  iconColor = "text-blue-500",
}: MacroCardProps) {
  return (
    <div
      className="
        flex
        h-full
        flex-col
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
      {/* Header */}
      <div className="flex items-center gap-2">
        <Icon
          size={18}
          className={iconColor}
        />

        <h3 className="text-sm font-medium text-gray-600">
          {title}
        </h3>
      </div>

      {/* Value */}
      <div className="mt-5">
        <div className="flex items-end gap-1">
          <span className="text-5xl font-bold leading-none text-blue-600">
            {value}
          </span>

          <span className="pb-1 text-2xl font-semibold text-blue-600">
            {unit}
          </span>
        </div>

        <p className="mt-2 text-sm text-gray-500">
          Goal:{" "}
          <span className="font-medium text-gray-700">
            {goal}
            {unit}
          </span>
        </p>
      </div>

      {/* Progress */}
      <div className="mt-5">
        <ProgressBar
          value={value}
          goal={goal}
        />
      </div>
    </div>
  );
}