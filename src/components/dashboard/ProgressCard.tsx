import ProgressCardDesktop from "./ProgressCardDesktop";
import ProgressCardMobile from "./ProgressCardMobile";

type ProgressCardProps = {
  totalCalories: number;
  calorieGoal: number;
  caloriePercentage: number;
  progressMessage: string;
  progressImage: string;
  progressBarClass: string;
};

export default function ProgressCard(
  props: ProgressCardProps
) {
  return (
    <>
      {/* Desktop */}
      <div className="hidden md:block mb-8">
        <ProgressCardDesktop {...props} />
      </div>

      {/* Mobile */}
      <div className="block md:hidden mb-8">
        <ProgressCardMobile {...props} />
      </div>
    </>
  );
}