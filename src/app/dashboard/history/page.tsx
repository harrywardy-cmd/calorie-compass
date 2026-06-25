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

      <div className="max-w-7xl mx-auto p-8">

        {/* Page Header */}
        <div className="mb-8">

          <Link
            href={ROUTES.dashboard}
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-black mb-4 transition-colors"
          >
            <ArrowLeft size={18} />
            Back to Dashboard
          </Link>

          <h1 className="text-4xl font-bold">
            📖 Nutrition Journal
          </h1>
          <HistoryDateNavigator
            selectedDate={selectedDate}
          />

        </div>

        {/* History Card */}
        <HistoryList meals={mealsForDay} />

      </div>
    </main>
  );
}