import {RiCamera2Fill} from "react-icons/ri";
// @ts-ignore
import ColorHash from "color-hash";

interface Props {
    label: string;
    deviceId: string;
    onClick: (deviceId: string) => void;
    isActive: boolean;
}

const colorHash = new ColorHash()
export const DeviceCard = ({label, deviceId, onClick, isActive}: Props) => {
    const bgColor = colorHash.hex(deviceId);
    const activeStyle = isActive ? "border-blue-400 border-4 bg-blue-200 hover:bg-blue-300" : "hover:bg-gray-200 bg-white"
    return (
        <div className={`flex flex-row border shadow-sm rounded-xl p-4 justify-start items-center space-x-2 hover:bg-gray-200 ${activeStyle}`} onClick={onClick.bind(null, deviceId)}>
            <span
                className="w-10 h-10 rounded-full flex justify-center items-center"
                style={{backgroundColor: bgColor}}
            >
              <RiCamera2Fill size={28} color="#eee"/>
            </span>
            <div className="truncate">
                <h3 className="text-lg font-bold text-gray-700 mb-0.5 truncate">{label}</h3>
                <small className="font-small text-gray-500 text-justify">
                    {deviceId}
                </small>
            </div>
        </div>
    )
}