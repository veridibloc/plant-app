import type { IconType } from "react-icons";
import {ChildrenProps} from "@/types/childrenProps";

interface Props extends ChildrenProps {
  onClick: () => void;
  Icon: IconType;
  iconSize?: number;
  className?: string;
}

export const FatIconButton = ({ onClick, Icon, iconSize = 48, className, children }: Props) => (
  <button
    onClick={onClick}
    type="button"
    className={`p-12 flex flex-col justify-center items-center gap-2 rounded-md border font-medium bg-white shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all ${className}`}
  >
    <Icon size={iconSize} />
    <span className="pr-2">{children}</span>
  </button>
);
