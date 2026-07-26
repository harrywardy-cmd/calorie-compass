import Image from "next/image";
import { getMascotImage } from "@/utils/mascot";

interface DashboardMascotProps {
  progress?: number;
  size?: "sm" | "md" | "lg";
}

export default function DashboardMascot({
  progress,
  size = "lg",
}: DashboardMascotProps) {
  const mascotImage =
    progress === undefined ? "/progress/seed.png" : getMascotImage(progress);

  const containerSizes = {
    sm: "h-20 w-20",
    md: "h-28 w-28",
    lg: "h-36 w-36",
  };

  const imageSizes = {
    sm: 60,
    md: 85,
    lg: 110,
  };

  return (
    <div
      className={`
        flex
        shrink-0
        items-center
        justify-center
        rounded-full
        border-4
        border-white/30
        bg-white
        shadow-2xl
        ${containerSizes[size]}
      `}
    >
      <Image
        src={mascotImage}
        alt="Calorie Compass Mascot"
        width={imageSizes[size]}
        height={imageSizes[size]}
        className="rounded-full object-cover"
      />
    </div>
  );
}
