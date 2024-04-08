import {useTranslations} from "next-intl";
import {
    RiSettings2Fill, RiDownload2Fill, RiDashboardLine, RiLayoutColumnLine, RiSwapLine, RiUpload2Fill,
} from "react-icons/ri";
import {NavigationLink} from "./components/NavigationLink";
import {useUserAccount} from "@/ui/hooks/useUserAccount";
import {UserAccount} from "@/types/userAccount";

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
        href: '/separation',
        icon: RiLayoutColumnLine,
        label: "separation"
    },
    {
        href: '/outgoing/s',
        icon: RiUpload2Fill,
        label: "outgoing"
    }
]

const IntermediateSeparatorLinks = [
    {
        href: '/dashboard',
        icon: RiDashboardLine,
        label: "home"
    },
    {
        href: '/separation',
        icon: RiLayoutColumnLine,
        label: "separation"
    },
    {
        href: '/outgoing/s',
        icon: RiUpload2Fill,
        label: "outgoing"
    }
]


const RecyclerLinks = [
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
        href: '/outgoing/r',
        icon: RiUpload2Fill,
        label: "outgoing"
    }
]

function getLinks({role, isIntermediate}: UserAccount) {
    if(role === "separator" ){
        return isIntermediate ? IntermediateSeparatorLinks : SeparatorLinks;
    }
    return RecyclerLinks
}

export const BottomNavigation = () => {
    const t = useTranslations("navigation");
    const userAccount = useUserAccount();
    const links = getLinks(userAccount);
    return (
        <div
            className="bg-white fixed left-0 right-0 bottom-0 w-full h-20 max-w-[768px] mx-auto print:hidden grid gap-4 border-t-2 pt-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
            style={{
                gridTemplateColumns: `repeat(${links.length}, minmax(0, 1fr))`
            }}
        >
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
