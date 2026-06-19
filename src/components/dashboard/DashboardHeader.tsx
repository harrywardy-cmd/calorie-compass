import DashboardHeaderDesktop from "./DashboardHeaderDesktop";
import DashboardHeaderMobile from "./DashboardHeaderMobile";

export default function DashboardHeader() {
  return (
    <>
      <div className="hidden md:block">
        <DashboardHeaderDesktop />
      </div>

      <div className="block md:hidden">
        <DashboardHeaderMobile />
      </div>
    </>
  );
}