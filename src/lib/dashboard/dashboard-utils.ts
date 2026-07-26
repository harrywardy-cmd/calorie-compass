import { Meal } from "@prisma/client";
import {
  getLocalDateKey,
  getLastLocalDateKeys,
} from "@/utils/date";


/**
 * Returns all meals for a specific date.
 */
export function getMealsForDate(
  meals: Meal[],
  dateKey: string,
  timeZone: string
) {
  return meals.filter(
    (meal) =>
      getLocalDateKey(
        meal.createdAt,
        timeZone
      ) === dateKey
  );
}

// Calculates the nutrition totals for a collection of meals
export function calculateNutrition(
  meals: Meal[]
) {
  return meals.reduce(
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
}


// Returns the last seven calendar days, including today
export function getLastSevenDays(
  now = new Date()
) {
  const days: Date[] = [];

  const today = new Date(now);
  today.setHours(0, 0, 0, 0);

  for (let i = 6; i >= 0; i--) {
    const day = new Date(today);

    day.setDate(today.getDate() - i);

    days.push(day);
  }

  return days;
}

// Builds weekly calorie totals
export function buildWeeklyChart(
  meals: Meal[],
  timeZone: string,
  now = new Date()
) {
  const days = getLastLocalDateKeys(
    7,
    now,
    timeZone
  );

  return days.map(({ key, date }) => {
    const calories = meals
      .filter(
        (meal) =>
          getLocalDateKey(
            meal.createdAt,
            timeZone
          ) === key
      )
      .reduce(
        (sum, meal) => sum + meal.calories,
        0
      );

    return {
      day: date.toLocaleDateString("en-AU", {
        weekday: "short",
        timeZone,
      }),
      calories,
    };
  });
}

export function calculateProgress(
  totalCalories: number,
  calorieGoal: number
) {
  const caloriePercentage = Math.round(
    (totalCalories / calorieGoal) * 100
  );

  let progressMessage = "Let's get started!";

  if (caloriePercentage >= 120) {
    progressMessage =
      "You've gone well over your goal today.";
  } else if (caloriePercentage > 100) {
    progressMessage =
      "You've exceeded your goal.";
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

  return {
    caloriePercentage,
    progressMessage,
    progressBarClass,
  };
}

// Builds all dashboard data from the user's meals
export function buildDashboardData(
  meals: Meal[],
  calorieGoal: number,
  selectedDate: string,
  timeZone: string
) {
  const todayMeals = getMealsForDate(
    meals,
    selectedDate,
    timeZone
  );

  const nutrition =
    calculateNutrition(todayMeals);

  const progress =
    calculateProgress(
      nutrition.calories,
      calorieGoal
    );

  const chartData =
    buildWeeklyChart(
      meals,
      timeZone
    );

  return {
    todayMeals,
    nutrition,
    progress,
    chartData,
    calorieGoal,
  };
}