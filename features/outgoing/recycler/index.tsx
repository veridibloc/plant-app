"use client";

import {Header} from "@/ui/components/Layout/Header";
import {useUserAccount} from "@/ui/hooks/useUserAccount";
import {useTranslations} from "next-intl";

import {useStockContracts} from "@/ui/hooks/useStockContracts";
import {useEnhancedRouter} from "@/ui/hooks/useEnhancedRouter";
import {QrCodeScanner} from "@/ui/components/QrCodeScanner";
import {useCallback, useEffect, useState} from "react";
import {ScannableIdentifier} from "@/common/scannableIdentifiers";
import {contractsProvider} from "@/common/contractsProvider";
import {useNotification} from "@/ui/hooks/useNotification";
import {LotReceiptData} from "@veridibloc/smart-contracts";
import {AsyncQueue} from "@/common/asyncQueue";
import {SimpleCard} from "@/ui/components/Cards/SimpleCard";
import {IconButton} from "@/ui/components/Buttons/IconButton";
import {RiArchive2Line, RiCameraSwitchLine, RiCloseLine, RiTruckLine} from "react-icons/ri";
import {LabeledTextItem} from "@/ui/components/LabeledTextItem";
import {MaterialTitle} from "@/features/outgoing/recycler/MaterialTitle";
import {DescriptorData} from "@signumjs/standards";

function getMaterialSlugFromContract(contractDescriptor: string){
    try {
        const data = DescriptorData.parse(contractDescriptor);
        return (data.getCustomField("x-mat") as string).toLowerCase();
    }
    catch (e){
        return "";
    }
}

interface LotMaterial {
    id: string;
    slug: string
}

const queue = new AsyncQueue();

// TODO: this component should be a material selector.... the scanning comes in a 2nd step

export function RecyclerOutgoing() {
    const t = useTranslations("outgoing.select_by_lot");
    const {showError, showWarning} = useNotification()
    const router = useEnhancedRouter();
    const [material, setMaterial] = useState<LotMaterial|null>(null)
    const [lotReceipts, setLotReceipts] = useState<LotReceiptData[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);

    const fetchLotReceipts = useCallback(async (identifier: ScannableIdentifier) => {
        console.debug("Fetching Lot Receipts for ", identifier.toString())
        setIsProcessing(true);
        const stockContract = await contractsProvider.getStockContract(identifier.stockContractId);
        const lotReceipt = await stockContract.getSingleLotReceipt(identifier.lotId);
        if (!lotReceipt) {
            console.warn("Lot Receipt not found", identifier.toString())
            showError(t("invalid_lot_receipt"))
            return;
        }

        setMaterial( (material) => {
            if(!material){
                const slug = getMaterialSlugFromContract(stockContract.contract.description)
                if(!slug) return null;

                return {
                    slug,
                    id: stockContract.contractId
                }
            }
            return material;
        })

        setLotReceipts((receipts) => {
            if(receipts.some( ({contractId}) => contractId !== lotReceipt.contractId)){
                showError(t("inconsistent_lot_receipt"))
                return receipts;
            }

            if (receipts.some(({lotId}) => lotId === lotReceipt.lotId)){
                showWarning(t("already_added_lot_receipt"))
                return receipts;
            }
            return [...receipts, lotReceipt]
        });

        setIsProcessing(false);

    }, [showError, showWarning, t]);

    const handleOnResult =  (code: string) => {
        try {
            const identifier = ScannableIdentifier.parse(code);
            if (identifier.isAccountIdentifier()) return false;
            queue.enqueue(() => fetchLotReceipts(identifier), code);
            return true;
        } catch (e) {
            console.error(e);
        }
        return false
    }

    const handleCreateLot = () => {
        router.push(`/outgoing/${material?.id}/`);
        console.log("Create Lot")
    }

    const handleReset = () => {
        setMaterial(null);
        setLotReceipts([]);
    }

    return (<>
        <Header title={t("title")} description={t("description")}/>
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
                <LabeledTextItem label={t("lot_count")} text={lotReceipts.length.toString()}/>
                <LabeledTextItem label={t("weight")}
                                 text={`${lotReceipts.reduce((acc, l) => acc + l.confirmedQuantity, 0).toString()} kg`}/>
            </div>
            <div className="flex flex-row items-center justify-end mt-2 gap-x-2">
                <IconButton
                    onClick={handleReset}
                    icon={<RiCloseLine size={24}/>}
                    label={t("reset")}
                    disabled={lotReceipts.length === 0}
                    labelClassName="text-gray-500"
                    className="bg-transparent text-gray-500 text-sm font-semibold rounded-lg border border-transparent hover:!bg-gray-100 hover:text-gray-800 focus:!ring-0 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-500 dark:hover:!bg-gray-100/30 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:!ring-0"
                />
                <IconButton
                    onClick={handleCreateLot}
                    icon={<RiArchive2Line size={24}/>}
                    label={t("create")}
                    loading={isProcessing}
                    disabled={lotReceipts.length === 0}
                />
            </div>
        </div>
        <QrCodeScanner onScan={handleOnResult} keepScanning={true}/>
    </>)
}
