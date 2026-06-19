import Image from "next/image";

type ProgressCardProps = {
    totalCalories: number;
    calorieGoal: number;
    caloriePercentage: number;
    progressMessage: string;
    progressImage: string;
    progressBarClass: string;
};

// Desktop-only progress card
// Displays mascot and progress bar side-by-side
export default function ProgressCardDesktop({
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
            <h2 className="font-bold text-xl mb-6">
                Daily Goal Progress
            </h2>

            {/* Desktop layout */}
            <div className="flex items-center gap-8">

                {/* Progress mascot */}
                <div className="w-[140px] h-[140px] flex items-center justify-center flex-shrink-0">
                    <Image
                        src={progressImage}
                        alt="Progress Mascot"
                        width={140}
                        height={140}
                        priority
                        className="object-contain"
                    />
                </div>

                {/* Progress content */}
                <div className="flex-1">

                    {/* Progress message and calorie count */}
                    <div className="flex justify-between mb-3">
                        <span className="font-medium">
                            {progressMessage}
                        </span>

                        <span className="text-blue-100 font-medium">
                            {totalCalories} / {calorieGoal} kcal
                        </span>
                    </div>

                    {/* Progress bar background */}
                    <div className="w-full bg-gray-200 rounded-full h-6">

                        {/* Progress bar fill */}
                        <div
                            className={`${progressBarClass} h-6 rounded-full transition-all`}
                            style={{
                                width: `${Math.min(
                                    caloriePercentage,
                                    100
                                )}%`,
                            }}
                        />
                    </div>

                    {/* Completion percentage */}
                    <p className="text-sm text-blue-100 mt-3">
                        {caloriePercentage}% of daily goal reached
                    </p>
                </div>
            </div>
        </div>
    );
}