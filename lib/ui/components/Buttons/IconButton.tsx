import {BaseButton, BaseButtonProps} from "@/ui/components/Buttons/BaseButton";

export interface IconButtonProps  extends BaseButtonProps {
    icon: React.ReactNode;
    labelClassName?: string
}

export const IconButton = ({label, icon, labelClassName, ...props}: IconButtonProps) => (
    <BaseButton label={
        <div className={`flex flex-row items-center justify-start space-x-2 ${labelClassName}`}>
            {icon}
            <div>{label}</div>
        </div>
    } {...props} />
);
