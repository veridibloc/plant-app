import {ChildrenProps} from "@/types/childrenProps";

interface Props extends ChildrenProps {
    className?: string;
}

export const PageContainer = ({className, children}: Props) => {
    return <div className={`min-h-[85vh] pt-6 w-full ${className}`}>
        <div className="flex flex-col items-start justify-start mx-4 gap-4">
            {children}
        </div>
    </div>
}