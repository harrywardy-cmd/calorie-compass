"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

import {
  toastStyle,
  TOAST_DURATION,
} from "@/lib/toast";

// Displays dashboard success notifications
export default function DashboardToast() {
  const params = useSearchParams();

  // Prevent the toast from displaying multiple times
  const shown = useRef(false);

  useEffect(() => {
    if (shown.current) return;

    const success = params.get("success");

    if (!success) return;

    shown.current = true;

    const mealName =
      params.get("meal") ?? "Meal";

    const calories =
      params.get("calories");

    // Toast configurations
    const toastMessages = {
      "meal-added": {
        title: "🌱 Progress Updated!",
        description: `${mealName}${
          calories ? ` (${calories} kcal)` : ""
        } has been added to your nutrition journal.`,
      },

      "meal-updated": {
        title: "✏️ Meal Updated!",
        description: `${mealName} has been successfully updated.`,
      },

      "meal-deleted": {
        title: "🗑️ Meal Deleted!",
        description: `${mealName} has been removed from your nutrition journal.`,
      },
    } as const;

    const config =
      toastMessages[
        success as keyof typeof toastMessages
      ];

    if (!config) return;

    toast.success(config.title, {
      description: config.description,
      style: toastStyle,
      duration: TOAST_DURATION,
    });
  }, [params]);

  return null;
}