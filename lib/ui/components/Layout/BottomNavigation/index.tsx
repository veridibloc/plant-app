import {useTranslations} from "next-intl";
import {
    RiSettings2Fill, RiDownload2Fill, RiDashboardLine, RiLayoutColumnLine, RiSwapLine, RiUpload2Fill,
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
        href: '/outgoing',
        icon: RiUpload2Fill,
        label: "outgoing"
    }
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
        href: '/outgoing',
        icon: RiUpload2Fill,
        label: "outgoing"
    }
]

export const BottomNavigation = () => {
    const t = useTranslations("navigation");
    const {role} = useUserAccount();
    const links = role === "separator" ? SeparatorLinks : ConverterLinks;
    return (
        <div
            className={`bg-white fixed left-0 right-0 bottom-0 w-full h-20 max-w-[768px] mx-auto print:hidden grid grid-cols-${links.length} gap-4 border-t-2 pt-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)]`}>
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
