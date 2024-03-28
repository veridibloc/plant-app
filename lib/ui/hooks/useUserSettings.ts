import {useAtom, useSetAtom} from "jotai";
import {userSettingsAtom, userSettingsAtomWriter} from "@/ui/states/userSettingsAtom";

export function useUserSettings() {
    const [userSettings ] = useAtom(userSettingsAtom);
    const updateUserSettings = useSetAtom(userSettingsAtomWriter);
    return {
        userSettings,
        updateUserSettings,
    }
}
