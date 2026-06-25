"use client";

import LoadingLink from "@/components/ui/LoadingLink";
import NavButton from "@/components/ui/NavButton";
import { UserButton } from "@clerk/nextjs";
import {
  Settings,
  Plus,
  History,
} from "lucide-react";

// Desktop-only dashboard header
export default function DashboardHeaderDesktop() {
  return (
    <header className="sticky top-0 z-50 border-b bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg">

      {/* Centered content container */}
      <div className="max-w-7xl mx-auto px-8 py-4">

        {/* Main Header Row */}
        <div className="flex items-center justify-between">

          {/* Branding Section */}
          <div>
            <h1 className="flex items-center gap-2 text-3xl font-bold">
              <span>🧭</span>
              <span>Calorie Compass</span>
            </h1>

            <p className="mt-1 text-sm text-white/80">
              Track calories and nutrition effortlessly
            </p>
          </div>

          {/* Navigation Actions */}
          <div className="flex items-center gap-3">

            {/* Add Meal */}
            <NavButton
              href="/meals/new"
              icon={Plus}
              variant="primary"
            >
              Add Meal
            </NavButton>

            {/* Meal History */}
            <NavButton
              href="/dashboard/history"
              icon={History}
            >
              History
            </NavButton>

            {/* Settings */}
            <NavButton
              href="/settings"
              icon={Settings}
              showLabel={false}
            />

            {/* User Profile */}
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "h-10 w-10",
                },
              }}
            />

          </div>
        </div>

      </div>
    </header>
  );
}