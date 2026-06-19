import StatsCardsDesktop from "./StatsCardsDesktop";
import StatsCardsMobile from "./StatsCardsMobile";

type StatsCardsProps = {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

export default function StatsCards(
  props: StatsCardsProps
) {
  return (
    <>
      {/* Desktop Layout */}
      <div className="hidden md:block">
        <StatsCardsDesktop {...props} />
      </div>

      {/* Mobile Layout */}
      <div className="block md:hidden">
        <StatsCardsMobile {...props} />
      </div>
    </>
  );
}