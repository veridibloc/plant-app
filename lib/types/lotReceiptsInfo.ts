import {LotReceiptData} from "@veridibloc/smart-contracts";

export interface LotReceiptsInfo {
    materialId: string;
    materialSlug: string;
    receipts: LotReceiptData[],
}
