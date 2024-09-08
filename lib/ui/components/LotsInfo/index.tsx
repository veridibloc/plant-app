import {MaterialCard} from "@/ui/components/Materials";
import {LotReceiptsInfo as LotReceiptsInfoType} from "@/types/lotReceiptsInfo";
import {Accordion, AccordionItemType} from "@/ui/components/Accordion";
import React, {memo} from "react";
import {LotItemHeader} from "./LotItemHeader";
import {LotItemContent} from "./LotItemContent";

interface Props {
    lotsInfo: LotReceiptsInfoType
}

export function _LotsInfo({lotsInfo : {materialSlug, materialId, receipts}}: Props) {

    let totalWeight = 0;
    const items: AccordionItemType[] = [];
    for(let r of receipts){
        totalWeight+=r.confirmedQuantity;
        items.push({
            id: r.lotId,
            content: <LotItemContent receipt={r}/>,
            header: <LotItemHeader receipt={r} />,
            height: "248px"
        })
    }

    return <>
        <MaterialCard materialSlug={materialSlug} id={materialId} weight={totalWeight} showWeight={true}/>
        <Accordion className="w-full bg-white" items={items} />
    </>
}

export const LotsInfo = memo(_LotsInfo);
