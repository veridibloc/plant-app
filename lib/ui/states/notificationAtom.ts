import {atom} from "jotai"

export interface NotificationState {
    type: "error" | "success" | "info" | "warning",
    message: string;
}
export const notificationAtom = atom<NotificationState|null>(null);