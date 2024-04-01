"use client";

import {MaterialCard} from "@/ui/components/Materials";
import {SingleLotInfo} from "@/features/outgoing/components/SingleLotInfo";
import {LotReceiptsInfo} from "@/types/lotReceiptsInfo";

interface Props {
    lotsInfo: LotReceiptsInfo
}

export function LotReceiptsInfo({lotsInfo : {materialSlug, materialId, receipts}}: Props) {
    const totalWeight = receipts.reduce((w, l) => w + l.confirmedQuantity, 0)

    return <>
        <MaterialCard materialSlug={materialSlug} id={materialId} weight={totalWeight} showWeight={true}/>
        <section className="hs-accordion-group w-full mt-2">
        {receipts.map( l => <SingleLotInfo key={`lri-${l.lotId}`} lotReceipt={l} />) }
        </section>
    </>
}