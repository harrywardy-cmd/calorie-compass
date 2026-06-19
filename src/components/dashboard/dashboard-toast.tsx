"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

// Displays dashboard success notifications
export default function DashboardToast() {
    // Access URL query parameters
    const params = useSearchParams();

    // Prevent the toast from displaying multiple times
    const shown = useRef(false);

    useEffect(() => {
        // Exit if the toast has already been displayed
        if (shown.current) return;

        // Check if the user was redirected after creating a meal
        if (params.get("success") === "meal-added") {
            shown.current = true;

            const mealName = params.get("meal");
            const calories = params.get("calories");

            // Display a custom success toast
            toast.success("🌱 Progress Updated!", {
                description: `${mealName} (${calories} kcal) has been added to your nutrition journal.`,
                style: {
                    background:
                        "linear-gradient(135deg, #2563EB 0%, #06B6D4 100%)",
                    color: "#fff",
                    borderRadius: "20px",
                    border: "1px solid rgba(255,255,255,0.15)",
                    boxShadow:
                        "0 25px 50px rgba(37,99,235,0.30)",
                },
                duration: 4000,
            });
        }
    }, [params]);

    return null;
}