"use client";

import {useTranslations} from "next-intl";

import {useEnhancedRouter} from "@/ui/hooks/useEnhancedRouter";
import {QrCodeScanner} from "@/ui/components/QrCodeScanner";
import {useCallback, useState} from "react";
import {ScannableIdentifier} from "@/common/scannableIdentifiers";
import {contractsProvider} from "@/common/contractsProvider";
import {useNotification} from "@/ui/hooks/useNotification";
import {LotReceiptData, StockContract} from "@veridibloc/smart-contracts";
import {AsyncQueue} from "@/common/asyncQueue";
import {IconButton} from "@/ui/components/Buttons/IconButton";
import {RiArchive2Line, RiCloseLine} from "react-icons/ri";
import {LabeledTextItem} from "@/ui/components/LabeledTextItem";
import {MaterialTitle} from "@/features/outgoing/recycler/MaterialTitle";
import {getMaterialSlugFromContractDescriptor} from "@/common/getMaterialSlugFromContractDescriptor";

interface LotMaterial {
    id: string;
    slug: string
}

const queue = new AsyncQueue();

interface Props {
    stockContractId: string
}
export function LotScanner({stockContractId}: Props) {
    const t = useTranslations("outgoing.scan_lot");
    const {showError, showWarning} = useNotification()
    const router = useEnhancedRouter();
    const [material, setMaterial] = useState<LotMaterial|null>(null)
    const [lotReceipt, setLotReceipt] = useState<LotReceiptData|null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const fetchLotReceipt = useCallback(async (identifier: ScannableIdentifier) => {
        console.debug("Fetching Lot Receipts for ", identifier.toString())
        setIsProcessing(true);
        const [stockContract, senderContract] = await Promise.all([
            contractsProvider.getStockContract(stockContractId),
            contractsProvider.getStockContract(identifier.stockContractId)]);

        const [incomingLotId, lotReceipt] = await Promise.all([
            stockContract.getKeyMapValue(StockContract.Maps.KeyIncomingMaterial.toString(), identifier.lotId),
            senderContract.getSingleLotReceipt(identifier.lotId)]
        );

        let errorMessage = "";
        // checks if sender really sent that lot to someone - i.e. globally exists
        if (!lotReceipt) {
            console.warn("Lot Receipt not found", identifier.toString())
            errorMessage = "invalid_lot_receipt.not_exists"
        }

        // checks if recycler registered the lot for this contract/material
        if(!incomingLotId || incomingLotId.value === "0"){
            console.warn("Lot Receipt not registered for this contract", identifier.toString())
            errorMessage = "invalid_lot_receipt.not_in_contract"
        }

        if(errorMessage){
            showError(t(errorMessage))
            setIsProcessing(false);
            return;
        }

        setLotReceipt(lotReceipt!)
        setMaterial( (material) => {
            if(!material){
                const slug = getMaterialSlugFromContractDescriptor(senderContract.contract.description)
                if(!slug) return null;

                return {
                    slug,
                    id: senderContract.contractId
                }
            }
            return material;
        })

        setIsProcessing(false);

    }, [showError, showWarning, stockContractId, t]);

    const handleOnResult =  (code: string) => {
        try {
            const identifier = ScannableIdentifier.parse(code);
            if (identifier.isAccountIdentifier()) return false;
            queue.enqueue(() => fetchLotReceipt(identifier), code);
            return true;
        } catch (e) {
            console.error(e);
        }
        return false
    }

    const handleCreateLot = () => {
        router.push(`/outgoing/c/${stockContractId}/lot?lotId=${lotReceipt?.lotId}&materialId=${material?.id}`);
    }

    const handleReset = () => {
        setMaterial(null);
        setLotReceipt(null);
    }

    return (<>
        <div className="w-11/12 mx-auto flex flex-col border border-gray-200 rounded-lg p-4">
            {material && (<MaterialTitle materialSlug={material.slug} />)}
            {!material && (
                <div className="flex flex-row space-x-2 items-center truncate justify-start">
                    <div className="truncate flex-shrink">
                        <h3 className="text-lg font-bold text-gray-400 animate-pulse mb-0.5 truncate">{t("waiting")}</h3>
                    </div>
                </div>
            )}
            <div className="flex flex-row w-full justify-between">
                <LabeledTextItem label={t("weight")}
                                 text={`${lotReceipt?.confirmedQuantity.toString() ?? "??"} kg`}/>
            </div>
            <div className="flex flex-row items-center justify-end mt-2 gap-x-2">
                <IconButton
                    onClick={handleReset}
                    icon={<RiCloseLine size={24}/>}
                    label={t("reset")}
                    disabled={!lotReceipt || !material}
                    labelClassName="text-gray-500"
                    className="bg-transparent text-gray-500 text-sm font-semibold rounded-lg border border-transparent hover:!bg-gray-100 hover:text-gray-800 focus:!ring-0 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-500 dark:hover:!bg-gray-100/30 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:!ring-0"
                />
                <IconButton
                    onClick={handleCreateLot}
                    icon={<RiArchive2Line size={24}/>}
                    label={t("create")}
                    loading={isProcessing}
                    disabled={!lotReceipt || !material}
                />
            </div>
        </div>
        <QrCodeScanner onScan={handleOnResult} keepScanning={true}/>
    </>)
}
