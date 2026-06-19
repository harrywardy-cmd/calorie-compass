import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { Settings } from "lucide-react";

export default function DashboardHeader() {
  return (
    <div className="border-b bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <span>🧭</span>
            <span>Calorie Compass</span>
          </h1>

          <p className="text-sm text-gray-500">
            Track calories and nutrition effortlessly
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/meals/new"
            className="bg-black text-white px-5 py-2.5 rounded-xl hover:bg-gray-800 transition font-medium shadow-sm"
          >
            + Add Meal
          </Link>

          <Link
            href="/settings"
            className="p-2 rounded-xl border hover:bg-gray-100 transition"
          >
            <Settings size={20} />
          </Link>

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
  );
}