import {LotReceiptData} from "@veridibloc/smart-contracts";

export interface SingleLotReceiptInfo {
    materialId: string;
    materialSlug: string;
    receipt: LotReceiptData,
}
