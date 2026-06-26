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
  dateKey: string
) {
  return meals.filter(
    (meal) =>
      getLocalDateKey(meal.createdAt) ===
      dateKey
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
  now = new Date()
) {
  const days = getLastLocalDateKeys(7, now);

  return days.map(({ key, date }) => {
    const calories = meals
      .filter(
        (meal) =>
          getLocalDateKey(meal.createdAt) === key
      )
      .reduce(
        (sum, meal) => sum + meal.calories,
        0
      );

    return {
      day: date.toLocaleDateString("en-AU", {
        weekday: "short",
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
    progressImage,
    progressMessage,
    progressBarClass,
  };
}

// Builds all dashboard data from the user's meals
export function buildDashboardData(
  meals: Meal[],
  calorieGoal: number,
  selectedDate: string
) {
  // Get meals for the selected dashboard date
  const todayMeals = getMealsForDate(
    meals,
    selectedDate
  );

  // Calculate today's nutrition totals
  const nutrition = calculateNutrition(todayMeals);

  // Calculate progress toward the calorie goal
  const progress = calculateProgress(
    nutrition.calories,
    calorieGoal
  );

  // Build the weekly calorie chart
  const chartData = buildWeeklyChart(meals);

  return {
    todayMeals,
    nutrition,
    progress,
    chartData,
    calorieGoal,
  };
}