"use client";

import useSWR from "swr";
import {contractsProvider} from "@/common/contractsProvider";
import {LotCardProxy} from "@/features/stock/components/LotCardProxy";
import {LotCardProxySkeleton} from "@/features/stock/components/LotCardProxySkeleton";
import {LotSearchField} from "@/features/stock/components/LotSearchField";
import {useState} from "react";
import {useEnhancedRouter} from "@/ui/hooks/useEnhancedRouter";

async function fetchLots(contractId: string) {
    const contract = await contractsProvider.getStockContract(contractId);
    return (await contract.getAllLotIds()) || []
   }

interface Props {
    contractId: string;
}

export const LotList = ({contractId}: Props) => {
    const [searchTerm, setSearchTerm] = useState("")
    const router = useEnhancedRouter();

    const {isLoading, data: lots} = useSWR(`stock/${contractId}/lots`, async () => fetchLots(contractId), {
        refreshInterval: 120_000
    })

    let filtered = lots ?? [];
    if (searchTerm.length && lots) {
        filtered = lots.filter(({lotId}) => lotId.indexOf(searchTerm) !== -1);
    }

    const handleLotCardClick = (lotId:string) => {
        router.push(`/stock/${contractId}/${lotId}`);
    }

    return <>
        <section className="w-full mb-4">
            <LotSearchField onSearch={setSearchTerm}/>
        </section>

        <section className="relative w-full">
            <hr className="w-full"/>
            <small className="absolute bg-white text-xs text-gray-400 px-1 right-2 top-[-6px] p-0 m-0">{filtered.length}/{lots?.length}</small>
        </section>
        <section className="space-y-2 mt-4">

        {isLoading && (
            <>
                <LotCardProxySkeleton/>
                <LotCardProxySkeleton/>
                <LotCardProxySkeleton/>
            </>
        )}
        {!isLoading && filtered.length && (
            filtered.map(({lotId, sold}) => <LotCardProxy
                key={lotId}
                contractId={contractId}
                lotId={lotId}
                sold={sold}
                onClick={handleLotCardClick}
            />)
        )}
        </section>
    </>
}