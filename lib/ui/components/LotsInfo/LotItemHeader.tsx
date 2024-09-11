import {LotReceiptData} from "@veridibloc/smart-contracts";
import React from "react";

interface ItemProps{
    receipt:LotReceiptData
}

export function LotItemHeader({receipt}: ItemProps){
    return (
        <div className="flex flex-row justify-between items-center w-full ">
            <p className="font-medium">{receipt.confirmedQuantity} kg</p>
            <small className="text-gray-300 text-xs">{receipt.lotId}</small>
        </div>
    )
}