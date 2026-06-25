"use client";

import { useMemo, useState } from "react";
import { Meal } from "@prisma/client";

import MealCard from "@/components/dashboard/MealCard";
import HistoryToolbar from "./HistoryToolbar";
import { ROUTES } from "@/lib/routes";

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
                    filteredMeals.map((meal) => (
                        <MealCard
                            key={meal.id}
                            meal={meal}
                            redirectTo={ROUTES.history}
                        />
                    ))
                )}

            </div>
        </>
    );
}