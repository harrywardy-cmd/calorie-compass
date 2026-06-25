import { Meal } from "@prisma/client";

import MealCard from "@/components/dashboard/MealCard";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

type MealGroupProps = {
    title: string;
    emoji: string;
    meals: Meal[];
    redirectTo: string;
};

export default function MealGroup({
    title,
    emoji,
    meals,
    redirectTo,
}: MealGroupProps) {
    if (meals.length === 0) {
        return null;
    }
    // Nutrition totals for this meal group
    const totalCalories = meals.reduce(
        (sum, meal) => sum + meal.calories,
        0
    );

    const totalProtein = meals.reduce(
        (sum, meal) => sum + meal.protein,
        0
    );

    const totalCarbs = meals.reduce(
        (sum, meal) => sum + meal.carbs,
        0
    );

    const totalFat = meals.reduce(
        (sum, meal) => sum + meal.fat,
        0
    );
    return (
        <section className="mb-8">

            <Accordion
                type="single"
                collapsible
                defaultValue={title}
            >

                <AccordionItem
                    value={title}
                    className="
    mb-4
    overflow-hidden
    rounded-3xl
    border
    bg-white
    shadow-sm
  "
                >

                    {/* Section Header */}
                    <AccordionTrigger
                        className="
    px-6
    py-5
    hover:no-underline
  "
                    >
                        <div className="flex w-full items-center justify-between gap-6">

                            {/* Left */}
                            <div className="flex items-center gap-4">

                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">
                                    <span className="text-3xl">
                                        {emoji}
                                    </span>
                                </div>

                                <div className="text-left">
                                    <h2 className="text-2xl font-bold">
                                        {title}
                                    </h2>

                                    <p className="text-sm text-gray-500">
                                        {meals.length} meal{meals.length !== 1 && "s"}
                                    </p>
                                </div>

                            </div>

                            {/* Nutrition Summary */}
                            <div className="flex flex-wrap justify-end gap-2">

                                {/* Cards */}
                                <div className="flex flex-wrap gap-3">

                                    <div className="rounded-xl bg-orange-50 px-4 py-3 text-center">
                                        <p className="text-xs text-orange-600 font-medium">
                                            Calories
                                        </p>

                                        <p className="text-xl font-bold">
                                            {totalCalories}
                                        </p>

                                        <p className="text-xs text-gray-500">
                                            kcal
                                        </p>
                                    </div>

                                    <div className="rounded-xl bg-red-50 px-4 py-3 text-center">
                                        <p className="text-xs text-red-600 font-medium">
                                            Protein
                                        </p>

                                        <p className="text-xl font-bold">
                                            {Math.round(totalProtein)}g
                                        </p>
                                    </div>

                                    <div className="rounded-xl bg-yellow-50 px-4 py-3 text-center">
                                        <p className="text-xs text-yellow-700 font-medium">
                                            Carbs
                                        </p>

                                        <p className="text-xl font-bold">
                                            {Math.round(totalCarbs)}g
                                        </p>
                                    </div>

                                    <div className="rounded-xl bg-green-50 px-4 py-3 text-center">
                                        <p className="text-xs text-green-700 font-medium">
                                            Fat
                                        </p>

                                        <p className="text-xl font-bold">
                                            {Math.round(totalFat)}g
                                        </p>
                                    </div>

                                </div>

                            </div>

                        </div>
                    </AccordionTrigger>





                    <AccordionContent className="pb-0">

                        <div className="divide-y">

                            {meals.map((meal) => (
                                <MealCard
                                    key={meal.id}
                                    meal={meal}
                                    redirectTo={redirectTo}
                                />
                            ))}

                        </div>

                    </AccordionContent>

                </AccordionItem>

            </Accordion>

        </section >
    );
}