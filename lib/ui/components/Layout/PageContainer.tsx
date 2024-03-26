import {ChildrenProps} from "@/types/childrenProps";
import {BackButton} from "./BackButton";

interface Props extends ChildrenProps {
    hasBackButton?: boolean;
    className?: string;
}

export const PageContainer = ({hasBackButton = true, className, children}: Props) => {
    return <div className={`relative pt-6 w-full overflow-y-auto ${className}`}
                style={{
                    height: "calc(100vh - 88px)",
                    minHeight: "calc(100vh - 88px)",
                }}
    >
        {hasBackButton && <BackButton/>}
        <div className="flex flex-col items-start justify-start mx-2 gap-4">
            {children}
        </div>
    </div>
}