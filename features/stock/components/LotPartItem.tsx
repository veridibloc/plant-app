import {useAppContext} from "@/ui/hooks/useAppContext";
import Link from "next/link";
import {RiFingerprintLine} from "react-icons/ri";

interface Props {
    txId: string
    quantity: number;
}

export function LotPartItem({quantity, txId}: Props) {
    const {Ledger: {ExplorerUrl}} = useAppContext()

    return <div
        className={`flex flex-row border shadow-sm w-full rounded-xl p-4 justify-start items-center space-x-2 bg-white hover:bg-gray-200 cursor-pointer`}>
        <Link href={`${ExplorerUrl}/tx/${txId}`} rel='noopener noreferrer' target="_blank" className="w-full">
            <div className="flex flex-row space-x-2 items-center truncate justify-start">
                <span className="rounded-full flex-grow flex justify-center items-center text-md font-bold text-gray-400">
                    <RiFingerprintLine size={32}/>
                </span>
                <div className="flex flex-row space-x-2 items-center justify-between w-full">
                    <small className="font-small text-gray-500 text-justify">{txId}</small>
                    <small className="font-medium text-gray-500 text-justify">{quantity} kg</small>
                </div>
            </div>
        </Link>
    </div>
}
