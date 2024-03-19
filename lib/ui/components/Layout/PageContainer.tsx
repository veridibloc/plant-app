import {ChildrenProps} from "@/types/childrenProps";

interface Props extends ChildrenProps {
    className?: string;
}

export const PageContainer = ({className, children}: Props) => {
    return <div className={`pt-6 w-full overflow-y-auto ${className}`}
                style={{
                    height: "calc(100vh - 88px)",
                    minHeight: "calc(100vh - 88px)"
                }}
    >
        <div className="flex flex-col items-start justify-start mx-2 gap-4">
            {children}
        </div>
    </div>
}