import {BaseButton, BaseButtonProps} from "@/ui/components/Buttons/BaseButton";

export interface IconButtonProps  extends BaseButtonProps {
    icon: React.ReactNode;
}

export const IconButton = ({label, icon, ...props}: IconButtonProps) => (
    <BaseButton label={
        <div className="flex flex-row items-center justify-start space-x-2">
            {icon}
            <div>{label}</div>
        </div>
    } {...props} />
);
