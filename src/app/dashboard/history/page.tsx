import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import MealCard from "@/components/dashboard/MealCard";
import { ROUTES } from "@/lib/routes";



export default async function MealHistoryPage() {
  // Get authenticated user
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  // Fetch every meal
  const meals = await prisma.meal.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

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
            🍽 Meal History
          </h1>

          <p className="text-gray-500 mt-2">
            Browse every meal you've logged.
          </p>

        </div>

        {/* History Card */}
        <div className="bg-white rounded-3xl border shadow-sm overflow-hidden">

          {meals.length === 0 ? (
            <div className="text-center py-20">

              <p className="text-6xl mb-4">
                🍎
              </p>

              <h2 className="text-2xl font-semibold">
                No meals yet
              </h2>

              <p className="text-gray-500 mt-2">
                Start logging meals to build your history.
              </p>

            </div>
          ) : (
            meals.map((meal) => (
              <MealCard
                key={meal.id}
                meal={meal}
                redirectTo={ROUTES.history}
              />
            ))
          )}

        </div>

      </div>
    </main>
  );
}