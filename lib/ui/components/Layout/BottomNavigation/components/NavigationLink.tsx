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
  const matcher = new RegExp(`${href}(\/.*)?`);
  const isLinkActive = matcher.test(pathname);

  const iconColor = isLinkActive ? "#3b82f0" : "#737373";
  const border = isLinkActive ? "border-b-4 border-b-blue-500" : "";
  const textColor = isLinkActive ? "text-blue-500" : "text-neutral-500";

  return (
    <Link href={href} className={border} >
      <div className="flex flex-col items-center justify-center">
        <Icon size={28} color={iconColor} />
        <span className={`text-sm font-medium ${textColor} text`}>{label}</span>
      </div>
    </Link>
  );
};
