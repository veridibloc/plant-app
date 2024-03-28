"use client";

import {Header} from "@/ui/components/Layout/Header";
import {useUserAccount} from "@/ui/hooks/useUserAccount";
import {useTranslations} from "next-intl";

import {useStockContracts} from "@/ui/hooks/useStockContracts";
import {useEnhancedRouter} from "@/ui/hooks/useEnhancedRouter";
import {QrCodeScanner} from "@/ui/components/QrCodeScanner";
import {useEffect, useState} from "react";
import {ScannableIdentifier} from "@/common/scannableIdentifiers";
import {contractsProvider} from "@/common/contractsProvider";
import {useNotification} from "@/ui/hooks/useNotification";
import {LotReceiptData} from "@veridibloc/smart-contracts";

export function RecyclerOutgoing() {
    const t = useTranslations("outgoing");
    const {showError} = useNotification()
    const {stockContracts, role} = useUserAccount();
    const {contracts, isLoading} = useStockContracts();
    const router = useEnhancedRouter();
    const [lotReceipts, setLotReceipts] = useState<LotReceiptData[]>([]);
    const [isProcessing, setIsProcessing] = useState<>(false);

    const handleOnResult = async (data: string) => {
        try {
            setIsProcessing(true)
            const identifier = ScannableIdentifier.parse(data);

            if (identifier.isAccountIdentifier()) return false;

            const lotReceipt = await contractsProvider.getLotReceiptData(identifier.stockContractId, identifier.lotId)

            if (!lotReceipt) {
                // TODO: translate
                showError("This lot was not delivered")
                return false;
            }
            console.log("lotData", lotReceipt);
            setLotReceipts((receipts) => {
                if (receipts.find( ({lotId}) => lotId === lotReceipt.lotId)) return receipts;
                return [...receipts, lotReceipt]
            });
            return true;
        } catch (e) {
            console.error(e);
        } finally {
            setIsProcessing(false);
        }
        return false
    }

    console.log("lot ids", lotReceipts);

    useEffect(() => {

        async function fetchLotInfo(identifier: string) {

            ScannableIdentifier.parse(identifier)
            contractsProvider.load(lotId);
        }

    }, [lotReceipts]);

    return (<>
        <Header title={t("select_by_lot.title")} description={t("select_by_lot.description")}/>
        <QrCodeScanner onScan={handleOnResult} keepScanning={true}/>
    </>)
}
