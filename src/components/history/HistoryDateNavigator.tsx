import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { ROUTES } from "@/lib/routes";

type Props = {
  selectedDate: string;
};

export default function HistoryDateNavigator({
  selectedDate,
}: Props) {
  const current = new Date(selectedDate);

  const previous = new Date(current);
  previous.setDate(previous.getDate() - 1);

  const next = new Date(current);
  next.setDate(next.getDate() + 1);

  const formatQuery = (date: Date) =>
    date.toISOString().split("T")[0];

  const prettyDate =
    current.toLocaleDateString("en-AU", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  return (
    <div className="mb-8 flex items-center justify-between rounded-3xl border bg-white p-6 shadow-sm">

      {/* Previous */}
      <Link
        href={`${ROUTES.history}?date=${formatQuery(
          previous
        )}`}
        className="flex items-center gap-2 rounded-xl px-4 py-2 transition hover:bg-gray-100"
      >
        <ChevronLeft size={18} />
        Previous
      </Link>

      {/* Current Date */}
      <div className="text-center">
        <p className="text-sm text-gray-500">
          Viewing
        </p>

        <h2 className="text-xl font-semibold">
          📅 {prettyDate}
        </h2>

        <Link
          href={ROUTES.history}
          className="mt-2 inline-block text-sm font-medium text-blue-600 hover:underline"
        >
          Today
        </Link>
      </div>

      {/* Next */}
      <Link
        href={`${ROUTES.history}?date=${formatQuery(
          next
        )}`}
        className="flex items-center gap-2 rounded-xl px-4 py-2 transition hover:bg-gray-100"
      >
        Next
        <ChevronRight size={18} />
      </Link>

    </div>
  );
}