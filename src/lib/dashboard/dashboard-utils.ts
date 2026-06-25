import { Meal } from "@prisma/client";

// Returns the start of today
export function getStartOfToday(date: Date) {
  const today = new Date(date);

  today.setHours(0, 0, 0, 0);

  return today;
}

// Returns the start of tomorrow
export function getStartOfTomorrow(date: Date) {
  const tomorrow = getStartOfToday(date);

  tomorrow.setDate(
    tomorrow.getDate() + 1
  );

  return tomorrow;
}

// Filters meals that belong to today
export function getTodayMeals(
  meals: Meal[],
  now = new Date()
) {
  const start = getStartOfToday(now);
  const end = getStartOfTomorrow(now);

  return meals.filter(
    (meal) =>
      meal.createdAt >= start &&
      meal.createdAt < end
  );
}
// Returns the last seven calendar days, including today
export function getLastSevenDays(
  date = new Date()
) {
  const days: Date[] = [];

  const today = getStartOfToday(date);

  for (let i = 6; i >= 0; i--) {
    const day = new Date(today);

    day.setDate(day.getDate() - i);

    days.push(day);
  }

  return days;
}
// Builds the weekly calorie chart
export function buildWeeklyChart(
  meals: Meal[],
  now = new Date()
) {
  const days = getLastSevenDays(now);

  return days.map((day) => {
    const start = getStartOfToday(day);
    const end = getStartOfTomorrow(day);

    const calories = meals
      .filter(
        (meal) =>
          meal.createdAt >= start &&
          meal.createdAt < end
      )
      .reduce(
        (sum, meal) => sum + meal.calories,
        0
      );

    return {
      day: day.toLocaleDateString(
        "en-AU",
        {
          weekday: "short",
        }
      ),
      calories,
    };
  });
}