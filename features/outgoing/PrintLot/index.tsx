"use client";

import QRCode from "react-qr-code";
import {ScannableIdentifier} from "@/common/scannableIdentifiers";
import {MaterialCard} from "@/ui/components/Materials";
import {useSingleStockContract} from "@/ui/hooks/useSingleStockContract";
import {useUserAccount} from "@/ui/hooks/useUserAccount";
import {useTranslations} from "next-intl";

interface Props {
    lotId: string;
    stockContractId: string;
}

export function PrintLot({lotId, stockContractId}: Props): JSX.Element {
    const {stockContracts} = useUserAccount();
    const {contract, isLoading} = useSingleStockContract(stockContractId)
    const tm = useTranslations("materials");

    const identifier = new ScannableIdentifier({
        type: "vb",
        parts: [stockContractId,lotId]
    }).toString()

    const materialLabel = (stockContracts.find( lstc => lstc.id === stockContractId)?.label ?? "").toLowerCase();

    //  check if not existant

    return (
        <section className="mt-2 flex flex-col justify-between items-center w-full">
            <section className="w-full">
                <MaterialCard label={tm(`${materialLabel}.label`)} description={tm(`${materialLabel}.description`)}
                              id={stockContractId} />
            </section>
            <div className="p-1 text-center">
                <div>
                    <QRCode
                        size={256}
                        style={{
                            maxWidth: "100%",
                            width: "100%",
                            padding: "0.5rem",
                        }}
                        value={identifier}
                        viewBox={`0 0 256 256`}
                    />
                </div>
                <div className="text-sm">ID: {identifier}</div>
            </div>
        </section>
    )
}