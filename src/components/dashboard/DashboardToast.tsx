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

  // Remember the last processed query string
  const lastSearch = useRef("");

  useEffect(() => {
    const search = params.toString();

    // Nothing to process
    if (!search) {
      return;
    }

    // Prevent duplicate toasts for the same URL
    if (lastSearch.current === search) {
      return;
    }

    lastSearch.current = search;

    const success = params.get("success");

    if (!success) {
      return;
    }

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

    if (!config) {
      return;
    }

    toast.success(config.title, {
      description: config.description,
      style: toastStyle,
      duration: TOAST_DURATION,
    });

    // Remove the success parameters from the URL so
    // refreshing the page won't show the toast again.
    window.history.replaceState(
      {},
      "",
      window.location.pathname
    );
  }, [params]);

  return null;
}