// ======================================================
// Application Date Utilities
// Shared date helpers used throughout Calorie Compass.
// ======================================================

// Timezone used throughout the application.
// Later this can come from the user's profile.
export const APP_TIMEZONE =
  "Australia/Melbourne";

/**
 * Returns a YYYY-MM-DD string for a date in the
 * application's timezone.
 *
 * Example:
 * 2026-06-25
 */
export function getLocalDateKey(
  date: Date,
  timeZone = APP_TIMEZONE
) {
  const parts = new Intl.DateTimeFormat("en", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  const year = parts.find(
    (part) => part.type === "year"
  )!.value;

  const month = parts.find(
    (part) => part.type === "month"
  )!.value;

  const day = parts.find(
    (part) => part.type === "day"
  )!.value;

  return `${year}-${month}-${day}`;
}

/**
 * Creates a local Date object from a YYYY-MM-DD string.
 *
 * Example:
 * "2026-06-25"
 */
export function parseLocalDate(
  dateString: string
) {
  const [year, month, day] = dateString
    .split("-")
    .map(Number);

  return new Date(year, month - 1, day);
}

/**
 * Formats a Date object back into YYYY-MM-DD.
 */
export function formatLocalDate(
  date: Date
) {
  return getLocalDateKey(date);
}

/**
 * Returns the last N local calendar days.
 *
 * Example:
 * [
 *   { key: "2026-06-19", date: Date },
 *   ...
 * ]
 */
export function getLastLocalDateKeys(
  days = 7,
  now = new Date()
) {
  const dates: {
    key: string;
    date: Date;
  }[] = [];

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);

    date.setDate(date.getDate() - i);

    dates.push({
      key: getLocalDateKey(date),
      date,
    });
  }

  return dates;
}

/**
 * Formats a meal's logged date and time.
 *
 * Examples:
 * Today • 26/06/2026 • 7:30 PM
 * Yesterday • 25/06/2026 • 12:15 PM
 * 24/06/2026 • 8:45 AM
 */
export function formatMealDate(date: Date) {
  const now = new Date();

  const dateString = date.toLocaleDateString("en-AU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const timeString = date.toLocaleTimeString("en-AU", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  if (date.toDateString() === now.toDateString()) {
    return `Today • ${dateString} • ${timeString}`;
  }

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  if (date.toDateString() === yesterday.toDateString()) {
    return `Yesterday • ${dateString} • ${timeString}`;
  }

  return `${dateString} • ${timeString}`;
}

/**
 * Formats only the meal time.
 *
 * Example:
 * 7:30 PM
 */
export function formatMealTime(date: Date) {
  return new Intl.DateTimeFormat("en-AU", {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

/**
 * Formats a date into a long, readable format.
 *
 * Example:
 * Friday, 26 June 2026
 */
export function formatLongDate(
  date: Date,
  timeZone = APP_TIMEZONE
) {
  return new Intl.DateTimeFormat("en-AU", {
    timeZone,
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

/**
 * Returns the current day of the year.
 *
 * Examples:
 * January 1st -> 1
 * June 26th -> 177
 */
export function getDayOfYear(
  date: Date
) {
  const startOfYear = new Date(
    date.getFullYear(),
    0,
    0
  );

  const millisecondsPerDay =
    1000 * 60 * 60 * 24;

  return Math.floor(
    (date.getTime() - startOfYear.getTime()) /
      millisecondsPerDay
  );
}

/**
 * Returns one motivational quote per day.
 *
 * The quote changes every day but remains
 * consistent throughout that day.
 */
export function getDailyQuote(
  date = new Date()
) {
  const quotes = [
    "Small choices, big changes.",
    "Progress over perfection.",
    "Every healthy meal counts.",
    "Consistency beats intensity.",
    "Fuel your body, fuel your future.",
    "Healthy habits are built one meal at a time.",
    "One meal at a time, one goal at a time.",
    "Today's effort becomes tomorrow's results.",
    "Healthy habits create healthy lives.",
    "Success is built one meal at a time.",
  ];

  const day = getDayOfYear(date);

  return quotes[
    day % quotes.length
  ];
}