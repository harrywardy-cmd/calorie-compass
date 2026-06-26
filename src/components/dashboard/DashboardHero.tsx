import Image from "next/image";
import { Target } from "lucide-react";

type DashboardHeroProps = {
  calories: number;
  calorieGoal: number;
  progress: number;
  progressImage: string;
};

function getProgressMessage(progress: number) {
  if (progress >= 100) {
    return {
      title: "Goal Achieved! 🎉",
      subtitle: "Fantastic work! Keep building healthy habits.",
    };
  }

  if (progress >= 75) {
    return {
      title: "Almost There! 🔥",
      subtitle: "You're close to reaching today's goal.",
    };
  }

  if (progress >= 50) {
    return {
      title: "Great Progress! 💪",
      subtitle: "You're doing amazing today.",
    };
  }

  if (progress >= 25) {
    return {
      title: "Good Start! 🌱",
      subtitle: "Keep logging meals throughout the day.",
    };
  }

  return {
    title: "Let's Get Started! 🚀",
    subtitle: "Log your first meal to begin today's journey.",
  };
}

// Motivational quotes displayed on the dashboard
const quotes = [
  "Small choices, big changes.",
  "Progress over perfection.",
  "Every healthy meal counts.",
  "Consistency beats intensity.",
  "Fuel your body, fuel your future.",
  "Healthy habits are built one meal at a time.",
  "One meal at a time, one goal at a time.",
  "Today's effort becomes tomorrow's results.",
];

export default function DashboardHero({
  calories,
  calorieGoal,
  progress,
  progressImage,
}: DashboardHeroProps) {
  const message = getProgressMessage(progress);

  return (
    <section
      className="
        relative
        mb-8
        overflow-hidden
        rounded-3xl
        bg-gradient-to-r
        from-blue-700
        via-blue-600
        to-cyan-500
        p-8
        text-white
        shadow-xl
      "
    >
      {/* Background Glow */}
      <div
        className="
          pointer-events-none
          absolute
          -left-24
          -top-24
          h-80
          w-80
          rounded-full
          bg-white/10
          blur-3xl
        "
      />

      {/* Decorative Target */}
      <div
        className="
          pointer-events-none
          absolute
          -right-8
          top-1/2
          -translate-y-1/2
          opacity-10
        "
      >
        <Target className="h-64 w-64 text-white" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center">
        {/* Mascot */}
        <div
          className="
            flex
            h-36
            w-36
            shrink-0
            items-center
            justify-center
            rounded-full
            border-4
            border-white/30
            bg-white
            shadow-2xl
          "
        >
          <Image
            src={progressImage}
            alt="Mascot"
            width={110}
            height={110}
            className="rounded-full object-cover"
          />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Badge */}
          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-white/20
              bg-white/15
              px-4
              py-2
              text-sm
              font-medium
              backdrop-blur
            "
          >
            <Target size={16} />
            Today's Goal
          </div>

          {/* Heading */}
          <h2 className="mt-5 text-4xl font-bold lg:text-5xl">
            {message.title}
          </h2>

          {/* Subtitle */}
          <p className="mt-3 max-w-xl text-blue-100">{message.subtitle}</p>

          {/* Progress */}
          <div className="mt-8">
            <div
              className="
                h-5
                overflow-hidden
                rounded-full
                bg-white/20
                shadow-inner
              "
            >
              <div
                className="
                  h-full
                  rounded-full
                  bg-gradient-to-r
                  from-cyan-300
                  to-white
                  shadow-md
                  transition-all
                  duration-1000
                "
                style={{
                  width: `${Math.min(progress, 100)}%`,
                }}
              />
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-blue-100">
                {progress}% of daily goal reached
              </span>

              <div
                className="
                  rounded-full
                  bg-white/15
                  px-4
                  py-2
                  text-sm
                  font-semibold
                  backdrop-blur
                "
              >
                {progress}% Complete
              </div>
            </div>
          </div>
        </div>

        {/* Calories */}
        <div className="flex flex-col items-center lg:items-end">
          <p className="text-sm uppercase tracking-widest text-blue-100">
            Today's Intake
          </p>

          <p className="mt-2 text-7xl font-black leading-none">{calories}</p>

          <p className="mt-2 text-lg text-blue-100">/ {calorieGoal} kcal</p>
        </div>
      </div>
    </section>
  );
}
