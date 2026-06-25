"use client";

import { useMemo, useState } from "react";
import { Meal } from "@prisma/client";

import MealCard from "@/components/dashboard/MealCard";
import HistoryToolbar from "./HistoryToolbar";
import { ROUTES } from "@/lib/routes";
import MealGroup from "./MealGroup";

type HistoryListProps = {
    meals: Meal[];
};

export default function HistoryList({
    meals,
}: HistoryListProps) {
    const [search, setSearch] = useState("");
    const [mealType, setMealType] = useState("All");
    const filteredMeals = useMemo(() => {
        const query = search.trim().toLowerCase();

        return meals.filter((meal) => {
            const matchesSearch =
                meal.mealName
                    .toLowerCase()
                    .includes(query);

            const matchesMealType =
                mealType === "All" ||
                meal.mealType === mealType;

            return (
                matchesSearch &&
                matchesMealType
            );
        });
    }, [meals, search, mealType]);

    const breakfastMeals = filteredMeals.filter(
        (meal) => meal.mealType === "Breakfast"
    );

    const lunchMeals = filteredMeals.filter(
        (meal) => meal.mealType === "Lunch"
    );

    const dinnerMeals = filteredMeals.filter(
        (meal) => meal.mealType === "Dinner"
    );

    const snackMeals = filteredMeals.filter(
        (meal) => meal.mealType === "Snack"
    );

    return (
        <>
            <HistoryToolbar
                search={search}
                onSearchChange={setSearch}

                mealType={mealType}
                onMealTypeChange={setMealType}

                totalMeals={meals.length}
                filteredMeals={filteredMeals.length}
            />

            <div className="rounded-3xl border bg-white shadow-sm overflow-hidden">

                {filteredMeals.length === 0 ? (
                    <div className="py-20 text-center">
                        <p className="mb-4 text-6xl">
                            🔍
                        </p>

                        <h2 className="text-2xl font-semibold">
                            No meals found
                        </h2>

                        <p className="mt-2 text-gray-500">
                            Try a different search.
                        </p>
                    </div>
                ) : (
                    <>
                        <MealGroup
                            title="Breakfast"
                            emoji="🍳"
                            meals={breakfastMeals}
                            redirectTo={ROUTES.history}
                        />

                        <MealGroup
                            title="Lunch"
                            emoji="🥪"
                            meals={lunchMeals}
                            redirectTo={ROUTES.history}
                        />

                        <MealGroup
                            title="Dinner"
                            emoji="🍝"
                            meals={dinnerMeals}
                            redirectTo={ROUTES.history}
                        />

                        <MealGroup
                            title="Snack"
                            emoji="🍎"
                            meals={snackMeals}
                            redirectTo={ROUTES.history}
                        />
                    </>
                )}

            </div>
        </>
    );
}