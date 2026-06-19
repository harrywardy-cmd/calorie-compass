import Image from "next/image";

// Props required for displaying calorie goal progress
type ProgressCardProps = {
    totalCalories: number;
    calorieGoal: number;
    caloriePercentage: number;
    progressMessage: string;
    progressImage: string;
    progressBarClass: string;
};

// Displays the user's progress toward their daily calorie goal
export default function ProgressCard({
    totalCalories,
    calorieGoal,
    caloriePercentage,
    progressMessage,
    progressImage,
    progressBarClass,
}: ProgressCardProps) {
    return (
        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl p-8 mb-8 text-white shadow-lg">

            {/* Card heading */}
            <h2 className="font-bold text-2xl mb-6">
                🎯 Daily Goal Progress
            </h2>

            <div className="flex items-center gap-8">

                {/* Visual mascot that changes based on calorie progress */}
                <div className="flex-shrink-0">
                    <Image
                        src={progressImage}
                        alt="Progress Mascot"
                        width={140}
                        height={140}
                        className="rounded-xl"
                    />
                </div>

                {/* Progress information and progress bar */}
                <div className="flex-1">

                    {/* Progress message and calorie totals */}
                    <div className="flex justify-between mb-3">
                        <span className="font-medium">
                            {progressMessage}
                        </span>

                        <span className="text-blue-100 font-medium">
                            {totalCalories} / {calorieGoal} kcal
                        </span>
                    </div>

                    {/* Progress bar background */}
                    <div className="w-full bg-white/20 rounded-full h-6">

                        {/* Progress bar fill */}
                        {/* Width is capped at 100% to prevent overflow */}
                        <div
                            className={`${progressBarClass} h-6 rounded-full transition-all duration-700 ease-out`}
                            style={{
                                width: `${Math.min(caloriePercentage, 100)}%`,
                            }}
                        />
                    </div>

                    {/* Progress percentage summary */}
                    <p className="text-sm text-blue-100 mt-3">
                        {caloriePercentage > 100
                            ? `${caloriePercentage}% of goal (over target)`
                            : `${caloriePercentage}% of daily goal reached`}
                    </p>
                </div>
            </div>
        </div>
    );
}