"use client";

import { UserButton } from "@clerk/nextjs";
import {
  Settings,
  Plus,
  History,
} from "lucide-react";

import LoadingLink from "../ui/LoadingLink";
import NavButton from "@/components/ui/NavButton";

// Mobile-only dashboard header
export default function DashboardHeaderMobile() {
  return (
    <header className="sticky top-0 z-50 border-b bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg">

      {/* Mobile Container */}
      <div className="px-4 py-4">

        {/* Top Row */}
        <div className="flex items-center justify-between">

          {/* App Branding */}
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <span>🧭</span>
              <span>Calorie Compass</span>
            </h1>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">

            {/* History */}
            <NavButton
              href="/dashboard/history"
              icon={History}
              showLabel={false}
            />

            {/* Settings */}
            <NavButton
              href="/settings"
              icon={Settings}
              showLabel={false}
            />

            {/* User Menu */}
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-9 h-9",
                },
              }}
            />

          </div>
        </div>

        {/* Subtitle */}
        <p className="text-sm text-white/80 mt-1">
          Track calories and nutrition effortlessly
        </p>

        {/* Add Meal Button */}
        <NavButton
          href="/meals/new"
          icon={Plus}
          variant="primary"
          fullWidth
        >
          Add Meal
        </NavButton>
      </div>
    </header>
  );
}