import type { IconType } from "react-icons";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface Props {
  label: string;
  href: string;
  Icon: IconType;
}

export const NavigationLink = ({ label, href, Icon }: Props) => {
  const pathname = usePathname();
  const formattedPathName = pathname.slice(3);
  const isLinkActive = formattedPathName === href;

  const iconColor = isLinkActive ? "#166534" : "#737373";
  const textColor = isLinkActive ? "text-green-800" : "text-neutral-500";

  return (
    <Link href={href}>
      <div className="flex flex-col items-center justify-center">
        <Icon size={28} color={iconColor} />
        <span className={`text-sm font-medium ${textColor} text`}>{label}</span>
      </div>
    </Link>
  );
};
