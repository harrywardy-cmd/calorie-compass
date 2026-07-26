"use client";

import { useState } from "react";
import { User } from "@prisma/client";
import { Flame, Beef, Wheat, CircleDot } from "lucide-react";

import SubmitButton from "@/components/ui/SubmitButton";
import { updateNutritionGoal } from "@/app/settings/actions";
import { toast } from "sonner";

interface NutritionGoalsCardProps {
  user: User | null;
}

export default function NutritionGoalsCard({ user }: NutritionGoalsCardProps) {
  const [editingGoal, setEditingGoal] = useState<
    "calories" | "protein" | "carbs" | "fat" | null
  >(null);
  const [goalValue, setGoalValue] = useState(user?.calorieGoal ?? 1800);

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

  const titles = {
    calories: "Calories",
    protein: "Protein",
    carbs: "Carbohydrates",
    fat: "Fat",
  } as const;

  const units = {
    calories: "kcal / day",
    protein: "g / day",
    carbs: "g / day",
    fat: "g / day",
  } as const;

  const goalFields = {
    calories: "calorieGoal",
    protein: "proteinGoal",
    carbs: "carbGoal",
    fat: "fatGoal",
  } as const;

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      {editingGoal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
            <h2 className="text-2xl font-bold">Edit {titles[editingGoal]}</h2>

            <p className="mt-2 text-slate-500">
              Update your daily {titles[editingGoal].toLowerCase()} goal.
            </p>

            <form
              action={async (formData) => {
                const promise = updateNutritionGoal(formData);

                toast.promise(promise, {
                  loading: "Saving goal...",
                  success: `${titles[editingGoal]} goal updated!`,
                  error: "Something went wrong.",
                });

                await promise;
                setEditingGoal(null);
              }}
              className="mt-6 space-y-6"
            >
              <div>
                <label
                  htmlFor="value"
                  className="mb-2 block text-sm font-medium"
                >
                  {titles[editingGoal]}
                </label>

                <input
                  id="value"
                  name="value"
                  type="number"
                  min="0"
                  max={editingGoal === "calories" ? 10000 : 500}
                  value={goalValue}
                  onChange={(e) => setGoalValue(Number(e.target.value))}
                  className="w-full rounded-2xl border border-slate-300 p-4 text-xl font-semibold focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />

                <input
                  type="hidden"
                  name="goal"
                  value={goalFields[editingGoal]}
                />

                <p className="mt-2 text-sm text-slate-500">
                  {units[editingGoal]}
                </p>
              </div>

              {editingGoal === "calories" && (
                <div className="grid grid-cols-2 gap-3">
                  {presets.map((preset) => (
                    <button
                      key={preset.value}
                      type="button"
                      onClick={() => setGoalValue(preset.value)}
                      className={`rounded-xl border p-3 transition ${
                        goalValue === preset.value
                          ? "border-blue-600 bg-blue-100"
                          : "hover:border-blue-500"
                      }`}
                    >
                      <p className="font-semibold">{preset.value}</p>

                      <p className="text-xs text-slate-500">{preset.label}</p>
                    </button>
                  ))}
                </div>
              )}

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingGoal(null)}
                  className="rounded-xl border px-5 py-3"
                >
                  Cancel
                </button>

                <SubmitButton
                  loadingText="Saving..."
                  className="rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
                >
                  Save Goal
                </SubmitButton>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-blue-100 p-3">
            <Flame className="h-6 w-6 text-blue-600" />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Nutrition Goals
            </h2>

            <p className="text-sm text-slate-500">
              Set your daily nutrition targets.
            </p>
          </div>
        </div>
      </div>

      {/* Goal Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Calories */}
        <button
          type="button"
          onClick={() => {
            setGoalValue(user?.calorieGoal ?? 1800);
            setEditingGoal("calories");
          }}
          className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-left transition hover:border-blue-400 hover:shadow-md"
        >
          <div className="mb-3 flex items-center gap-2">
            <Flame className="h-4 w-4 text-orange-500" />
            <span className="text-sm font-medium text-slate-600">Calories</span>
          </div>

          <p className="text-3xl font-bold text-slate-900">
            {user?.calorieGoal.toLocaleString()}
          </p>

          <p className="mt-1 text-sm text-slate-500">kcal / day</p>

          <p className="mt-5 text-sm font-semibold text-blue-600">Edit Goal</p>
        </button>

        {/* Protein */}
        <button
          type="button"
          onClick={() => {
            setGoalValue(user?.proteinGoal ?? 120);
            setEditingGoal("protein");
          }}
          className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-left transition hover:border-blue-400 hover:shadow-md"
        >
          <div className="mb-3 flex items-center gap-2">
            <span className="text-lg">
              <Beef className="h-6 w-6 text-blue-600" />
            </span>

            <span className="text-sm font-medium text-slate-600">Protein</span>
          </div>

          <p className="text-3xl font-bold text-slate-900">
            {user?.proteinGoal}
          </p>

          <p className="mt-1 text-sm text-slate-500">g / day</p>

          <p className="mt-5 text-sm font-semibold text-blue-600">Edit Goal</p>
        </button>

        {/* Carbs */}
        <button
          type="button"
          onClick={() => {
            setGoalValue(user?.carbGoal ?? 250);
            setEditingGoal("carbs");
          }}
          className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-left transition hover:border-blue-400 hover:shadow-md"
        >
          <div className="mb-3 flex items-center gap-2">
            <span className="text-lg">
              <Wheat className="h-6 w-6 text-yellow-500" />
            </span>

            <span className="text-sm font-medium text-slate-600">
              Carbohydrates
            </span>
          </div>

          <p className="text-3xl font-bold text-slate-900">{user?.carbGoal}</p>

          <p className="mt-1 text-sm text-slate-500">g / day</p>

          <p className="mt-5 text-sm font-semibold text-blue-600">Edit Goal</p>
        </button>

        {/* Fat */}
        <button
          type="button"
          onClick={() => {
            setGoalValue(user?.fatGoal ?? 65);
            setEditingGoal("fat");
          }}
          className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-left transition hover:border-blue-400 hover:shadow-md"
        >
          <div className="mb-3 flex items-center gap-2">
            <span className="text-lg">
              <CircleDot className="h-6 w-6 text-green-500" />
            </span>

            <span className="text-sm font-medium text-slate-600">Fat</span>
          </div>

          <p className="text-3xl font-bold text-slate-900">{user?.fatGoal}</p>

          <p className="mt-1 text-sm text-slate-500">g / day</p>

          <p className="mt-5 text-sm font-semibold text-blue-600">Edit Goal</p>
        </button>
      </div>
    </section>
  );
}
