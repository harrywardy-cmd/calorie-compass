import { auth } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { deleteMeal } from "./actions";
import { Trash2 } from "lucide-react";

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

  const meals = await prisma.meal.findMany({
    where: {
      userId,
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

  const calorieGoal = 2200;

  const caloriePercentage = Math.min(
    Math.round((totalCalories / calorieGoal) * 100),
    100
  );

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              🧭 Calorie Compass
            </h1>

            <p className="text-sm text-gray-500">
              Track calories and nutrition effortlessly
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/meals/new"
              className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
            >
              + Add Meal
            </Link>

            <UserButton />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-8">
        {/* Daily Goal */}
        <div className="bg-white border rounded-xl p-6 mb-8">
          <div className="flex justify-between mb-3">
            <h2 className="font-semibold">
              Daily Goal Progress
            </h2>

            <span className="text-sm text-gray-500">
              {totalCalories} / {calorieGoal} kcal
            </span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-green-500 h-4 rounded-full transition-all"
              style={{
                width: `${caloriePercentage}%`,
              }}
            />
          </div>

          <p className="mt-2 text-sm text-gray-500">
            {caloriePercentage}% of daily goal reached
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white border rounded-xl p-6">
            <h2 className="text-sm text-gray-500">
              Calories Today
            </h2>

            <p className="text-4xl font-bold mt-2">
              {totalCalories}
            </p>

            <p className="text-sm text-gray-500 mt-1">
              kcal
            </p>
          </div>

          <div className="bg-white border rounded-xl p-6">
            <h2 className="text-sm text-gray-500">
              Protein
            </h2>

            <p className="text-4xl font-bold mt-2">
              {totalProtein}g
            </p>
          </div>

          <div className="bg-white border rounded-xl p-6">
            <h2 className="text-sm text-gray-500">
              Carbs
            </h2>

            <p className="text-4xl font-bold mt-2">
              {totalCarbs}g
            </p>
          </div>

          <div className="bg-white border rounded-xl p-6">
            <h2 className="text-sm text-gray-500">
              Fat
            </h2>

            <p className="text-4xl font-bold mt-2">
              {totalFat}g
            </p>
          </div>
        </div>

        {/* Recent Meals */}
        <div className="bg-white border rounded-xl p-6">
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
                    <p className="font-medium">
                      {meal.mealName}
                    </p>

                    <p className="text-sm text-gray-500">
                      {meal.calories} kcal
                    </p>
                  </div>

                  <form action={deleteMeal}>
                    <input
                      type="hidden"
                      name="mealId"
                      value={meal.id}
                    />

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
                  </form>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}