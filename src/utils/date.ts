import { fromZonedTime } from "date-fns-tz";

// ======================================================
// Application Date Utilities
// Shared date helpers used throughout Calorie Compass.
// ======================================================

// Timezone used throughout the application.
// Later this can come from the user's profile.
export const DEFAULT_TIMEZONE = "Australia/Melbourne";

/**
 * Returns the current application date/time.
 *
 * This is the only place in the application that should
 * directly create a new Date representing "now".
 */
export function getCurrentLocalDate() {
  return new Date();
}

/**
 * Returns today's date as a YYYY-MM-DD string.
 *
 * Example:
 * 2026-06-25
 */
export function getCurrentLocalDateKey(
  timeZone = DEFAULT_TIMEZONE
) {
  return getLocalDateKey(
    getCurrentLocalDate(),
    timeZone
  );
}

/**
 * Returns a YYYY-MM-DD string for a date in the
 * application's timezone.
 *
 * Example:
 * 2026-06-25
 */
export function getLocalDateKey(
  date: Date,
  timeZone = DEFAULT_TIMEZONE
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
 * Creates a meal Date.
 *
 * If the user selected a date, preserve the current
 * local time in the user's timezone on that day.
 *
 * Otherwise return the current date/time.
 */
export function createMealDate(
  mealDate?: string,
  timeZone = DEFAULT_TIMEZONE
) {
  // No selected date, use the current timestamp.
  if (!mealDate) {
    return new Date();
  }

  // Get the current time in the user's timezone
  const now = new Date();

  const parts = new Intl.DateTimeFormat("en-AU", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(now);

  const hour = parts.find(p => p.type === "hour")?.value ?? "00";
  const minute = parts.find(p => p.type === "minute")?.value ?? "00";
  const second = parts.find(p => p.type === "second")?.value ?? "00";

  // Build the user's local date and time
  const localDateTime =
    `${mealDate}T${hour}:${minute}:${second}`;

  // Convert that local time into the correct UTC instant
  return fromZonedTime(localDateTime, timeZone);
}

/**
 * Formats a Date object back into YYYY-MM-DD.
 */
export function formatLocalDate(
  date: Date,
  timeZone = DEFAULT_TIMEZONE
) {
  return getLocalDateKey(
    date,
    timeZone
  );
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
  now = getCurrentLocalDate(),
  timeZone = DEFAULT_TIMEZONE
) {
  const dates: {
    key: string;
    date: Date;
  }[] = [];

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);

    date.setDate(date.getDate() - i);

    dates.push({
      key: getLocalDateKey(
        date,
        timeZone
      ),
      date,
    });
  }

  return dates;
}

/**
 * Formats an IANA timezone into a user-friendly string.
 *
 * Examples:
 * Australia/Melbourne -> Australia / Melbourne
 * America/New_York -> America / New York
 * Europe/London -> Europe / London
 */
export function formatTimezone(
  timezone: string
) {
  return timezone
    .replaceAll("_", " ")
    .split("/")
    .join(" / ");
}

/**
 * Formats a meal's logged date and time.
 *
 * Examples:
 * Today • 26/06/2026 • 7:30 PM
 * Yesterday • 25/06/2026 • 12:15 PM
 * 24/06/2026 • 8:45 AM
 */
export function formatMealDate(
  date: Date,
  timeZone = DEFAULT_TIMEZONE
) {
  const now = getCurrentLocalDate();

  const dateString = date.toLocaleDateString("en-AU", {
    timeZone,
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const timeString = date.toLocaleTimeString("en-AU", {
    timeZone,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  // Check if the meal was logged today
  if (
    getLocalDateKey(date, timeZone) ===
    getLocalDateKey(now, timeZone)
  ) {
    return `Today • ${dateString} • ${timeString}`;
  }

  // Calculate yesterday relative to the current date
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);

  // Check if the meal was logged yesterday
  if (
    getLocalDateKey(date, timeZone) ===
    getLocalDateKey(yesterday, timeZone)
  ) {
    return `Yesterday • ${dateString} • ${timeString}`;
  }

  // Otherwise display the formatted date
  return `${dateString} • ${timeString}`;
}

/**
 * Formats only the meal time.
 *
 * Example:
 * 7:30 PM
 */
export function formatMealTime(
  date: Date,
  timeZone = DEFAULT_TIMEZONE
) {
  return new Intl.DateTimeFormat("en-AU", {
    timeZone,
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
  timeZone = DEFAULT_TIMEZONE
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
    (date.getTime() -
      startOfYear.getTime()) /
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
  date = getCurrentLocalDate()
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