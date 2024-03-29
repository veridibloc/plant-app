import {LotReceiptData} from "@veridibloc/smart-contracts";
import {MaterialCard} from "@/ui/components/Materials";
import {SingleLotInfo} from "@/features/outgoing/components/SingleLotInfo";

interface Props {
    materialSlug: string;
    stockContractId: string,
    lots: LotReceiptData[]
}

export function LotsInfo({lots, stockContractId, materialSlug}: Props) {
    const totalWeight = lots.reduce((w, l) => w + l.confirmedQuantity, 0)

    return <>
        <MaterialCard materialSlug={materialSlug} id={stockContractId} weight={totalWeight} showWeight={true}/>
        {lots.map( l => <SingleLotInfo key={`lri-${l.lotId}`} lotReceipt={l} />) }
    </>
}