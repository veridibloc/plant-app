import {ChildrenProps} from "@/types/childrenProps";

interface Props extends ChildrenProps {
    size?: number,
    className?: string
}
export const Avatar = ({ size = 80, className = "", children }: Props) => {
    return <div className={`p-1 w-[${size}px] ${className}`}>{children}</div>;
};
