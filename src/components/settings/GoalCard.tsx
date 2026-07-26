import { LucideIcon } from "lucide-react";

interface GoalCardProps {
  icon: LucideIcon;
  iconColor: string;
  title: string;
  value: string | number;
  unit: string;
  action?: string;
}

export default function GoalCard({
  icon: Icon,
  iconColor,
  title,
  value,
  unit,
  action = "Edit Goal",
}: GoalCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="mb-4 flex items-center gap-2">
        <Icon className={`h-4 w-4 ${iconColor}`} />

        <span className="text-sm font-medium text-slate-600">
          {title}
        </span>
      </div>

      <p className="text-4xl font-bold text-slate-900">
        {value}
      </p>

      <p className="mt-1 text-sm text-slate-500">
        {unit}
      </p>

      <button
        type="button"
        className="mt-5 text-sm font-semibold text-blue-600 hover:text-blue-700"
      >
        {action}
      </button>
    </div>
  );
}