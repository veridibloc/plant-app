"use client"

import {Avatar} from "@/ui/components/Avatar";
import {AvatarFallback} from "@/ui/components/Avatar/AvatarFallback";
import {Hashicon} from "@emeraldpay/hashicon-react";


export const CollectorInfo = ({accountId}: { accountId: string }) => {
    return <section className="w-full">
        <div className="flex flex-col items-center p-4 rounded-lg shadow m-2 bg-gray-100">
            <Avatar>
                <AvatarFallback className="rounded-full border border-gray-300 bg-white">
                    <Hashicon value={accountId} size={48}/>
                </AvatarFallback>
            </Avatar>
            <div className="text-sm text-gray-500">1625432882333</div>
        </div>
    </section>
};