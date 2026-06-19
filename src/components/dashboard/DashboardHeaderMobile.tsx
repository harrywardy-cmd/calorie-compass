
import { UserButton } from "@clerk/nextjs";
import { Settings, Plus } from "lucide-react";
import LoadingLink from "../ui/LoadingLink";

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

            {/* Settings */}
            <LoadingLink
              href="/settings"
              className="
                p-2
                rounded-xl
                border
                hover:bg-gray-100
                transition
              "
            >
              <Settings size={18} />
            </LoadingLink>

            {/* Clerk User Menu */}
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
        <LoadingLink
          href="/meals/new"
          className="
            mt-4
            w-full
            flex
            items-center
            justify-center
            gap-2
            bg-black
            text-white
            py-3
            rounded-xl
            font-medium
            shadow-sm
            hover:bg-gray-800
            transition
          "
        >
          <Plus size={18} />
          Add Meal
        </LoadingLink>
      </div>
    </header>
  );
}