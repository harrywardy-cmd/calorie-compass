"use client";

import { useState } from "react";
import LoadingLink from "@/components/ui/LoadingLink";
import SubmitButton from "@/components/ui/SubmitButton";

type CalorieGoalFormProps = {
  defaultGoal: number;
  updateGoal: (formData: FormData) => Promise<void>;
};

export default function CalorieGoalForm({
  defaultGoal,
  updateGoal,
}: CalorieGoalFormProps) {
  const [goal, setGoal] = useState(defaultGoal);

  const presets = [
    {
      value: 1800,
      label: "Weight Loss",
    },
    {
      value: 2200,
      label: "Maintenance",
    },
    {
      value: 2500,
      label: "Active Lifestyle",
    },
    {
      value: 3000,
      label: "Muscle Gain",
    },
  ];

  return (
    <form
      action={updateGoal}
      className="space-y-6"
    >
      {/* Goal Input */}
      <div>
        <label
          htmlFor="calorieGoal"
          className="block text-sm font-medium mb-2"
        >
          Goal (kcal)
        </label>

        <div className="relative">
          <input
            id="calorieGoal"
            name="calorieGoal"
            type="number"
            min="500"
            max="10000"
            value={goal}
            onChange={(e) =>
              setGoal(Number(e.target.value))
            }
            className="
              w-full
              rounded-2xl
              border
              p-4
              pr-20
              text-xl
              font-semibold
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />

          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
            kcal
          </span>
        </div>
      </div>

      {/* Presets */}
      <div className="bg-blue-50 rounded-2xl p-5">

        <h3 className="font-semibold text-lg mb-1">
          💡 Common Calorie Targets
        </h3>

        <p className="text-sm text-gray-600 mb-4">
          Choose a recommended goal.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

          {presets.map((preset) => (
            <button
              key={preset.value}
              type="button"
              onClick={() =>
                setGoal(preset.value)
              }
              className={`
                border
                rounded-xl
                p-3
                text-left
                transition

                ${goal === preset.value
                  ? "border-blue-600 bg-blue-100"
                  : "bg-white hover:border-blue-500"
                }
              `}
            >
              <p className="font-semibold">
                {preset.value}
              </p>

              <p className="text-xs text-gray-500">
                {preset.label}
              </p>
            </button>
          ))}
        </div>

      </div>

      {/* Form Actions */}
      <div
        className="
    flex
    flex-col-reverse
    sm:flex-row
    justify-end
    gap-3
  "
      >

        {/* Return to dashboard */}
        <LoadingLink
          href="/dashboard"
          className="
      border
      rounded-xl
      px-5
      py-3
      text-center
      hover:bg-gray-100
      transition
    "
        >
          Cancel
        </LoadingLink>

        {/* Save goal button with loading state */}
        <SubmitButton
          loadingText="Saving Goal..."
          className="
      bg-blue-600
      hover:bg-blue-700
      text-white
      px-6
      py-3
      rounded-xl
      font-medium
      transition-colors
      min-w-[150px]
    "
        >
          Save Goal
        </SubmitButton>

      </div>
    </form>
  );
}