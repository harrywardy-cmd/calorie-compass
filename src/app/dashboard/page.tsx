import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  getTodayMeals,
  buildWeeklyChart,
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

  // Filter today's meals
  const todayMeals =
    getTodayMeals(meals);

  // Calculate total calories consumed today
  const totalCalories = todayMeals.reduce(
    (sum, meal) => sum + meal.calories,
    0
  );

  // Calculate total protein consumed today
  const totalProtein = todayMeals.reduce(
    (sum, meal) => sum + meal.protein,
    0
  );

  // Calculate total carbohydrates consumed today
  const totalCarbs = todayMeals.reduce(
    (sum, meal) => sum + meal.carbs,
    0
  );

  // Calculate total fat consumed today
  const totalFat = todayMeals.reduce(
    (sum, meal) => sum + meal.fat,
    0
  );

  // Get the user's daily calorie goal
  const calorieGoal = user.calorieGoal;

  // Calculate progress toward calorie goal as a percentage
  const caloriePercentage = Math.round(
    (totalCalories / calorieGoal) * 100
  );

  // Default progress image (seed stage)
  let progressImage = "/progress/seed.png";

  // Select the appropriate growth stage image
  if (caloriePercentage >= 120) {
    progressImage = "/progress/dead.png";
  } else if (caloriePercentage >= 100) {
    progressImage = "/progress/golden-tree.png";
  } else if (caloriePercentage >= 75) {
    progressImage = "/progress/fruit-tree.png";
  } else if (caloriePercentage >= 50) {
    progressImage = "/progress/tree.png";
  } else if (caloriePercentage >= 25) {
    progressImage = "/progress/sprout.png";
  }

  // Default motivational message
  let progressMessage = "Let's get started!";

  // Update message based on calorie goal progress
  if (caloriePercentage >= 120) {
    progressMessage =
      "You've gone well over your goal today.";
  } else if (caloriePercentage > 100) {
    progressMessage =
      "You've exceeded your goal.";
  } else if (caloriePercentage === 100) {
    progressMessage =
      "Goal achieved!";
  } else if (caloriePercentage >= 75) {
    progressMessage =
      "Almost there!";
  } else if (caloriePercentage >= 50) {
    progressMessage =
      "Great progress!";
  } else if (caloriePercentage >= 25) {
    progressMessage =
      "Building momentum!";
  }

  // Default progress bar colour
  let progressBarClass = "bg-blue-500";

  // Change colour depending on progress
  if (caloriePercentage >= 120) {
    progressBarClass = "bg-red-600";
  } else if (caloriePercentage > 100) {
    progressBarClass = "bg-orange-500";
  } else if (caloriePercentage === 100) {
    progressBarClass = "bg-green-500";
  }

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
          caloriePercentage={caloriePercentage}
          progressMessage={progressMessage}
          progressImage={progressImage}
          progressBarClass={progressBarClass}
        />



        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Daily insights and summary */}
          <InsightsCard
            totalCalories={totalCalories}
            mealsCount={todayMeals.length}
            caloriePercentage={caloriePercentage}
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