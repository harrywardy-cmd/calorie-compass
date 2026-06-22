"use client";

import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";

type MealEstimatorProps = {
  onEstimate: (data: {
    mealName: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  }) => void;
};

export default function MealEstimator({
  onEstimate,
}: MealEstimatorProps) {
  const [description, setDescription] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function estimateMeal() {
    if (!description.trim()) return;

    try {
      setLoading(true);

      const response = await fetch(
        "/api/estimate-meal",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            mealDescription:
              description,
          }),
        }
      );

      const data =
        await response.json();

      onEstimate(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
      <h3 className="font-semibold text-blue-900 text-lg">
        🤖 AI Nutrition Assistant
      </h3>

      <p className="text-sm text-blue-700 mt-2">
        Describe your meal and let AI estimate
        calories and macros.
      </p>

      <textarea
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
        placeholder="Large chicken schnitzel burger and medium chips"
        className="w-full mt-4 rounded-xl border p-4"
        rows={3}
      />

      <button
        type="button"
        onClick={estimateMeal}
        disabled={loading}
        className="
          mt-4
          inline-flex
          items-center
          gap-2
          rounded-xl
          bg-blue-600
          px-4
          py-3
          text-white
          hover:bg-blue-700
          disabled:opacity-50
        "
      >
        {loading ? (
          <>
            <Loader2
              size={18}
              className="animate-spin"
            />
            Estimating...
          </>
        ) : (
          <>
            <Sparkles size={18} />
            Estimate Nutrition
          </>
        )}
      </button>
    </div>
  );
}