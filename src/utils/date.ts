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
  return new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

// Creates a local date from a YYYY-MM-DD string
export function parseLocalDate(
  dateString: string
) {
  const [year, month, day] = dateString
    .split("-")
    .map(Number);

  return new Date(year, month - 1, day);
}

// Formats a local date back into YYYY-MM-DD
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
 *  "2026-06-19",
 *  "2026-06-20",
 *  ...
 *  "2026-06-25"
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
// Formats a meal's logged date and time
// Formats a meal's logged date and time
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

  // Today
  if (date.toDateString() === now.toDateString()) {
    return `Today • ${dateString} • ${timeString}`;
  }

  // Yesterday
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  if (date.toDateString() === yesterday.toDateString()) {
    return `Yesterday • ${dateString} • ${timeString}`;
  }

  // Older dates
  return `${dateString} • ${timeString}`;

}

export function formatMealTime(date: Date) {
  return new Intl.DateTimeFormat("en-AU", {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}