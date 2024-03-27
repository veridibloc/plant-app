import useSWR from "swr";
import {isBrowser} from "framer-motion";

export const useCameraDevices = () => {
    const {
        data,
        isLoading,
        error
    } = useSWR("detectCameraDevices", async () => {
        if(isBrowser){
            const devices = await navigator.mediaDevices.enumerateDevices();
            return devices.filter(({kind}) => kind === "videoinput");
        }
        return []
    })

    return {
        devices: data ?? [],
        isLoading: isLoading,
        error
    }
}