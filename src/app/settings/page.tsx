import { auth, currentUser } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import SettingsHero from "@/components/settings/SettingsHero";
import NutritionGoalsCard from "@/components/settings/NutritionGoalsCard";
import { ArrowLeft, Settings } from "lucide-react";
import LoadingLink from "@/components/ui/LoadingLink";
import RegionalSettingsCard from "@/components/settings/RegionalSettingsCard";
import { ProfileCard } from "@/components/settings/ProfileCard";

// Settings page for managing user preferences
export default async function SettingsPage() {
  const { userId } = await auth();
  const clerkUser = await currentUser();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Page Header */}
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">
                <Settings className="h-7 w-7 text-blue-600" />
              </div>

              <div>
                <h1 className="text-4xl font-bold tracking-tight text-slate-900">
                  Settings
                </h1>

                <p className="mt-1 text-slate-500">
                  Manage your account, nutrition goals, and application
                  preferences.
                </p>
              </div>
            </div>
          </div>

          <LoadingLink
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 hover:shadow-md"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </LoadingLink>
        </div>

        {/* Hero */}
        <SettingsHero
          user={user}
          firstName={clerkUser?.firstName}
          imageUrl={clerkUser?.imageUrl}
        />

        {/* Settings Cards */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="lg:col-span-2">
            <NutritionGoalsCard user={user} />
          </div>

          <ProfileCard />

          <RegionalSettingsCard user={user} />

          {/* <AppearanceCard /> */}

          {/* <NotificationsCard /> */}

          {/* <AboutCard /> */}

          {/* <AccountDataCard /> */}
        </div>
      </div>
    </main>
  );
}
