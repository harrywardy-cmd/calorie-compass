import CalorieChartDesktop from "./CalorieChartDesktop";
import CalorieChartMobile from "./CalorieChartMobile";

// Props expected by the calorie chart component
type CalorieChartProps = {
  data: {
    day: string;
    calories: number;
  }[];
  calorieGoal: number;
};

// Responsive chart wrapper
// Renders different chart layouts for desktop and mobile
export default function CalorieChart(
  props: CalorieChartProps
) {
  return (
    <>
      {/* Desktop Layout */}
      <div className="hidden md:block">
        <CalorieChartDesktop {...props} />
      </div>

      {/* Mobile Layout */}
      <div className="block md:hidden">
        <CalorieChartMobile {...props} />
      </div>
    </>
  );
}