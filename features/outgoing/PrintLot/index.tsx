"use client";

import {ScannableIdentifier} from "@/common/scannableIdentifiers";
import {useUserAccount} from "@/ui/hooks/useUserAccount";
import {useTranslations} from "next-intl";
import {DisplayablePrintableProps} from "./DisplayablePrintableProps";
import {Printable} from "./Printable";
import {Displayable} from "./Displayable";

interface Props {
    lotId: string;
    stockContractId: string;
    weight: number
}

export function PrintLot({lotId, stockContractId, weight}: Props): JSX.Element {
    const {stockContracts} = useUserAccount();
    const tm = useTranslations("materials");

    const identifier = new ScannableIdentifier({
        type: "vb",
        parts: [stockContractId, lotId]
    }).toString()

    const materialLabel = (stockContracts.find(lstc => lstc.id === stockContractId)?.label ?? "").toLowerCase();

    //  TODO: check if not existant -> just check the transaction

    const props: DisplayablePrintableProps = {
        stockContractId,
        weight,
        identifier,
        materialLabel
    }
    return (<>
            <Printable {...props}/>
            <Displayable {...props}/>
        </>
    )
}