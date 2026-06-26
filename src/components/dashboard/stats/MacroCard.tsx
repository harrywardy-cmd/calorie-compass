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
  const percentage = Math.min(
    Math.round((value / goal) * 100),
    100
  );

  return (
    <div
      className="
        rounded-3xl
        border
        bg-white
        p-6
        shadow-sm
        transition-all
        duration-200
        hover:-translate-y-1
        hover:shadow-md
      "
    >
      {/* Header */}
      <div className="flex items-center gap-2">
        <Icon
          size={18}
          className={iconColor}
        />

        <span className="text-sm font-medium text-gray-500">
          {title}
        </span>
      </div>

      {/* Value */}
      <div className="mt-4">
        <h2 className="text-5xl font-bold tracking-tight text-blue-600">
          {value}
          <span className="ml-1 text-2xl font-semibold">
            {unit}
          </span>
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Goal: {goal}
          {unit}
        </p>
      </div>

      {/* Progress */}
      <ProgressBar
        value={value}
        goal={goal}
      />

    </div>
  );
}