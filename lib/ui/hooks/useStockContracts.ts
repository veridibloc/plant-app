import useSWR from 'swr';
import {contractsProvider} from "@/common/contractsProvider";
import {useUserAccount} from "@/ui/hooks/useUserAccount";
export const useStockContracts = () => {
    const account = useUserAccount()
    const {isLoading, data, error} = useSWR(`/fetch/stock-contracts/${account.publicKey}`, async () => {
        const stockContractIds = account.stockContracts.map(m => m.id)
        const bla = await contractsProvider.getManyStockContracts([stockContractIds[0]]);

        console.log("bla", bla[0].getData())
        return bla;
        // return contractsProvider.getManyStockContracts(stockContractIds);
    }, {
        refreshInterval: 120_000,
    })

    console.log("data", data)

    return {
        isLoading,
        contracts: data
    }
}
