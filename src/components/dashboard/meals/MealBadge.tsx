import {
  Coffee,
  Sandwich,
  Soup,
  Apple,
  UtensilsCrossed,
} from "lucide-react";

type MealBadgeProps = {
  mealType: string | null;
};

export default function MealBadge({
  mealType,
}: MealBadgeProps) {
  const type = mealType?.toLowerCase() ?? "other";

  const config = {
    breakfast: {
      label: "Breakfast",
      icon: Coffee,
      className: "bg-amber-100 text-amber-700",
    },
    lunch: {
      label: "Lunch",
      icon: Sandwich,
      className: "bg-blue-100 text-blue-700",
    },
    dinner: {
      label: "Dinner",
      icon: Soup,
      className: "bg-purple-100 text-purple-700",
    },
    snack: {
      label: "Snack",
      icon: Apple,
      className: "bg-green-100 text-green-700",
    },
    other: {
      label: mealType ?? "Meal",
      icon: UtensilsCrossed,
      className: "bg-gray-100 text-gray-700",
    },
  };

  const meal =
    config[type as keyof typeof config] ??
    config.other;

  const Icon = meal.icon;

  return (
    <span
      className={`
        inline-flex
        items-center
        gap-1.5
        rounded-full
        px-3
        py-1
        text-xs
        font-semibold
        ${meal.className}
      `}
    >
      <Icon size={14} />

      {meal.label}
    </span>
  );
}