"use client";

import { useState } from "react";

import LoadingLink from "@/components/ui/LoadingLink";
import SubmitButton from "@/components/ui/SubmitButton";
import MealEstimator from "@/components/ai/MealEstimator";

import { createMeal } from "@/app/meals/new/actions";

// Shape returned from Gemini
type MealEstimate = {
    mealName: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    confidence?: number;
};

export default function NewMealForm() {
    // Form state
    const [mealName, setMealName] =
        useState("");

    const [calories, setCalories] =
        useState("");

    const [protein, setProtein] =
        useState("");

    const [carbs, setCarbs] =
        useState("");

    const [fat, setFat] =
        useState("");

    const [confidence, setConfidence] =
        useState("");

    const [aiGenerated, setAiGenerated] =
        useState(false);

    return (
        <form
            action={createMeal}
            className="space-y-6"
        >

            {/* =======================================================
      AI NUTRITION ASSISTANT
      Allows users to describe a meal and let Gemini estimate
      calories and macronutrients automatically.
  ======================================================= */}
            <MealEstimator
                onEstimate={(
                    data: MealEstimate
                ) => {
                    setMealName(data.mealName);

                    setCalories(
                        data.calories.toString()
                    );

                    setProtein(
                        data.protein.toString()
                    );

                    setCarbs(
                        data.carbs.toString()
                    );

                    setFat(
                        data.fat.toString()
                    );

                    setConfidence(
                        data.confidence?.toString() ?? ""
                    );

                    setAiGenerated(true);
                }}
            />

            {/* =======================================================
      AI ESTIMATION STATUS
      Displayed only after Gemini has populated the form.
  ======================================================= */}
            {aiGenerated && (
                <div
                    className="
    flex
    flex-col
    sm:flex-row
    sm:items-center
    sm:justify-between
    gap-3
    rounded-2xl
    border
    border-green-200
    bg-green-50
    p-4
  "
                >
                    <div>
                        <p className="font-semibold text-green-900">
                            🤖 AI Nutrition Estimate Applied
                        </p>

                        <p className="text-sm text-green-700">
                            Review the values before saving.
                        </p>
                    </div>

                    <div
                        className="
          rounded-full
          bg-green-100
          px-3
          py-1
          text-sm
          font-semibold
          text-green-700
        "
                    >
                        {confidence}% confidence
                    </div>
                </div>
            )}

            {/* =======================================================
      MEAL DETAILS
      Basic information about the meal.
  ======================================================= */}
            <div className="rounded-3xl border bg-white p-6 shadow-sm">

                <h2 className="text-xl font-bold mb-5">
                    🍽️ Meal Details
                </h2>

                <div className="space-y-5">

                    {/* Meal Name */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-600">
                            Meal Name
                        </label>

                        <input
                            name="mealName"
                            required
                            value={mealName}
                            onChange={(e) =>
                                setMealName(e.target.value)
                            }
                            placeholder="Chicken Wrap"
                            className="
            w-full
            rounded-2xl
            border
            border-gray-200
            bg-gray-50
            p-4
            text-lg
            font-medium
            transition
            focus:border-blue-500
            focus:bg-white
            focus:outline-none
          "
                        />
                    </div>

                    {/* Meal Type */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-600">
                            Meal Type
                        </label>

                        <select
                            name="mealType"
                            required
                            className="
            w-full
            rounded-2xl
            border
            border-gray-200
            bg-gray-50
            p-4
            text-lg
            transition
            focus:border-blue-500
            focus:bg-white
            focus:outline-none
          "
                        >
                            <option value="">
                                Select Meal Type
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

            {/* =======================================================
      CALORIES FEATURE CARD
      Main nutritional metric displayed prominently.
  ======================================================= */}
            <div
                className="
      rounded-3xl
      bg-gradient-to-r
      from-blue-600
      to-cyan-500
      p-6
      text-white
      shadow-lg
    "
            >
                <p className="text-blue-100 text-sm">
                    Calories
                </p>

                <input
                    name="calories"
                    type="number"
                    required
                    value={calories}
                    onChange={(e) =>
                        setCalories(e.target.value)
                    }
                    placeholder="650"
                    className="
  mt-2
  w-full
  border-none
  bg-transparent
  text-4xl
  md:text-5xl
  font-bold
  placeholder:text-blue-200
  focus:outline-none
"
                />

                <p className="text-blue-100">
                    kcal
                </p>
            </div>

            {/* =======================================================
      MACRONUTRIENTS
      Protein, Carbs and Fat shown as separate cards.
  ======================================================= */}
            <div>

                <div className="mb-4">
                    <h2 className="text-xl font-bold">
                        📊 Nutrition Breakdown
                    </h2>

                    <p className="text-sm text-gray-500">
                        Macronutrients for this meal.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                    {/* Protein */}
                    <div className="rounded-3xl border bg-white p-5 shadow-sm">
                        <p className="text-sm text-gray-500">
                            Protein
                        </p>

                        <input
                            name="protein"
                            type="number"
                            value={protein}
                            onChange={(e) =>
                                setProtein(e.target.value)
                            }
                            className="
  mt-2
  w-full
  border-none
  bg-transparent
  text-3xl
  md:text-4xl
  font-bold
  focus:outline-none
"
                        />

                        <p className="text-xs text-gray-400">
                            grams
                        </p>
                    </div>

                    {/* Carbs */}
                    <div className="rounded-3xl border bg-white p-5 shadow-sm">
                        <p className="text-sm text-gray-500">
                            Carbs
                        </p>

                        <input
                            name="carbs"
                            type="number"
                            value={carbs}
                            onChange={(e) =>
                                setCarbs(e.target.value)
                            }
                            className="
  mt-2
  w-full
  border-none
  bg-transparent
  text-3xl
  md:text-4xl
  font-bold
  focus:outline-none
"
                        />

                        <p className="text-xs text-gray-400">
                            grams
                        </p>
                    </div>

                    {/* Fat */}
                    <div className="rounded-3xl border bg-white p-5 shadow-sm">
                        <p className="text-sm text-gray-500">
                            Fat
                        </p>

                        <input
                            name="fat"
                            type="number"
                            value={fat}
                            onChange={(e) =>
                                setFat(e.target.value)
                            }
                            className="
  mt-2
  w-full
  border-none
  bg-transparent
  text-3xl
  md:text-4xl
  font-bold
  focus:outline-none
"
                        />

                        <p className="text-xs text-gray-400">
                            grams
                        </p>
                    </div>

                </div>
            </div>

            {/* Hidden AI Metadata */}
            <input
                type="hidden"
                name="confidence"
                value={confidence}
            />

            <input
                type="hidden"
                name="aiGenerated"
                value={aiGenerated.toString()}
            />

            {/* =======================================================
      FORM ACTIONS
      Sticky style buttons for mobile friendliness.
  ======================================================= */}
            <div
                className="
    sticky
    bottom-0
    bg-white
    border-t
    pt-4
    mt-6
    flex
    flex-col-reverse
    sm:flex-row
    gap-3
    "
            >
                <LoadingLink
                    href="/dashboard"
                    className="
        flex-1
        rounded-2xl
        border
        px-6
        py-3
        text-center
        font-medium
        hover:bg-gray-100
        transition
      "
                >
                    Cancel
                </LoadingLink>

                <SubmitButton
                    loadingText="Saving Meal..."
                    className="
        flex-1
        rounded-2xl
        bg-blue-600
        hover:bg-blue-700
        text-white
        px-6
        py-3
        font-medium
        transition
      "
                >
                    Save Meal
                </SubmitButton>
            </div>

        </form >
    );
}