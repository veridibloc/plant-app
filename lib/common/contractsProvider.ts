import {
    CertificateContractService,
    CollectorTokenContractService,
    StockContractService
} from "@veridibloc/smart-contracts";
import {Ledger} from '@signumjs/core';
import {Amount} from '@signumjs/util';
import {getEnv} from './getEnv';
import {getLedgerClient} from "./getLedgerClient";
export class ContractsProvider {
    constructor(private _ledger: Ledger) {}
    get ledger() {
        return this._ledger;
    }

    getCertificateTokenContract(contractId: string) {
        return this.getCertificateTokenContractService().with(contractId);
    }
    getCertificateTokenContractService() {
        return new CertificateContractService({
            ledger: this.ledger,
            codeHash: getEnv("NEXT_PUBLIC_CONTRACTS_CERTIFICATE_TOKEN_CODE_HASH"),
            reference: getEnv("NEXT_PUBLIC_CONTRACTS_CERTIFICATE_TOKEN_REF"),
            activationCosts: Amount.fromSigna(0.25),
            baseTransactionFee: Amount.fromSigna(0.01),
        })
    }

    getCollectorTokenContractService() {
        return new CollectorTokenContractService({
            ledger: this.ledger,
            activationCosts: Amount.fromSigna(0.5),
            baseTransactionFee: Amount.fromSigna(0.01),
        })
    }

    getCollectorTokenContractSingleton() {
        return this.getCollectorTokenContractService().with(getEnv("NEXT_PUBLIC_CONTRACTS_COLLECTOR_TOKEN_ID"))
    }


    getStockContractService() {
        return new StockContractService({
            ledger: this.ledger,
            activationCosts: Amount.fromSigna(1.0),
            baseTransactionFee: Amount.fromSigna(0.01),
            reference: process.env.NEXT_PUBLIC_CONTRACTS_STOCK_REF || "",
            codeHash: process.env.NEXT_PUBLIC_CONTRACTS_STOCK_CODE_HASH || "",
        })
    }

    async getStockContract(contractId: string) {
        const contract = await this.getStockContractService().with(contractId)
        const expectedHash = process.env.NEXT_PUBLIC_CONTRACTS_STOCK_CODE_HASH || "";
        if(contract.contract.machineCodeHashId !== expectedHash ) {
          throw new Error(`Contract Id (${contractId}) doesn't match Code Hash: Expected [${expectedHash}] but got [${contract.contract.machineCodeHashId}]`)
        }
        return contract;
    }

    async getLotDetails(contractId: string, lotId: string) {
        const stockContract = await this.getStockContract(contractId);
        return stockContract.getLotData(lotId)
    }
    async getLotReceiptData(contractId: string, lotId: string) {
        const stockContract = await this.getStockContract(contractId);
        return stockContract.getSingleLotReceipt(lotId);
    }

    getManyStockContracts(contractIds: string[]){
        const service  = this.getStockContractService()
        const contractRequests = contractIds.map( id => service.with(id));
        return Promise.all(contractRequests);
    }
}

export const contractsProvider = new ContractsProvider(getLedgerClient())


