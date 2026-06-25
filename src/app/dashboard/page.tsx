import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  buildDashboardData,
} from "@/lib/dashboard/dashboard-utils";

// Dashboard UI components
import DashboardToast from "@/components/dashboard/dashboard-toast";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ProgressCard from "@/components/dashboard/ProgressCard";
import StatsCards from "@/components/dashboard/StatsCards";
import InsightsCard from "@/components/dashboard/InsightsCard";
import RecentMeals from "@/components/dashboard/RecentMeals";
import WeeklyChartCard from "@/components/dashboard/WeeklyChartCard";



export default async function Dashboard() {
  // Get the currently authenticated Clerk user
  const { userId } = await auth();

  // Redirect unauthenticated users to the sign-in page
  if (!userId) {
    redirect("/sign-in");
  }

  // Try to find the user in our database
  let user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  // Create a new database user if this is their first login
  if (!user) {
    user = await prisma.user.create({
      data: {
        id: userId,
      },
    });
  }

  // Fetch all meals
  const meals = await prisma.meal.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // Build all dashboard data (today's meals, nutrition,
  // progress, and weekly chart)

  const dashboard = buildDashboardData(
    meals,
    user.calorieGoal
  );

  const {
    nutrition,
    progress,
    chartData,
    todayMeals,
    calorieGoal,
  } = dashboard;


  return (
    <main className="min-h-screen bg-gray-50">
      {/* Toast notifications */}
      <DashboardToast />

      {/* Dashboard navigation/header */}
      <DashboardHeader />

      <div className="max-w-7xl mx-auto p-8">
        {/* Calorie goal progress section */}
        <ProgressCard
          totalCalories={nutrition.calories}
          calorieGoal={calorieGoal}
          caloriePercentage={progress.caloriePercentage}
          progressMessage={progress.progressMessage}
          progressImage={progress.progressImage}
          progressBarClass={progress.progressBarClass}
        />


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

          {/* Daily insights and summary */}
          <InsightsCard
            totalCalories={nutrition.calories}
            mealsCount={todayMeals.length}
            caloriePercentage={progress.caloriePercentage}
          />

          {/* Weekly calorie tracking chart */}
          <div className="lg:col-span-2">
            <WeeklyChartCard
              chartData={chartData}
              calorieGoal={calorieGoal}
            />
          </div>
        </div>

        {/* Recently logged meals */}
        <RecentMeals meals={dashboard.todayMeals} />

        {/* Nutrition statistics cards */}
        <StatsCards
          calories={dashboard.nutrition.calories}
          protein={dashboard.nutrition.protein}
          carbs={dashboard.nutrition.carbs}
          fat={dashboard.nutrition.fat}
        />
      </div>
    </main>
  );
}