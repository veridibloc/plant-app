import {StockContractData} from "@veridibloc/smart-contracts";

export interface StockInfo {
    stockContractId: string;
    materialSlug: string;
    data: StockContractData,
}
