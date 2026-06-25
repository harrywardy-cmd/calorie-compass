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

        const mealName = params.get("meal") ?? "Meal";
        const calories = params.get("calories");



        switch (success) {
            case "meal-added":
                toast.success("🌱 Progress Updated!", {
                    description: `${mealName} (${calories} kcal) has been added to your nutrition journal.`,
                    style: toastStyle,
                    duration: TOAST_DURATION,
                });
                break;

            case "meal-updated":
                toast.success("✏️ Meal Updated!", {
                    description: `${mealName} has been successfully updated.`,
                    style: toastStyle,
                    duration: TOAST_DURATION,
                });
                break;

            case "meal-deleted":
                toast.success("🗑️ Meal Deleted!", {
                    description: `${mealName} has been removed from your nutrition journal.`,
                    style: toastStyle,
                    duration: TOAST_DURATION,
                });
                break;
        }
    }, [params]);

    return null;
}