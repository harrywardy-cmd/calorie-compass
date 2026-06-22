"use client";

import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";

// Nutrition data returned from Gemini
type MealEstimate = {
    mealName: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    confidence?: number;
};

// Props passed from the meal form
type MealEstimatorProps = {
    onEstimate: (data: MealEstimate) => void;
};

// AI meal estimation component
export default function MealEstimator({
    onEstimate,
}: MealEstimatorProps) {
    const [description, setDescription] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    async function estimateMeal() {
        if (!description.trim()) {
            setError(
                "Please describe your meal first."
            );

            return;
        }

        try {
            setLoading(true);
            setError("");

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

            if (!response.ok) {
                throw new Error(
                    data.error ??
                    "Failed to estimate meal"
                );
            }

            // Send estimated values back to parent form
            onEstimate(data);
        } catch (error) {
            console.error(error);

            setError(
                error instanceof Error
                    ? error.message
                    : "Unable to estimate meal."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div
            className="
        rounded-2xl
        border
        border-blue-200
        bg-gradient-to-br
        from-blue-50
        to-cyan-50
        p-6
      "
        >
            {/* Header */}
            <div className="flex items-center gap-2 mb-2">
                <Sparkles
                    size={20}
                    className="text-blue-600"
                />

                <h3 className="font-semibold text-blue-900">
                    AI Nutrition Assistant
                </h3>
            </div>

            <p className="text-sm text-blue-700 mb-4">
                Describe your meal and let AI
                estimate calories and macros.
            </p>

            {/* Description Input */}
            <textarea
                value={description}
                onChange={(e) =>
                    setDescription(
                        e.target.value
                    )
                }
                rows={3}
                placeholder="Large chicken schnitzel burger and medium chips"
                className="
          w-full
          rounded-xl
          border
          border-blue-200
          p-4
          resize-none
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
        "
            />
            {/* Error Message */}
            {error && (
                <div
                    className="
      mt-4
      rounded-xl
      border
      border-amber-200
      bg-amber-50
      p-3
      text-sm
      text-amber-800
    "
                >
                    ⚠️ {error}
                </div>
            )}

            {/* Estimate Button */}
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
          px-5
          py-3
          text-white
          font-medium
          hover:bg-blue-700
          transition
          disabled:opacity-50
          disabled:cursor-not-allowed
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

            {/* Example */}
            <div className="mt-4 text-xs text-blue-600">
                Example:
                <span className="ml-1 italic">
                    "Chicken schnitzel burger
                    with chips and a Coke"
                </span>
            </div>
        </div>
    );
}