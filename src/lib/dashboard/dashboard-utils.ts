import { Meal } from "@prisma/client";
import {
  getLocalDateKey,
  getLastLocalDateKeys,
} from "@/utils/date";


// Filters meals that belong to today
export function getTodayMeals(
  meals: Meal[],
  now = new Date()
) {
  const todayKey =
    getLocalDateKey(now);

  return meals.filter(
    meal =>
      getLocalDateKey(meal.createdAt) ===
      todayKey
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