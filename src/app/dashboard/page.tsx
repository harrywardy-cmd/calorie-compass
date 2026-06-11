import { auth } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { deleteMeal } from "./actions";
import { Trash2 } from "lucide-react";
import { Pencil } from "lucide-react";
import Image from "next/image";
import { Settings } from "lucide-react";
import DashboardToast from "@/components/dashboard-toast";


import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import CalorieChart from "@/components/calorie-chart";


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
    progressMessage = "You've gone well over your goal today.";
  } else if (caloriePercentage > 100) {
    progressMessage = "You've exceeded your goal.";
  } else if (caloriePercentage === 100) {
    progressMessage = "Goal achieved!";
  } else if (caloriePercentage >= 75) {
    progressMessage = "Almost there!";
  } else if (caloriePercentage >= 50) {
    progressMessage = "Great progress!";
  } else if (caloriePercentage >= 25) {
    progressMessage = "Building momentum!";
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
    sevenDaysAgo.getDate() - 7
  );

  const mealsLastWeek =
    await prisma.meal.findMany({
      where: {
        userId,
        createdAt: {
          gte: sevenDaysAgo,
        },
      },
    });

  const caloriesByDay = new Map<
    string,
    number
  >();
  for (const meal of mealsLastWeek) {
    const day =
      meal.createdAt.toLocaleDateString(
        "en-AU",
        {
          weekday: "short",
        }
      );

    caloriesByDay.set(
      day,
      (caloriesByDay.get(day) ?? 0)
      + meal.calories
    );
  }
  const chartData = Array.from(
    caloriesByDay.entries()
  ).map(([day, calories]) => ({
    day,
    calories,
  }));

  return (
    
    <main className="min-h-screen bg-gray-50">
      <DashboardToast />
      {/* Header */}
      <div className="border-b bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">

          {/* Logo */}
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <span>🧭</span>
              <span>Calorie Compass</span>
            </h1>

            <p className="text-sm text-gray-500">
              Track calories and nutrition effortlessly
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/meals/new"
              className="bg-black text-white px-5 py-2.5 rounded-xl hover:bg-gray-800 transition font-medium shadow-sm"
            >
              + Add Meal
            </Link>

            <Link
              href="/settings"
              className="p-2 rounded-xl border hover:bg-gray-100 transition"
            >
              <Settings size={20} />
            </Link>

            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-8">
        {/* Daily Goal */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl p-8 mb-8 text-white shadow-lg">
          <h2 className="font-bold text-2xl mb-6">
            🎯 Daily Goal Progress
          </h2>

          <div className="flex items-center gap-8">
            {/* Mascot */}
            <div className="flex-shrink-0">
              <Image
                src={progressImage}
                alt="Progress Mascot"
                width={140}
                height={140}
                className="rounded-xl"
              />
            </div>

            {/* Progress Section */}
            <div className="flex-1">
              <div className="flex justify-between mb-3">
                <span className="font-medium">
                  {progressMessage}
                </span>

                <span className="text-blue-100 font-medium">
                  {totalCalories} / {calorieGoal} kcal
                </span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-6">
                <div
                  className={`${progressBarClass} h-6 rounded-full transition-all duration-700 ease-out`}
                  style={{
                    width: `${Math.min(caloriePercentage, 100)}%`,
                  }}
                />
              </div>

              <p className="text-sm text-blue-100 mt-3">
                {caloriePercentage > 100
                  ? `${caloriePercentage}% of goal (over target)`
                  : `${caloriePercentage}% of daily goal reached`}
              </p>
            </div>
          </div>
        </div>


        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl border p-6 shadow-sm hover:shadow-md transition">
            <h2 className="text-sm text-gray-500">
              🔥 Calories Today
            </h2>

            <p className="text-4xl font-bold mt-2 text-blue-500">
              {totalCalories.toLocaleString()}
            </p>

            <p className="text-sm text-gray-500 mt-1">
              kcal
            </p>
          </div>

          <div className="bg-white rounded-2xl border p-6 shadow-sm hover:shadow-md transition">
            <h2 className="text-sm text-gray-500">
              💪 Protein
            </h2>

            <p className="text-4xl font-bold mt-2 text-blue-500">
              {totalProtein}g
            </p>
          </div>

          <div className="bg-white rounded-2xl border p-6 shadow-sm hover:shadow-md transition">
            <h2 className="text-sm text-gray-500">
              🍞 Carbs
            </h2>

            <p className="text-4xl font-bold mt-2 text-blue-500">
              {totalCarbs}g
            </p>
          </div>

          <div className="bg-white rounded-2xl border p-6 shadow-sm hover:shadow-md transition">
            <h2 className="text-sm text-gray-500">
              🥑 Fat
            </h2>

            <p className="text-4xl font-bold text-blue-500">
              {totalFat}g
            </p>
          </div>
        </div>


        {/* Insights & Trends */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

          {/* Summary Card */}
          <div className="bg-gradient-to-br from-blue-600 to-cyan-500 text-white rounded-3xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">
                📈 Today's Summary
              </h2>

              <span className="text-4xl">
                🧭
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-blue-100 text-sm">
                  Calories Consumed
                </p>

                <p className="text-4xl font-bold">
                  {totalCalories.toLocaleString()}
                </p>
              </div>

              <div>
                <p className="text-blue-100 text-sm">
                  Meals Logged
                </p>

                <p className="text-2xl font-semibold">
                  {meals.length}
                </p>
              </div>

              <div className="pt-2 border-t border-white/20">
                <p className="text-sm text-blue-100">
                  {caloriePercentage > 100
                    ? "⚠️ You've exceeded your calorie goal today."
                    : caloriePercentage >= 75
                      ? "🔥 You're getting close to your daily goal."
                      : "🚀 Keep logging meals and stay on track."}
                </p>
              </div>
            </div>
          </div>



          {/* Chart Card */}
          <div className="lg:col-span-2 bg-white border rounded-3xl p-6 shadow-sm">

            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">
                  📊 Last 7 Days
                </h2>

                <p className="text-sm text-gray-500">
                  Average:{" "}
                  <span className="font-semibold text-gray-900">
                    {Math.round(
                      chartData.reduce(
                        (sum, day) => sum + day.calories,
                        0
                      ) / Math.max(chartData.length, 1)
                    )}
                    {" "}kcal/day

                  </span>
                </p>
              </div>

              <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                Weekly View
              </div>
            </div>

            <CalorieChart
              data={chartData}
              calorieGoal={calorieGoal}
            />
          </div>
        </div>

        {/* Recent Meals */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">
            Recent Meals
          </h2>

          <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
            {meals.length} Meals
          </span>
        </div>
        <div className="bg-white rounded-2xl border p-6 shadow-sm hover:shadow-md transition">
          <h2 className="text-2xl font-bold mb-4">
            Recent Meals
          </h2>

          {meals.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-5xl mb-4">🍎</p>

              <h3 className="font-semibold text-lg">
                No meals logged yet
              </h3>

              <p className="text-gray-500 mt-2">
                Add your first meal to start tracking.
              </p>

              <Link
                href="/meals/new"
                className="inline-block mt-4 bg-black text-white px-4 py-2 rounded-lg"
              >
                Add First Meal
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {meals.map((meal) => (
                <div
                  key={meal.id}
                  className="flex justify-between items-center border rounded-lg p-4 hover:bg-gray-50"
                >
                  <div>
                    <p className="font-semibold">
                      {meal.mealName}
                    </p>

                    <span className="inline-block px-2 py-1 rounded-full bg-gray-100 text-xs">
                      {meal.mealType}
                    </span>

                    <p className="text-sm text-gray-500 mt-1">
                      {meal.calories} kcal
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <Link href={`/meals/${meal.id}/edit`}>
                      <Pencil
                        size={18}
                        className="text-blue-600 hover:text-blue-800"
                      />
                    </Link>


                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button
                          type="button"
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={18} />
                        </button>
                      </AlertDialogTrigger>

                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Delete Meal?
                          </AlertDialogTitle>

                          <AlertDialogDescription>
                            This will permanently delete "{meal.mealName}".
                          </AlertDialogDescription>
                        </AlertDialogHeader>

                        <AlertDialogFooter>
                          <AlertDialogCancel>
                            Cancel
                          </AlertDialogCancel>

                          <form action={deleteMeal}>
                            <input
                              type="hidden"
                              name="mealId"
                              value={meal.id}
                            />

                            <AlertDialogAction asChild>
                              <button
                                type="submit"
                                className="bg-red-600 text-white px-4 py-2 rounded"
                              >
                                Delete
                              </button>
                            </AlertDialogAction>
                          </form>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}