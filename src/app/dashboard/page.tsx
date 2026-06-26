import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { buildDashboardData } from "@/lib/dashboard/dashboard-utils";

// Dashboard UI components
import DashboardToast from "@/components/dashboard/DashboardToast";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatsCards from "@/components/dashboard/StatsCards";
import InsightsCard from "@/components/dashboard/InsightsCard";
import WeeklyChartCard from "@/components/dashboard/WeeklyChartCard";
import DashboardStatusBar from "@/components/dashboard/DashboardStatusBar";
import DashboardHero from "@/components/dashboard/DashboardHero";
import { getLocalDateKey } from "@/utils/date";
import MealList from "@/components/dashboard/meals/MealList";
import { NutritionSummary } from "@/types/dashboard";

// Dashboard page
// Displays the user's daily nutrition summary,
// weekly analytics and recently logged meals.
type DashboardPageProps = {
  searchParams: Promise<{
    date?: string;
  }>;
};

export default async function Dashboard({ searchParams }: DashboardPageProps) {
  // ======================================================
  // Authentication
  // Ensure the user is signed in before accessing the dashboard.
  // ======================================================

  // Get the currently authenticated Clerk user
  const { userId } = await auth();

  // Redirect unauthenticated users to the sign-in page
  if (!userId) {
    redirect("/sign-in");
  }

  // ======================================================
  // User
  // Retrieve the user's database record or create one
  // if this is their first login.
  // ======================================================

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

  const params = await searchParams;

  const selectedDate = params.date ?? getLocalDateKey(new Date());

  // ======================================================
  // Meals
  // Retrieve every meal belonging to the current user.
  // ======================================================

  // Fetch all meals ordered from newest to oldest
  const meals = await prisma.meal.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // ======================================================
  // Dashboard Data
  // Calculate today's nutrition, progress,
  // weekly chart data and other dashboard metrics.
  // ======================================================

  const dashboard = buildDashboardData(meals, user.calorieGoal, selectedDate);

  // Extract the calculated dashboard values
  const { nutrition, progress, chartData, todayMeals, calorieGoal } = dashboard;
  const goals = {
    calories: user.calorieGoal,
    protein: user.proteinGoal,
    carbs: user.carbGoal,
    fat: user.fatGoal,
  };

  const nutritionSummary: NutritionSummary = {
    totals: nutrition,
    goals,
  };

  // ======================================================
  // Render Dashboard
  // ======================================================

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Success Toast Notifications */}
      <DashboardToast />

      {/* Dashboard Navigation */}
      <DashboardHeader />

      {/* Main Dashboard Container */}
      <div className="mx-auto max-w-7xl p-8">
        <div className="space-y-8">
          {/* ==================================================
            Status Bar
            Displays today's date and current progress status.
        ================================================== */}
          <DashboardStatusBar
            progress={progress.caloriePercentage}
            selectedDate={selectedDate}
          />

          {/* ==================================================
            Hero
            Displays today's calorie progress and motivation.
        ================================================== */}
          <DashboardHero
            calories={nutrition.calories}
            calorieGoal={calorieGoal}
            progress={progress.caloriePercentage}
            progressImage={progress.progressImage}
          />

          {/* ==================================================
            Dashboard Overview
            Daily summary and weekly calorie analytics.
        ================================================== */}
          <section>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* Daily Summary */}
              <InsightsCard
                totalCalories={nutrition.calories}
                mealsCount={todayMeals.length}
                caloriePercentage={progress.caloriePercentage}
              />

              {/* Weekly Calorie Chart */}
              <div className="lg:col-span-2">
                <WeeklyChartCard
                  chartData={chartData}
                  calorieGoal={calorieGoal}
                />
              </div>
            </div>
          </section>

          {/* ==================================================
            Today's Meals
            Displays meals logged for the current day.
        ================================================== */}
          <section>
            <MealList meals={todayMeals} />
          </section>

          {/* ==================================================
            Nutrition Summary
            Daily calories and macronutrient totals.
        ================================================== */}
          <section>
            <StatsCards nutrition={nutritionSummary} />
          </section>
        </div>
      </div>
    </main>
  );
}
