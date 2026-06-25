import { ReactNode } from "react";

type SummaryStatCardProps = {
  icon: ReactNode;
  title: string;
  value: string | number;
  unit?: string;
};

export default function SummaryStatCard({
  icon,
  title,
  value,
  unit,
}: SummaryStatCardProps) {
  return (
    <div
      className="
        rounded-2xl
        bg-white/10
        p-5
        backdrop-blur
        transition
        hover:bg-white/15
      "
    >
      {/* Icon */}
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
        {icon}
      </div>

      {/* Title */}
      <p className="text-sm text-white/70">
        {title}
      </p>

      {/* Value */}
      <h3 className="mt-2 text-3xl font-bold">
        {value}
      </h3>

      {/* Unit */}
      {unit && (
        <p className="mt-1 text-sm text-white/70">
          {unit}
        </p>
      )}
    </div>
  );
}