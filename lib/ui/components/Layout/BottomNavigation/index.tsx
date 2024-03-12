import {useTranslations} from "next-intl";
import {
    RiAccountBoxFill,
    RiSwapBoxFill,
    RiHistoryFill,
    RiSettings2Fill, RiDownload2Fill, RiDashboardLine, RiLayoutColumnLine, RiSwapLine,
} from "react-icons/ri";
import {NavigationLink} from "./components/NavigationLink";
import {useUserAccount} from "@/ui/hooks/useUserAccount";

const SeparatorLinks = [
    {
        href: '/dashboard',
        icon: RiDashboardLine,
        label: "home"
    },
    {
        href: '/incoming',
        icon: RiDownload2Fill,
        label: "incoming"
    },
    {
        href: '/process',
        icon: RiLayoutColumnLine,
        label: "separation"
    },
    {
        href: '/settings',
        icon: RiSettings2Fill,
        label: "settings"
    },
]

const ConverterLinks = [
    {
        href: '/dashboard',
        icon: RiDashboardLine,
        label: "home"
    },
    {
        href: '/incoming',
        icon: RiDownload2Fill,
        label: "incoming"
    },
    {
        href: '/process',
        icon: RiSwapLine,
        label: "conversion"
    },
    {
        href: '/settings',
        icon: RiSettings2Fill,
        label: "settings"
    },
]

export const BottomNavigation = () => {
    const t = useTranslations("bottom_navigation");
    const {role} = useUserAccount();
    const links = role === "separator" ? SeparatorLinks : ConverterLinks;
    return (
        <div
            className="bg-white fixed left-0 right-0 bottom-0 w-full h-20 max-w-[768px] mx-auto print:hidden grid grid-cols-4 gap-4 border-t-2 pt-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
            {links.map(({icon, label, href}) =>
                <NavigationLink
                    key={`navigation-link-${href}`}
                    href={href}
                    Icon={icon}
                    label={t(label)}
                />
            )}
        </div>
    );
};
