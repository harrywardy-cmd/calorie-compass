import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { Settings, Plus } from "lucide-react";

// Desktop-only dashboard header
export default function DashboardHeaderDesktop() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur shadow-sm">

      {/* Centered content container */}
      <div className="max-w-7xl mx-auto px-8 py-4">

        {/* Main Header Row */}
        <div className="flex items-center justify-between">

          {/* Branding Section */}
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <span>🧭</span>
              <span>Calorie Compass</span>
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Track calories and nutrition effortlessly
            </p>
          </div>

          {/* Navigation Actions */}
          <div className="flex items-center gap-3">

            {/* Add Meal Button */}
            <Link
              href="/meals/new"
              className="
                flex
                items-center
                gap-2
                bg-black
                text-white
                px-5
                py-2.5
                rounded-xl
                hover:bg-gray-800
                transition
                font-medium
                shadow-sm
              "
            >
              <Plus size={18} />
              Add Meal
            </Link>

            {/* Settings Button */}
            <Link
              href="/settings"
              className="
                p-2.5
                rounded-xl
                border
                hover:bg-gray-100
                transition
              "
            >
              <Settings size={20} />
            </Link>

            {/* User Profile Menu */}
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}