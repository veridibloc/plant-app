import {ScannableIdentifier} from "@/common/scannableIdentifiers";
import QRCode from "react-qr-code";
import {RiTruckLine} from "react-icons/ri";

interface Props {
    contractId: string;
    lotId: string;
    sold: boolean
    onClick: (lotId: string) => void
}

export function LotCardProxy({lotId, sold, contractId, onClick}: Props) {
    const identifier = new ScannableIdentifier({type: "vb", parts: [contractId, lotId]}).toString();
    return <div
        className="flex flex-row border shadow-sm w-full rounded-xl justify-start items-center space-x-2 bg-white hover:bg-gray-200 cursor-pointer"
        onClick={() => onClick(lotId)}>
        <div className="flex flex-row space-x-2 pl-2 items-center justify-start">
            <QRCode
                style={{
                    height: "80px",
                    maxWidth: "80px",
                    padding: "0.5rem",
                    margin: "0 auto"
                }}
                value={identifier}
                viewBox={`0 0 80 80`}
            />
            <div className="flex flex-row space-x-2 items-center justify-start">
                <small className="font-small text-gray-500 text-justify">
                    {lotId}
                </small>
                {sold &&
                    <small className="font-small text-gray-500 text-justify">
                        <RiTruckLine size={24}/>
                    </small>
                }
            </div>
        </div>
    </div>
}