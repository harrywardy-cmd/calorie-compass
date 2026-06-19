import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

import DashboardToast from "@/components/dashboard-toast";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ProgressCard from "@/components/dashboard/ProgressCard";
import StatsCards from "@/components/dashboard/StatsCards";
import InsightsCard from "@/components/dashboard/InsightsCard";
import RecentMeals from "@/components/dashboard/RecentMeals";
import WeeklyChartCard from "@/components/dashboard/WeeklyChartCard";

export default async function Dashboard() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  let user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        id: userId,
      },
    });
  }

  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

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

  const totalCalories = meals.reduce(
    (sum, meal) => sum + meal.calories,
    0
  );

  const totalProtein = meals.reduce(
    (sum, meal) => sum + meal.protein,
    0
  );

  const totalCarbs = meals.reduce(
    (sum, meal) => sum + meal.carbs,
    0
  );

  const totalFat = meals.reduce(
    (sum, meal) => sum + meal.fat,
    0
  );

  const calorieGoal = user.calorieGoal;

  const caloriePercentage = Math.round(
    (totalCalories / calorieGoal) * 100
  );

  let progressImage = "/progress/seed.png";

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

  let progressMessage = "Let's get started!";

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

  let progressBarClass = "bg-blue-500";

  if (caloriePercentage >= 120) {
    progressBarClass = "bg-red-600";
  } else if (caloriePercentage > 100) {
    progressBarClass = "bg-orange-500";
  } else if (caloriePercentage === 100) {
    progressBarClass = "bg-green-500";
  }

  const sevenDaysAgo = new Date();

sevenDaysAgo.setDate(
  sevenDaysAgo.getDate() - 6
);

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

const chartData: {
  day: string;
  calories: number;
}[] = [];

for (let i = 6; i >= 0; i--) {
  const date = new Date();

  date.setDate(
    date.getDate() - i
  );

  const dayLabel =
    date.toLocaleDateString(
      "en-AU",
      {
        weekday: "short",
      }
    );

  const dayCalories =
    mealsLastWeek
      .filter(
        (meal) =>
          meal.createdAt.toDateString() ===
          date.toDateString()
      )
      .reduce(
        (sum, meal) =>
          sum + meal.calories,
        0
      );

  chartData.push({
    day: dayLabel,
    calories: dayCalories,
  });
}

  return (
    <main className="min-h-screen bg-gray-50">
      <DashboardToast />

      <DashboardHeader />

      <div className="max-w-7xl mx-auto p-8">
        <ProgressCard
          totalCalories={totalCalories}
          calorieGoal={calorieGoal}
          caloriePercentage={caloriePercentage}
          progressMessage={progressMessage}
          progressImage={progressImage}
          progressBarClass={progressBarClass}
        />

        <StatsCards
          calories={totalCalories}
          protein={totalProtein}
          carbs={totalCarbs}
          fat={totalFat}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <InsightsCard
            totalCalories={totalCalories}
            mealsCount={meals.length}
            caloriePercentage={caloriePercentage}
          />

          <div className="lg:col-span-2">
            <WeeklyChartCard
              chartData={chartData}
              calorieGoal={calorieGoal}
            />
          </div>
        </div>

        <RecentMeals meals={meals} />
      </div>
    </main>
  );
}