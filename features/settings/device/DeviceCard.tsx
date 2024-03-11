import {RiCamera2Fill} from "react-icons/ri";
// @ts-ignore
import ColorHash from "color-hash";

interface Props {
    label: string;
    deviceId: string;
    onClick: (deviceId: string) => void;
}

const colorHash = new ColorHash()
export const DeviceCard = ({label, deviceId, onClick}: Props) => {
    const bgColor = colorHash.hex(deviceId);
    return (
        <div className="flex flex-row bg-white border shadow-sm rounded-xl p-4 justify-start items-center space-x-4 hover:bg-gray-200" onClick={onClick.bind(null, deviceId)}>
            <span
                className="w-10 h-10 rounded-full flex justify-center items-center"
                style={{backgroundColor: bgColor}}
            >
              <RiCamera2Fill size={28} color="#ddd"/>
            </span>
            <div className="truncate">
                <h3 className="text-lg font-bold text-gray-800 mb-0.5 truncate">{label}</h3>
                <small className="font-small text-gray-400 text-justify">
                    {deviceId}
                </small>
            </div>
        </div>
    )
}