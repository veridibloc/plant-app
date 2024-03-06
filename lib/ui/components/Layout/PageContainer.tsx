import {ChildrenProps} from "@/types/childrenProps";

interface Props extends ChildrenProps {
    className?: string;
}

export const PageContainer = ({className, children}: Props) => {
    return <div className={`flex flex-col items-start justify-start min-h-[85vh] pt-6 w-full gap-4 ${className}`}>
        {children}
    </div>
}