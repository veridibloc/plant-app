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
            activationCosts: Amount.fromSigna(0.25),
            baseTransactionFee: Amount.fromSigna(0.01),
            // we don't need the reference nor hash, as we do not create contracts
            codeHash: "",
            reference: "",
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
        return this.getCollectorTokenContractService().with(getEnv("NEXT_PUBLIC_VERICLEAN_TOKEN_CONTRACT"))
    }


    getStockContractService() {
        return new StockContractService({
            ledger: this.ledger,
            activationCosts: Amount.fromSigna(1.0),
            baseTransactionFee: Amount.fromSigna(0.01),
            // we don't need the reference nor hash, as we do not create contracts
            reference: "",
            codeHash: "",
        })
    }

    async getStockContract(contractId: string) {
        const contract = await this.getStockContractService().with(contractId)
        const contractCreatorId = process.env.NEXT_PUBLIC_CONTRACTS_CREATOR_ID || "";
        if(contract.contract.creator !== process.env.NEXT_PUBLIC_CONTRACTS_CREATOR_ID) {
          throw new Error(`Contract Id (${contractId}) is not created by VeridiBloc! Expected (id: ${contractCreatorId}), but got (id: ${contract.contract.creator})`)
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


