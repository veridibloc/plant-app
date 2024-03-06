import { useTranslations } from "next-intl";
import {
    RiAccountBoxFill,
    RiSwapBoxFill,
    RiHistoryFill,
    RiSettings2Fill, RiDownload2Fill, RiDashboardLine,
} from "react-icons/ri";
import { NavigationLink } from "./components/NavigationLink";

export const BottomNavigation = () => {
  const t = useTranslations("bottom_navigation");

  return (
    <div className="bg-white fixed left-0 right-0 bottom-0 w-full h-20 max-w-[768px] mx-auto print:hidden grid grid-cols-4 gap-4 border-t-2 pt-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
      <NavigationLink
        href="/dashboard"
        Icon={RiDashboardLine}
        label={t("home")}
      />

      <NavigationLink
        href="/incoming"
        Icon={RiDownload2Fill}
        label={t("incoming")}
      />

      <NavigationLink
        href="/activity"
        Icon={RiHistoryFill}
        label={t("activity")}
      />

      <NavigationLink
        href="/settings"
        Icon={RiSettings2Fill}
        label={t("settings")}
      />
    </div>
  );
};
