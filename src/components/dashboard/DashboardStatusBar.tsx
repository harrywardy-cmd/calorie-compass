"use client";
import { CalendarDays, ChevronDown } from "lucide-react";

import {
  formatLongDate,
  getDailyQuote,
  parseLocalDate,
  getLocalDateKey,
} from "@/utils/date";
import { useRouter } from "next/navigation";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

type DashboardStatusBarProps = {
  progress: number;
  selectedDate: string;
};

export default function DashboardStatusBar({
  progress,
  selectedDate,
}: DashboardStatusBarProps) {
  const quote = getDailyQuote();
  const router = useRouter();
  // Convert the selected YYYY-MM-DD string into a Date object
  const currentDate = parseLocalDate(selectedDate);

  // Format it for display
  const today = formatLongDate(currentDate);

  function getStatus(progress: number) {
    if (progress >= 100) {
      return {
        label: "Goal Achieved",
        icon: "🎉",
        className: "bg-green-100 text-green-700",
      };
    }

    if (progress >= 75) {
      return {
        label: "Almost There",
        icon: "🔥",
        className: "bg-orange-100 text-orange-700",
      };
    }

    if (progress >= 50) {
      return {
        label: "Great Progress",
        icon: "💪",
        className: "bg-cyan-100 text-cyan-700",
      };
    }

    if (progress >= 25) {
      return {
        label: "On Track",
        icon: "🟢",
        className: "bg-emerald-100 text-emerald-700",
      };
    }

    return {
      label: "Getting Started",
      icon: "🚀",
      className: "bg-slate-100 text-slate-700",
    };
  }

  const status = getStatus(progress);

  return (
    <section
      className="
        mb-6
        rounded-2xl
        border
        bg-white
        px-6
        py-4
        shadow-sm
      "
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Left */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Date */}
          <Popover>
            <PopoverTrigger asChild>
              <button
                className="
        inline-flex
        items-center
        gap-2
        rounded-xl
        px-3
        py-2
        text-gray-800
        transition
        hover:bg-gray-100
      "
              >
                <CalendarDays size={18} className="text-blue-600" />

                <span className="font-semibold">{today}</span>

                <ChevronDown size={16} className="text-blue-600" />
              </button>
            </PopoverTrigger>

            <PopoverContent
              align="start"
              sideOffset={10}
              className="
      w-auto
      rounded-3xl
      border
      bg-white
      p-5
      shadow-2xl
    "
            >
              {/* Header */}
              <div className="mb-5">
                <h3 className="text-lg font-bold">Select Date</h3>

                <p className="text-sm text-gray-500">
                  View your nutrition for any day.
                </p>
              </div>

              {/* Calendar */}
              <Calendar
                mode="single"
                selected={parseLocalDate(selectedDate)}
                disabled={(date) => date > new Date()}
                onSelect={(date) => {
                  if (!date) return;

                  router.push(`/dashboard?date=${getLocalDateKey(date)}`);
                }}
              />

              {/* Footer */}
              <div className="mt-5 flex items-center justify-between border-t pt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push("/dashboard")}
                >
                  Today
                </Button>

                <p className="text-xs text-gray-500">
                  Future dates are disabled
                </p>
              </div>
            </PopoverContent>
          </Popover>

          {/* Status */}
          <div
            className={`
              inline-flex
              items-center
              gap-2
              rounded-full
              px-4
              py-2
              text-sm
              font-semibold
              ${status.className}
            `}
          >
            <span>{status.icon}</span>
            {status.label}
          </div>
        </div>

        {/* Quote */}
        <p className="text-sm italic text-gray-500 lg:text-right">
          "{quote}" ✨
        </p>
      </div>
    </section>
  );
}
