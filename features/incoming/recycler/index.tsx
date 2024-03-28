"use client"

import {ScannableIdentifier} from "@/common/scannableIdentifiers";
import {useEnhancedRouter} from "@/ui/hooks/useEnhancedRouter";
import {QrCodeScanner} from "@/ui/components/QrCodeScanner";

export const RecyclerIncoming = () => {
    const {push} = useEnhancedRouter(); // enhanced router is causing issues... not sure why
    const handleOnScan = (text: string): boolean => {
        const id = ScannableIdentifier.parse(text);
        if (id.isLotIdentifier()) {
            setTimeout( () => {
                push(`/incoming/${id.stockContractId}/${id.lotId}`)
            }, 500)
            return true;
        }
        return false;
    };

    return <QrCodeScanner onScan={handleOnScan} />

}