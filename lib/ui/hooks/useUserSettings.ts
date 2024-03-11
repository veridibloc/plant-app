import {useCallback, useEffect, useState} from "react";
import {UserSettings} from "@/types/userSettings";
import {useAuth} from "@clerk/nextjs";

const BaseStorageKey = "veridibloc-plant-app"
const isClient = typeof window !== "undefined";

const DefaultSettings: UserSettings = {
    deviceId: ""
}

function saveUserSettings(userId: string, userSettings: UserSettings) {
    if (isClient && userId) {
        const userStorageKey = `${BaseStorageKey}:${userId}`
        localStorage.setItem(userStorageKey, JSON.stringify(userSettings))
    }
}

function loadUserSettings(userId: string) {
    if (isClient && userId) {
        const userStorageKey = `${BaseStorageKey}:${userId}`
        let result = localStorage.getItem(userStorageKey)
        if (!result) {
            result = JSON.stringify(DefaultSettings)
            localStorage.setItem(userStorageKey, JSON.stringify(DefaultSettings))
        }
        try {
            return JSON.parse(result)
        } catch (e) {
            // fix invalid data
            localStorage.setItem(userStorageKey, JSON.stringify(DefaultSettings))
        }
    }
    return DefaultSettings
}


export function useUserSettings() {
    const {userId} = useAuth();
    const [userSettings, _setUserSettings] = useState<UserSettings>(DefaultSettings);

    useEffect(() => {

        if (userId) {
            _setUserSettings(loadUserSettings(userId))
        }

    }, [userId]);

    const updateUserSettings = useCallback((partialSettings: Partial<UserSettings>) => {
        if (userId) {
            _setUserSettings((prevState) => {
                const newState = {...prevState, ...partialSettings}
                saveUserSettings(userId, newState);
                return newState
            })
        }
    }, [userId])


    return {
        userSettings,
        updateUserSettings,
    }
}
