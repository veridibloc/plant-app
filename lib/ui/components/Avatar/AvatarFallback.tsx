import {ChildrenProps} from "@/types/childrenProps";
export const AvatarFallback = ({ className = "", children } : {className?: string} & ChildrenProps) => {
    return <div className={`flex items-center justify-center ${className} p-2`}>{children}</div>;
};