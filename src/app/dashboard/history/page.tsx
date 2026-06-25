import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import HistoryList from "@/components/history/HistoryList";
import MealCaloriesChart from "@/components/history/MealCaloriesChart";
import HistoryHero from "@/components/history/HistoryHero";

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

    {/* Daily Summary */}
    <HistoryHero meals={mealsForDay} />

    {/* Date Navigation */}
    <HistoryDateNavigator
      selectedDate={selectedDate}
    />

    {/* Meals */}
    <HistoryList meals={mealsForDay} />

    {/* Daily Calories Chart */}
    <div className="mt-8">
      <MealCaloriesChart
        meals={mealsForDay}
      />
    </div>

  </div>
</main>
  );
}