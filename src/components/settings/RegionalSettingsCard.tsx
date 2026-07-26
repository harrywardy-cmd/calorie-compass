"use client";

import {
  Globe,
  CalendarDays,
  CalendarRange,
  Pencil,
  Check,
  ChevronsUpDown,
} from "lucide-react";
import { User } from "@prisma/client";
import { updateRegionalSetting } from "@/app/settings/actions";
import { toast } from "sonner";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";

interface RegionalSettingsCardProps {
  user: User;
}

export default function RegionalSettingsCard({
  user,
}: RegionalSettingsCardProps) {
  // Tracks which regional setting is currently being edited
  const [editingSetting, setEditingSetting] = useState<
    "timezone" | "weekStartsOn" | "dateFormat" | null
  >(null);

  // Stores the selected value while editing
  const [settingValue, setSettingValue] = useState("");

  // Titles shown in the modal
  const titles = {
    timezone: "Time Zone",
    weekStartsOn: "Week Starts",
    dateFormat: "Date Format",
  };

  // Descriptions shown in the modal
  const descriptions = {
    timezone: "Choose your local timezone.",
    weekStartsOn: "Select the first day of your week.",
    dateFormat: "Choose how dates are displayed.",
  };

  const [openTimezone, setOpenTimezone] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6">
        <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-900">
          <Globe className="h-5 w-5 text-blue-600" />
          Regional Settings
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Configure your timezone, week start, and date formatting.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {/* Time Zone */}
        <div className="flex min-h-[185px] flex-col rounded-xl border border-slate-200 p-5 transition-shadow hover:shadow-md">
          <Globe className="mb-3 h-6 w-6 text-blue-600" />

          <h3 className="text-sm font-medium text-slate-600">Time Zone</h3>

          <p className="mt-2 break-words text-lg font-semibold text-slate-900">
            {user.timezone}
          </p>

          <button
            onClick={() => {
              setSettingValue(user.timezone);
              setEditingSetting("timezone");
            }}
            className="mt-auto flex items-center gap-2 pt-6 text-sm font-medium text-blue-600 transition-colors hover:text-blue-700"
          >
            <Pencil className="h-4 w-4" />
            Edit
          </button>
        </div>

        {/* Week Starts */}
        <div className="flex min-h-[185px] flex-col rounded-xl border border-slate-200 p-5 transition-shadow hover:shadow-md">
          <CalendarRange className="mb-3 h-6 w-6 text-blue-600" />

          <h3 className="text-sm font-medium text-slate-600">Week Starts</h3>

          <p className="mt-2 text-lg font-semibold text-slate-900">
            {user.weekStartsOn}
          </p>

          <button
            onClick={() => {
              setSettingValue(user.weekStartsOn);
              setEditingSetting("weekStartsOn");
            }}
            className="mt-auto flex items-center gap-2 pt-6 text-sm font-medium text-blue-600 transition-colors hover:text-blue-700"
          >
            <Pencil className="h-4 w-4" />
            Edit
          </button>
        </div>

        {/* Date Format */}
        <div className="flex min-h-[185px] flex-col rounded-xl border border-slate-200 p-5 transition-shadow hover:shadow-md">
          <CalendarDays className="mb-3 h-6 w-6 text-blue-600" />

          <h3 className="text-sm font-medium text-slate-600">Date Format</h3>

          <p className="mt-2 text-lg font-semibold text-slate-900">
            {user.dateFormat}
          </p>

          <button
            onClick={() => {
              setSettingValue(user.dateFormat);
              setEditingSetting("dateFormat");
            }}
            className="mt-auto flex items-center gap-2 pt-6 text-sm font-medium text-blue-600 transition-colors hover:text-blue-700"
          >
            <Pencil className="h-4 w-4" />
            Edit
          </button>
        </div>

        {editingSetting && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
              <h3 className="text-xl font-semibold">
                Edit {titles[editingSetting]}
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                {descriptions[editingSetting]}
              </p>

              <form
                action={async (formData) => {
                  await updateRegionalSetting(formData);

                  toast.success(
                    `${titles[editingSetting]} updated successfully!`,
                  );

                  setEditingSetting(null);
                }}
                className="mt-6 space-y-5"
              >
                <input type="hidden" name="setting" value={editingSetting} />

                {/* Time Zone */}
                {editingSetting === "timezone" && (
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-900">
                      Time Zone
                    </label>

                    <p className="mb-5 text-sm text-slate-500">
                      Select your local time zone. This is used for meal
                      timestamps, reminders, reports, and daily tracking.
                    </p>

                    <Popover open={openTimezone} onOpenChange={setOpenTimezone}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={openTimezone}
                          className="h-11 w-full justify-between rounded-xl"
                        >
                          {settingValue || "Select a timezone..."}

                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>

                      <PopoverContent
                        className="w-[420px] rounded-xl p-0"
                        align="start"
                      >
                        <Command>
                          <CommandInput placeholder="Search time zones..." />

                          <CommandList className="max-h-72">
                            <CommandEmpty>No timezone found.</CommandEmpty>

                            <CommandGroup heading="Time Zones">
                              {Intl.supportedValuesOf("timeZone").map(
                                (timezone) => (
                                  <CommandItem
                                    key={timezone}
                                    value={timezone}
                                    onSelect={(value) => {
                                      setSettingValue(value);
                                      setOpenTimezone(false);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        settingValue === timezone
                                          ? "opacity-100"
                                          : "opacity-0",
                                      )}
                                    />

                                    {timezone}
                                  </CommandItem>
                                ),
                              )}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>

                    <input type="hidden" name="value" value={settingValue} />

                    <p className="mt-3 text-xs text-slate-500">
                      Your timezone determines how dates and times are displayed
                      throughout Calorie Compass.
                    </p>
                  </div>
                )}

                {/* Week Starts */}
                {editingSetting === "weekStartsOn" && (
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-900">
                      Week Starts On
                    </label>

                    <p className="mb-5 text-sm text-slate-500">
                      Choose which day appears first in your calendar and weekly
                      reports.
                    </p>

                    <div className="space-y-3">
                      {[
                        {
                          value: "Monday",
                          label: "Monday",
                          description:
                            "ISO 8601 international standard used in Australia and most countries.",
                        },
                        {
                          value: "Sunday",
                          label: "Sunday",
                          description:
                            "Traditional calendar format commonly used in the United States.",
                        },
                      ].map((day) => (
                        <label
                          key={day.value}
                          className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 transition-all ${
                            settingValue === day.value
                              ? "border-blue-500 bg-blue-50 shadow-sm"
                              : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                          }`}
                        >
                          <div>
                            <p className="font-medium text-slate-900">
                              {day.label}
                            </p>

                            <p className="mt-1 text-sm text-slate-500">
                              {day.description}
                            </p>
                          </div>

                          <input
                            type="radio"
                            name="value"
                            value={day.value}
                            checked={settingValue === day.value}
                            onChange={(e) => setSettingValue(e.target.value)}
                            className="h-4 w-4 accent-blue-600"
                          />
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Date Format */}
                {editingSetting === "dateFormat" && (
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-900">
                      Date Format
                    </label>

                    <p className="mb-5 text-sm text-slate-500">
                      Choose how dates are displayed throughout Calorie Compass.
                    </p>

                    <div className="space-y-3">
                      {[
                        {
                          value: "DD/MM/YYYY",
                          label: "DD/MM/YYYY",
                          description:
                            "Common in Australia, Europe, and most countries.",
                        },
                        {
                          value: "MM/DD/YYYY",
                          label: "MM/DD/YYYY",
                          description:
                            "Standard format used in the United States.",
                        },
                        {
                          value: "YYYY-MM-DD",
                          label: "YYYY-MM-DD",
                          description: "ISO 8601 international standard.",
                        },
                      ].map((format) => (
                        <label
                          key={format.value}
                          className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 transition-all ${
                            settingValue === format.value
                              ? "border-blue-500 bg-blue-50 shadow-sm"
                              : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                          }`}
                        >
                          <div>
                            <p className="font-medium text-slate-900">
                              {format.label}
                            </p>

                            <p className="mt-1 text-sm text-slate-500">
                              {format.description}
                            </p>
                          </div>

                          <input
                            type="radio"
                            name="value"
                            value={format.value}
                            checked={settingValue === format.value}
                            onChange={(e) => setSettingValue(e.target.value)}
                            className="h-4 w-4 accent-blue-600"
                          />
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setEditingSetting(null)}
                    className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
