"use client";

import { Search } from "lucide-react";

type HistoryToolbarProps = {
  search: string;
  onSearchChange: (value: string) => void;

  mealType: string;
  onMealTypeChange: (value: string) => void;

  totalMeals: number;
  filteredMeals: number;
};

export default function HistoryToolbar({
  search,
  onSearchChange,

  mealType,
  onMealTypeChange,

  totalMeals,
  filteredMeals,
}: HistoryToolbarProps) {
  return (
    <div className="mb-6 rounded-3xl border bg-white p-6 shadow-sm">

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>
          <h2 className="text-2xl font-bold">
            Meal History
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Showing {filteredMeals} of {totalMeals} meals
          </p>
        </div>

        <div className="flex flex-col gap-3 md:flex-row">

  {/* Search */}
  <div className="relative w-full md:w-80">

    <Search
      size={18}
      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
    />

    <input
      value={search}
      onChange={(e) =>
        onSearchChange(e.target.value)
      }
      placeholder="Search meals..."
      className="
        w-full
        rounded-2xl
        border
        border-gray-200
        bg-gray-50
        py-3
        pl-11
        pr-4
        transition
        focus:border-blue-500
        focus:bg-white
        focus:outline-none
      "
    />

  </div>

  {/* Meal Type Filter */}
  <select
    value={mealType}
    onChange={(e) =>
      onMealTypeChange(e.target.value)
    }
    className="
      rounded-2xl
      border
      border-gray-200
      bg-gray-50
      px-4
      py-3
      transition
      focus:border-blue-500
      focus:bg-white
      focus:outline-none
    "
  >
    <option value="All">
      🍽 All Meals
    </option>

    <option value="Breakfast">
      🍳 Breakfast
    </option>

    <option value="Lunch">
      🥪 Lunch
    </option>

    <option value="Dinner">
      🍝 Dinner
    </option>

    <option value="Snack">
      🍎 Snack
    </option>
  </select>

</div>
      </div>

    </div>
  );
}