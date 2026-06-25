import Link from "next/link";
import {
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

import { ROUTES } from "@/lib/routes";
import {
    getLocalDateKey,
    parseLocalDate,
    formatLocalDate,
} from "@/utils/date";

type Props = {
    selectedDate: string;
};

export default function HistoryDateNavigator({
    selectedDate,
}: Props) {
    const current = parseLocalDate(
        selectedDate
    );

    const previous = new Date(current);
    previous.setDate(previous.getDate() - 1);

    const next = new Date(current);
    next.setDate(next.getDate() + 1);

    const formatQuery = (
        date: Date
    ) => formatLocalDate(date);

    const prettyDate =
        current.toLocaleDateString("en-AU", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
        });

    return (
        <div className="mb-8 rounded-3xl border bg-white p-6 shadow-sm">

            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                {/* Previous Day */}
                <Link
                    href={`${ROUTES.history}?date=${formatQuery(previous)}`}
                    className="
        flex
        items-center
        gap-3
        rounded-2xl
        border
        px-4
        py-3
        transition
        hover:border-blue-200
        hover:bg-blue-50
      "
                >
                    <div className="rounded-full bg-blue-100 p-2">
                        <ChevronLeft
                            size={18}
                            className="text-blue-600"
                        />
                    </div>

                    <div>
                        <p className="text-xs text-gray-500">
                            Previous
                        </p>

                        <p className="font-medium">
                            Day
                        </p>
                    </div>
                </Link>

                {/* Current Date */}
                <div className="flex flex-col items-center text-center">

                    <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1 text-sm font-medium text-blue-700">
                        📅 Nutrition Journal
                    </div>

                    <h2 className="text-2xl font-bold">
                        {prettyDate}
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Browse your meals one day at a time
                    </p>

                    <Link
                        href={ROUTES.history}
                        className="
          mt-4
          inline-flex
          items-center
          rounded-xl
          bg-blue-600
          px-5
          py-2
          text-sm
          font-medium
          text-white
          transition
          hover:bg-blue-700
        "
                    >
                        Today
                    </Link>

                </div>

                {/* Next Day */}
                <Link
                    href={`${ROUTES.history}?date=${formatQuery(next)}`}
                    className="
        flex
        items-center
        gap-3
        rounded-2xl
        border
        px-4
        py-3
        transition
        hover:border-blue-200
        hover:bg-blue-50
      "
                >
                    <div>
                        <p className="text-right text-xs text-gray-500">
                            Next
                        </p>

                        <p className="text-right font-medium">
                            Day
                        </p>
                    </div>

                    <div className="rounded-full bg-blue-100 p-2">
                        <ChevronRight
                            size={18}
                            className="text-blue-600"
                        />
                    </div>
                </Link>

            </div>

        </div>
    );
}