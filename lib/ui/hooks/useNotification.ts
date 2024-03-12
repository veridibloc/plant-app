import {useAtom} from "jotai";
import {notificationAtom} from "@/ui/states/notificationAtom";

export const useNotification = () => {
    const [, setNotification] = useAtom(notificationAtom);
    function showError(message: string) {
        setNotification({
            message,
            type: 'error'
        })
    }
    function showWarning(message: string) {
        setNotification({
            message,
            type: 'warning'
        })
    }
    function showSuccess(message: string) {
        setNotification({
            message,
            type: 'success'
        })
    }

    function showInfo(message: string) {
        setNotification({
            message,
            type: 'info'
        })
    }

    return {
        showError,
        showWarning,
        showInfo,
        showSuccess
    }
}