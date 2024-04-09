import useSWR from 'swr';
import {contractsProvider} from "@/common/contractsProvider";
import {useUserAccount} from "@/ui/hooks/useUserAccount";
import {useAppContext} from "@/ui/hooks/useAppContext";
export const useStockContracts = () => {
    const account = useUserAccount();
    const {Ledger : {PollingInterval}} = useAppContext()
    const {isLoading, data, error} = useSWR(`fetch/stock-contracts/${account.publicKey}`, async () => {
        const stockContractIds = account.stockContracts.map(m => m.id)
        return contractsProvider.getManyStockContracts(stockContractIds);
    }, {
        refreshInterval: PollingInterval,
    })

    return {
        isLoading,
        contracts: data
    }
}
