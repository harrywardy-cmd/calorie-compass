import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import HistoryList from "@/components/history/HistoryList";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { ROUTES } from "@/lib/routes";
import { getLocalDateKey } from "@/utils/date";

import HistoryDateNavigator from "@/components/history/HistoryDateNavigator";


export default async function MealHistoryPage({
  searchParams,
}: {
  searchParams: Promise<{
    date?: string;
  }>;
}) {
  // Get authenticated user
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const { date } = await searchParams;

  // Default to today if no date is supplied
  const selectedDate =
    date ?? getLocalDateKey(new Date());
  // Fetch every meal
  const meals = await prisma.meal.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // Only keep meals from the selected day
  const mealsForDay = meals.filter(
    (meal) =>
      getLocalDateKey(meal.createdAt) ===
      selectedDate
  );

  return (
    <main className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">

        {/* Back Button */}
        <Link
          href={ROUTES.dashboard}
          className="
      mb-6
      inline-flex
      items-center
      gap-2
      rounded-xl
      px-3
      py-2
      text-sm
      text-gray-600
      transition
      hover:bg-white
      hover:text-black
    "
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>

        {/* Hero Section */}
        <section
          className="
      mb-6
      overflow-hidden
      rounded-3xl
      bg-gradient-to-r
      from-blue-600
      to-cyan-500
      p-8
      text-white
      shadow-lg
    "
        >
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

            {/* Left */}
            <div>

              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1 text-sm font-medium">
                📖 Nutrition Journal
              </div>

              <h1 className="mt-4 text-4xl font-bold">
                Meal History
              </h1>

              <p className="mt-3 max-w-2xl text-white/80">
                Browse your nutrition history one day at a time,
                revisit previous meals and monitor your eating
                habits over time.
              </p>

            </div>

            {/* Right Stats */}
            <div className="grid grid-cols-2 gap-4">

              <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
                <p className="text-sm text-white/70">
                  Meals
                </p>

                <p className="mt-1 text-3xl font-bold">
                  {mealsForDay.length}
                </p>

                <p className="text-xs text-white/70">
                  Logged today
                </p>
              </div>

              <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
                <p className="text-sm text-white/70">
                  AI Meals
                </p>

                <p className="mt-1 text-3xl font-bold">
                  {
                    mealsForDay.filter(
                      meal => meal.aiGenerated
                    ).length
                  }
                </p>

                <p className="text-xs text-white/70">
                  AI estimated
                </p>
              </div>

            </div>

          </div>
        </section>

        {/* Date Navigation */}
        <HistoryDateNavigator
          selectedDate={selectedDate}
        />

        {/* Meals */}
        <HistoryList meals={mealsForDay} />

      </div>
    </main>
  );
}