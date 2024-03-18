import {useStockContracts} from "@/ui/hooks/useStockContracts";

export const useSingleStockContract = (stockContractId: string) => {
    const {contracts, isLoading} = useStockContracts()

    let contract;
    if (contracts) {
         contract = contracts.find( (contract) => contract.contractId === stockContractId);
         if(!contract){
             console.error("No contract found with id " + stockContractId);
         }
    }

    return {
        isLoading,
        contract
    }
}
