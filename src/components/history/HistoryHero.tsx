import { Meal } from "@prisma/client";
import {
    Flame,
    Beef,
    Wheat,
    Droplets,
    Utensils,
} from "lucide-react";

import SummaryStatCard from "./SummaryStatCard";

type HistoryHeroProps = {
    meals: Meal[];
};

export default function HistoryHero({
    meals,
}: HistoryHeroProps) {

    // Daily nutrition totals
    const calories = meals.reduce(
        (sum, meal) => sum + meal.calories,
        0
    );

    const protein = meals.reduce(
        (sum, meal) => sum + meal.protein,
        0
    );

    const carbs = meals.reduce(
        (sum, meal) => sum + meal.carbs,
        0
    );

    const fat = meals.reduce(
        (sum, meal) => sum + meal.fat,
        0
    );

    const mealCount = meals.length;

    return (
        <section
            className="
    mb-8
    overflow-hidden
    rounded-3xl
    bg-gradient-to-r
    from-blue-600
    to-cyan-500
    p-8
    text-white
    shadow-xl
  "
        >

            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

                {/* Left */}
                <div className="max-w-2xl">

                    <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1 text-sm font-medium">
                        📖 Nutrition Journal
                    </div>

                    <h1 className="mt-5 text-4xl font-bold">
                        Daily Nutrition Summary
                    </h1>

                    <p className="mt-3 text-white/80 leading-relaxed">
                        Review everything you've eaten today, monitor
                        your nutrition and discover patterns over time.
                    </p>

                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">

                    {/* Calories */}
                    <SummaryStatCard
                        icon={<Flame size={22} />}
                        title="Calories"
                        value={calories}
                        unit="kcal"
                    />

                    {/* Protein */}
                    <SummaryStatCard
                        icon={<Beef size={22} />}
                        title="Protein"
                        value={protein}
                        unit="g"
                    />


                    {/* Carbs */}

                    <SummaryStatCard
                        icon={<Wheat size={22} />}
                        title="Carbs"
                        value={carbs}
                        unit="g"
                    />
                    {/* Fat */}
                    <SummaryStatCard
                        icon={<Droplets size={22} />}
                        title="Fat"
                        value={fat}
                        unit="g"
                    />

                    {/* Meals */}

                    <SummaryStatCard
                        icon={<Utensils size={22} />}
                        title="Meals"
                        value={mealCount}
                    />
                </div>

            </div>

        </section>
    );
}