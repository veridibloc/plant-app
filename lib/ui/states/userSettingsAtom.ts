import {atomWithStorage} from "jotai/utils"
import {atom} from "jotai";
import {withImmer} from "jotai-immer"
import {UserSettings} from "@/types/userSettings";

const InitialState: UserSettings  = { deviceId : ""}
export const userSettingsAtom = withImmer(atomWithStorage<UserSettings>('userSettings', InitialState, undefined, {getOnInit: true}));

export const userSettingsAtomWriter = atom(null, (_get, set, settings: Partial<UserSettings>) => {
    set(userSettingsAtom, (userSettings) => {
        return {
            ...userSettings,
            ...settings
        }
    });
});

export const userSettingsAtomResetter = atom(null, (_get, set) => {
    set(userSettingsAtom, (userSettings) => {
        return InitialState;
    });
});
