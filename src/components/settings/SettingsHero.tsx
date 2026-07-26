import { User } from "@prisma/client";
import Image from "next/image";
import { CalendarDays, Flame, Globe } from "lucide-react";
import { formatTimezone } from "@/utils/date";

interface SettingsHeroProps {
  user: User | null;
  firstName?: string | null;
  imageUrl?: string;
}

export default function SettingsHero({
  user,
  firstName,
  imageUrl,
}: SettingsHeroProps) {
  return (
    <section className="mb-8 rounded-3xl border border-slate-200 bg-gradient-to-r from-sky-50 via-blue-50 to-white p-8 shadow-sm">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        {/* Left Side */}
        <div className="flex items-center gap-6">
          {/* Profile Image */}
          <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-md ring-1 ring-slate-200">
            <Image
              src={imageUrl ?? "/default-avatar.png"}
              alt={`${firstName ?? "User"}'s profile`}
              width={96}
              height={96}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Greeting */}
          <div>
            <h2 className="text-3xl font-bold text-slate-900">
              Hello{firstName ? `, ${firstName}` : ""}! 👋
            </h2>

            <p className="mt-2 max-w-md text-slate-500">
              Customize Calorie Compass to match your lifestyle and nutrition
              goals.
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="grid grid-cols-3 gap-4">
          {/* Goal */}
          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <Flame className="mb-3 h-6 w-6 text-orange-500" />

            <p className="text-2xl font-bold">{user?.calorieGoal ?? 2200}</p>

            <p className="text-sm text-slate-500">Calorie Goal</p>
          </div>
          {/* Time Zone */}
          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <Globe className="mb-3 h-6 w-6 text-blue-600" />

            <p className="font-semibold">
              {user ? formatTimezone(user.timezone) : "Not set"}
            </p>

            <p className="text-sm text-slate-500">Time Zone</p>
          </div>

          {/* Week */}
          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <CalendarDays className="mb-3 h-6 w-6 text-indigo-600" />

            <p className="font-semibold">Monday</p>

            <p className="text-sm text-slate-500">Week Starts</p>
          </div>
        </div>
      </div>
    </section>
  );
}
