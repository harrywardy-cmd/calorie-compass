"use client";

import { useMemo, useState } from "react";
import { Meal } from "@prisma/client";
import {
    Accordion,
} from "@/components/ui/accordion";

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
    const filteredMeals = useMemo(() => {
        const query = search.trim().toLowerCase();

        return meals.filter((meal) =>
            meal.mealName.toLowerCase().includes(query)
        );
    }, [meals, search]);

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
    const [expandedSections, setExpandedSections] =
        useState<string[]>([]);
    const ALL_SECTIONS = [
        "Breakfast",
        "Lunch",
        "Dinner",
        "Snack",
    ];

    const expandAll = () => {
        setExpandedSections(ALL_SECTIONS);
    };

    const collapseAll = () => {
        setExpandedSections([]);
    };

    const mealGroups = [
        {
            title: "Breakfast",
            emoji: "🍳",
            meals: breakfastMeals,
        },
        {
            title: "Lunch",
            emoji: "🥪",
            meals: lunchMeals,
        },
        {
            title: "Dinner",
            emoji: "🍝",
            meals: dinnerMeals,
        },
        {
            title: "Snack",
            emoji: "🍎",
            meals: snackMeals,
        },
    ];
    return (
        <>
            <HistoryToolbar
                search={search}
                onSearchChange={setSearch}
                totalMeals={meals.length}
                filteredMeals={filteredMeals.length}
                onExpandAll={expandAll}
                onCollapseAll={collapseAll}
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
                    <Accordion
                        type="multiple"
                        value={expandedSections}
                        onValueChange={setExpandedSections}
                        className="space-y-4"
                    >
                        {mealGroups.map((group) => (
                            <MealGroup
                                key={group.title}
                                {...group}
                                redirectTo={ROUTES.history}
                            />
                        ))}
                    </Accordion>
                )}

            </div>
        </>
    );
}