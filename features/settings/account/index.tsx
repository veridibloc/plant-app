"use client";

import {useUserAccount} from "@/ui/hooks/useUserAccount";
import {createRef, Fragment, useEffect, useLayoutEffect, useRef} from "react";
import {createRoot} from "react-dom/client";
import Link from "next/link"
import QRCode from "react-qr-code";
import {UserAccount} from "@/types/userAccount";
import {useAppContext} from "@/ui/hooks/useAppContext";
import {Address} from "@signumjs/core";

interface Props {
    targetClass: string;
}

const InjectedElementId = "account-info-root";
export const AccountInfoInjection = ({targetClass}: Props) => {
    const userAccount = useUserAccount();

    useLayoutEffect(() => {
        if(document.getElementById(InjectedElementId))
        {
            // exists already
            return;
        }

        const timeout = setInterval(() => {
            const target = document.getElementsByClassName(targetClass);
            if (!target.length) return;
            clearTimeout(timeout);
            const accountInfoRoot = document.createElement('div')
            accountInfoRoot.setAttribute('id', InjectedElementId);
            target[0].appendChild(accountInfoRoot);
            createRoot(accountInfoRoot).render(<AccountInfo userAccount={userAccount}/>);
        }, 100)

        return () => {
            clearInterval(timeout);
            const root = document.getElementById(InjectedElementId);
            root?.parentNode?.removeChild(root);
        }
    }, [userAccount, targetClass]);

    return null;
};


function AccountInfo({userAccount}: { userAccount: UserAccount }) {

    const {Ledger: {ExplorerUrl}} = useAppContext();
    const address = Address.fromPublicKey(userAccount.publicKey);

    return (
        <section className="flex flex-col justify-between items-center w-full">
            <hr className="w-full mb-2"/>
            <Link href={`${ExplorerUrl}/address/${address.getNumericId()}`}
                  className="hover:bg-gray-100 p-1 rounded text-center" target="_blank" rel="noopener noreferrer">
                <div>
                    <QRCode
                        size={128}
                        style={{
                            maxWidth: "100%",
                            width: "100%",
                            padding: "0.5rem",
                        }}
                        value={address.getNumericId()}
                        viewBox={`0 0 128 128`}
                    />
                </div>
                <div className="text-sm">Address: {address.getReedSolomonAddress()}</div>
                <div className="text-sm">ID: {address.getNumericId()}</div>
            </Link>
        </section>
    );
}