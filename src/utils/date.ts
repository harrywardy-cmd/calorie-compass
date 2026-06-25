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