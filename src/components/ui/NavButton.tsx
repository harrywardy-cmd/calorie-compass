"use client";

import { LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";

import LoadingLink from "./LoadingLink";

type NavButtonProps = {
    href: string;
    icon: LucideIcon;
    children?: React.ReactNode;
    showLabel?: boolean;
    variant?: "default" | "primary";
    fullWidth?: boolean;
};

export default function NavButton({
    href,
    icon: Icon,
    children,
    showLabel = true,
    variant = "default",
    fullWidth = false,
}: NavButtonProps) {
    const pathname = usePathname();


    const isActive = pathname === href;
    const width = fullWidth
        ? "w-full justify-center"
        : "";

    const padding = showLabel
        ? "px-5 py-2.5"
        : "p-2.5";

    const baseClasses = `
  inline-flex
  items-center
  gap-2
  rounded-xl
  font-medium
  shadow-sm
  transition
  ${padding}
  ${width}
`;

    const defaultClasses =
        "border hover:bg-gray-100";

    const primaryClasses =
        "bg-black text-white hover:bg-gray-800";


    // Current page
    if (isActive) {
        return (
            <span
                className={`
        ${baseClasses}
        bg-blue-600
        text-white
        cursor-default
        select-none
      `}
            >
                <Icon size={18} />

                {showLabel && children}
            </span>
        );
    }

    // Navigation link
    return (
        <LoadingLink
            href={href}
            className={`
      ${baseClasses}
      ${variant === "primary"
                    ? primaryClasses
                    : defaultClasses
                }
    `}
        >
            <Icon size={18} />

            {showLabel && children}
        </LoadingLink>
    );
}