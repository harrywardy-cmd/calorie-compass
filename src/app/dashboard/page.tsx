import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

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

  // Melbourne-based current date/time
  const melbourneNow = new Date(
    new Date().toLocaleString("en-US", {
      timeZone: "Australia/Melbourne",
    })
  );

  // Start of today in Melbourne
  const today = new Date(melbourneNow);
  today.setHours(0, 0, 0, 0);

  // Start of tomorrow in Melbourne
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  // Fetch today's meals
  const meals = await prisma.meal.findMany({
    where: {
      userId,
      createdAt: {
        gte: today,
        lt: tomorrow,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });


  // Calculate total calories consumed today
  const totalCalories = meals.reduce(
    (sum, meal) => sum + meal.calories,
    0
  );

  // Calculate total protein consumed today
  const totalProtein = meals.reduce(
    (sum, meal) => sum + meal.protein,
    0
  );

  // Calculate total carbs consumed today
  const totalCarbs = meals.reduce(
    (sum, meal) => sum + meal.carbs,
    0
  );

  // Calculate total fat consumed today
  const totalFat = meals.reduce(
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

  // Start of the 7-day chart window
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(
    sevenDaysAgo.getDate() - 6
  );

  // Fetch meals from the last 7 days
  const mealsLastWeek =
    await prisma.meal.findMany({
      where: {
        userId,
        createdAt: {
          gte: sevenDaysAgo,
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

  // Data structure used by the weekly calories chart
  const chartData: {
    day: string;
    calories: number;
  }[] = [];


  // Build chart data for each of the last 7 days
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);

    date.setDate(
      date.getDate() - i
    );

    const dayStart = new Date(date);
    dayStart.setHours(0, 0, 0, 0);

    const dayEnd = new Date(dayStart);
    dayEnd.setDate(dayEnd.getDate() + 1);

    // Create short day labels (Mon, Tue, Wed, etc.)
    const dayLabel =
      date.toLocaleDateString(
        "en-AU",
        {
          weekday: "short",
        }
      );

    // Calculate total calories for this day
    const dayCalories =
      mealsLastWeek
        .filter(
          (meal) =>
            meal.createdAt >= dayStart &&
            meal.createdAt < dayEnd
        )
        .reduce(
          (sum, meal) =>
            sum + meal.calories,
          0
        );

    // Add the day's data to the chart
    chartData.push({
      day: dayLabel,
      calories: dayCalories,
    });
  }

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
            mealsCount={meals.length}
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
        <RecentMeals meals={meals} />

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