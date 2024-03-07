import {ChildrenProps} from "@/types/childrenProps";

export const Avatar = ({ className = "", children }: {className?: string} & ChildrenProps) => {
    return <div className={`p-1 rounded-full ${className}`}>{children}</div>;
};
