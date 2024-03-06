import {
    CertificateContractService,
    CollectorTokenContractService,
    StockContractService
} from "@veridibloc/smart-contracts"
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
            reference: getEnv("NEXT_PUBLIC_CONTRACTS_STOCK_REF"),
            codeHash: getEnv("NEXT_PUBLIC_CONTRACTS_STOCK_CODE_HASH")
        })
    }

    getStockContract(contractId: string) {
        return this.getStockContractService().with(contractId)
    }

    getManyStockContracts(contractIds: string[]){
        const service  = this.getStockContractService()
        const contractRequests = contractIds.map( id => service.with(id));
        return Promise.all(contractRequests);
    }

}

export const contractsProvider = new ContractsProvider(getLedgerClient())


