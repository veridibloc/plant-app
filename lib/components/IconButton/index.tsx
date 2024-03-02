import type { IconType } from "react-icons";

interface Props {
  onClick: () => void;
  Icon: IconType;
  iconSize?: number;
}

export const IconButton = ({ onClick, Icon, iconSize = 36 }: Props) => (
  <button
    onClick={onClick}
    type="button"
    className="p-1 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all"
  >
    <Icon size={iconSize} />
  </button>
);
