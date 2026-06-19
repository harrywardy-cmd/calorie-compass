import Image from "next/image";

type ProgressCardProps = {
  totalCalories: number;
  calorieGoal: number;
  caloriePercentage: number;
  progressMessage: string;
  progressImage: string;
  progressBarClass: string;
};

// Mobile-only progress card
// Displays the user's daily calorie progress in a stacked layout
export default function ProgressCardMobile({
  totalCalories,
  calorieGoal,
  caloriePercentage,
  progressMessage,
  progressImage,
  progressBarClass,
}: ProgressCardProps) {
  return (
    // Main card container
    <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl p-8 mb-8 text-white shadow-lg">

      {/* Card title */}
      <h2 className="font-bold text-lg mb-4">
        Daily Goal Progress
      </h2>

      {/* Center all content vertically */}
      <div className="flex flex-col items-center text-center">

        {/* Progress mascot image */}
        <div className="w-[120px] h-[120px] flex items-center justify-center">
          <Image
            src={progressImage}
            alt="Progress Mascot"
            width={120}
            height={120}
            priority
            className="object-contain"
          />
        </div>

        {/* Current progress message */}
        <p className="font-semibold mt-4">
          {progressMessage}
        </p>

        {/* Current calories vs goal */}
        <p className="text-blue-100 font-medium">
          {totalCalories} / {calorieGoal} kcal
        </p>

        {/* Progress bar background */}
        <div className="w-full bg-gray-200 rounded-full h-5 mt-4">

          {/* Progress bar fill */}
          <div
            className={`${progressBarClass} h-5 rounded-full transition-all`}
            style={{
              width: `${Math.min(
                caloriePercentage,
                100
              )}%`,
            }}
          />
        </div>

        {/* Percentage complete */}
        <p className="text-sm text-blue-100 mt-3">
          {caloriePercentage}% Complete
        </p>
      </div>
    </div>
  );
}