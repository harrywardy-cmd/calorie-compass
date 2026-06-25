import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  getTodayMeals,
  buildWeeklyChart,
  calculateProgress,
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

  // Filter meals that belong to today
  const todayMeals = getTodayMeals(meals);

  // Calculate today's nutrition totals
  const nutrition = todayMeals.reduce(
    (totals, meal) => {
      totals.calories += meal.calories;
      totals.protein += meal.protein;
      totals.carbs += meal.carbs;
      totals.fat += meal.fat;

      return totals;
    },
    {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
    }
  );

  // Extract the calculated totals
  const totalCalories = nutrition.calories;
  const totalProtein = nutrition.protein;
  const totalCarbs = nutrition.carbs;
  const totalFat = nutrition.fat;

  // User's daily calorie goal
  const calorieGoal = user.calorieGoal;

  const progress = calculateProgress(
    totalCalories,
    calorieGoal
  );

  const chartData =
    buildWeeklyChart(meals);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Toast notifications */}
      <DashboardToast />

      {/* Dashboard navigation/header */}
      <DashboardHeader />

      <div className="max-w-7xl mx-auto p-8">
        {/* Calorie goal progress section */}
        <ProgressCard
          totalCalories={totalCalories}
          calorieGoal={calorieGoal}
          caloriePercentage={progress.caloriePercentage}
          progressMessage={progress.progressMessage}
          progressImage={progress.progressImage}
          progressBarClass={progress.progressBarClass}
        />


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Daily insights and summary */}
          <InsightsCard
            totalCalories={totalCalories}
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
        <RecentMeals meals={todayMeals} />

        {/* Nutrition statistics cards */}
        <StatsCards
          calories={totalCalories}
          protein={totalProtein}
          carbs={totalCarbs}
          fat={totalFat}
        />
      </div>
    </main>
  );
}