"use client"

import {Avatar} from "@/ui/components/Avatar";
import {AvatarFallback} from "@/ui/components/Avatar/AvatarFallback";
import dynamic from "next/dynamic";

const HashIcon = dynamic(() => import("@emeraldpay/hashicon-react").then(m => m.Hashicon), {ssr: false})
export const CollectorInfo = ({collectorId}: { collectorId: string }) => {
    return <section className="w-full">
        <div className="flex flex-col items-center p-4 rounded-lg shadow bg-gray-100">
            <Avatar>
                <AvatarFallback className="rounded-full border border-gray-300 bg-white">
                    <HashIcon value={collectorId} size={48}/>
                </AvatarFallback>
            </Avatar>
            <div className="text-sm text-gray-500">{collectorId}</div>
        </div>
    </section>
};