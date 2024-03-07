import {BaseButton, BaseButtonProps} from "./BaseButton"
import { useFormStatus } from 'react-dom'

export const FormSubmitButton = (props: Omit<BaseButtonProps, "type">) => {
    const {pending} = useFormStatus()
    return (
        <BaseButton type="submit" loading={pending} {...props} />
    );
}
