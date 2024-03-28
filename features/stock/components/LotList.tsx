"use client";

import useSWR from "swr";
import {contractsProvider} from "@/common/contractsProvider";
import {LotCardProxy} from "@/features/stock/components/LotCardProxy";
import {LotCardProxySkeleton} from "@/features/stock/components/LotCardProxySkeleton";
import {LotSearchField} from "@/features/stock/components/LotSearchField";
import {useState} from "react";
import {useEnhancedRouter} from "@/ui/hooks/useEnhancedRouter";
import {useTranslations} from "next-intl";

async function fetchLots(contractId: string) {
    const contract = await contractsProvider.getStockContract(contractId);
    return (await contract.getAllLotIds()) || []
}

interface Props {
    contractId: string;
}

export const LotList = ({contractId}: Props) => {
    const t = useTranslations("stock")
    const [searchTerm, setSearchTerm] = useState("")
    const [showDelivered, setShowDelivered] = useState(false)
    const router = useEnhancedRouter();

    const {isLoading, data: lots} = useSWR(`stock/${contractId}/lots`, async () => fetchLots(contractId), {
        refreshInterval: 120_000
    })

    const filtered = lots?.filter(({lotId, sold}) => {
        if(showDelivered) {
            return lotId.indexOf(searchTerm) !== -1
        }
        return lotId.indexOf(searchTerm) !== -1 && !sold
    }) || [];

    const handleLotCardClick = (lotId: string) => {
        router.push(`/stock/${contractId}/${lotId}`);
    }

    return <>
        <section className="w-full mb-4">
            <LotSearchField onSearch={setSearchTerm}/>

            <div className="flex">
                <input type="checkbox"
                       className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                       id="hs-checked-checkbox"
                       checked={showDelivered}
                       onChange={e => setShowDelivered(e.target.checked)}
                />
                <label htmlFor="hs-checked-checkbox" className="text-sm text-gray-500 ms-3 dark:text-gray-400">{t("show_delivered")}</label>
            </div>
        </section>

        <section className="relative w-full">
            <hr className="w-full"/>
            <small
                className="absolute bg-white text-xs text-gray-400 px-1 right-2 top-[-6px] p-0 m-0">{filtered.length}/{lots?.length}</small>
        </section>
        <section className="space-y-2 mt-4">

            {isLoading && (
                <>
                    <LotCardProxySkeleton/>
                    <LotCardProxySkeleton/>
                    <LotCardProxySkeleton/>
                </>
            )}
            {!isLoading && filtered.length > 0 && (
                filtered.map(({lotId, sold}) => <LotCardProxy
                    key={lotId}
                    contractId={contractId}
                    lotId={lotId}
                    sold={sold}
                    onClick={handleLotCardClick}
                />)
            )}
            {!isLoading && filtered.length === 0 && (
                <section className="w-full mt-8 text-center">
                    <p className="text-gray-400 text-lg">{t("no_lots_found")}</p>
                </section>
            )}
        </section>
    </>
}