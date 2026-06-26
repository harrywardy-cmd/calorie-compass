import { Coffee, Sandwich, UtensilsCrossed, Apple, Soup } from "lucide-react";

type MealIconProps = {
  mealType: string | null;
};

export default function MealIcon({ mealType }: MealIconProps) {
  const type = mealType?.toLowerCase() ?? "default";

  if (type === "breakfast") {
    return (
      <div
        className="
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-2xl
          bg-amber-50
          text-amber-600
        "
      >
        <Coffee size={28} />
      </div>
    );
  }

  if (type === "lunch") {
    return (
      <div
        className="
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-2xl
          bg-blue-50
          text-blue-600
        "
      >
        <Sandwich size={28} />
      </div>
    );
  }

  if (type === "dinner") {
    return (
      <div
        className="
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-2xl
          bg-purple-50
          text-purple-600
        "
      >
        <Soup size={28} />
      </div>
    );
  }

  if (type === "snack") {
    return (
      <div
        className="
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-2xl
          bg-green-50
          text-green-600
        "
      >
        <Apple size={28} />
      </div>
    );
  }

  return (
    <div
      className="
        flex
        h-14
        w-14
        items-center
        justify-center
        rounded-2xl
        bg-gray-100
        text-gray-600
      "
    >
      <UtensilsCrossed size={28} />
    </div>
  );
}
