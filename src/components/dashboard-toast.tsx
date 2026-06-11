"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

export default function DashboardToast() {
    const params = useSearchParams();
    const shown = useRef(false);

    useEffect(() => {
        if (shown.current) return;

        if (params.get("success") === "meal-added") {
            shown.current = true;

            toast.success(
                `🍽️ ${params.get("meal")} added successfully!`, {
                style: {
                    background:
                        "linear-gradient(135deg, #2563EB, #06B6D4)",
                    color: "#FFFFFF",
                    border: "none",
                },
            }
            );
        }
    }, [params]);

    return null;
}