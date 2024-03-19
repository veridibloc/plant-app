import type { ReactNode } from "react";
import {RiCloseCircleLine} from "react-icons/ri";
import Popup from "reactjs-popup";
import {IconButton} from "@/ui/components/Buttons/IconButton";

interface Props {
  title: string;
  children: ReactNode;
  open: boolean;
  onClose: () => void;
}

export const Modal = ({ title, children, open, onClose }: Props) => (
  <Popup
    modal
    open={open}
    onClose={onClose}
    overlayStyle={{ background: "rgba(0,0,0,0.8)" }}
  >
    <div className="min-w-full flex flex-col bg-white border shadow-sm rounded-xl">
      <div className="flex justify-between items-center py-3 px-4 border-b gap-4">
        <h6 className="font-bold text-neutral-700">{title}</h6>
        <IconButton
            onClick={onClose}
            icon={<RiCloseCircleLine size={26}/>}
            label={""}
        />
      </div>
      {children}
    </div>
  </Popup>
);
