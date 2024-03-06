import type { IconType } from "react-icons";
import Link from "next/link";

interface Props {
  title: string;
  description: string;
  ctaLabel: string;
  href: string;
  ctaLabelColor: string;
  Icon: IconType;
  backgroundIconColor: string;
}

export const LinkCard = ({
  title,
  description,
  ctaLabel,
  href,
  ctaLabelColor,
  Icon,
  backgroundIconColor,
}: Props) => {
  return (
    <Link href={href} className="w-full max-w-sm mx-auto">
      <div className="flex flex-col bg-white border shadow-sm rounded-xl p-8 justify-center items-center">
        <span
          className={`w-10 h-10 rounded-full ${backgroundIconColor} flex justify-center items-center`}
        >
          <Icon size={28} color="white" />
        </span>

        <h3 className="text-lg font-bold text-gray-800">{title}</h3>

        <p className="font-medium text-gray-500 text-justify mb-4">
          {description}
        </p>

        <p className={`font-bold ${ctaLabelColor} text-justify`}>
          {ctaLabel + " >"}
        </p>
      </div>
    </Link>
  );
};
