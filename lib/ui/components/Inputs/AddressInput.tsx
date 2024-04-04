"use client";

import {TextInput} from "@/ui/components/Inputs/TextInput";
import dynamic from "next/dynamic";
import {useLayoutEffect, useState} from "react";
import {useTranslations} from "next-intl";
import {useLedgerService} from "@/ui/hooks/useLedgerService";
import {Address} from "@signumjs/core";
import {useAppContext} from "@/ui/hooks/useAppContext";
import {Spinner} from "@/ui/components/Spinner";

const HashIcon = dynamic(() => import("@emeraldpay/hashicon-react").then(m => m.Hashicon), {ssr: false})

export interface AddressValue {
    address: string;
    id: string;
    exists: boolean;
    error: string;
    raw: string;
}

const InitialAddress: AddressValue = {
    raw: "",
    address: "",
    exists: false,
    id: "",
    error: ""
}

function parseAccountAddress(accountIdOrAddress: string) {
    try {
        return Address.create(accountIdOrAddress)
    } catch (e: any) {
        return null
    }
}

interface Props {
    label: string;
    onChange: (accountId: string, error: string) => void;
    addressOrId?: string;
}

export function AddressInput({label, onChange, addressOrId}: Props) {
    const t = useTranslations("common");
    const ledgerService = useLedgerService();
    const {Ledger: {AddressPrefix}} = useAppContext()
    const [address, setAddress] = useState<AddressValue>(InitialAddress)
    const [fetching, setFetching] = useState(false);

    const handleOnChange = async (value: string) => {
        let s = {
            ...InitialAddress,
            raw: value
        };
        try {
            const accountAddress = parseAccountAddress(s.raw)
            if (!accountAddress) {
                s.error = t("invalid_account_format", {prefix: AddressPrefix});
            } else {
                setFetching(true);
                const account = await ledgerService.fetchAccount(accountAddress.getNumericId())
                s.id = account.account;
                s.address = account.accountRS;
                s.exists = true;
            }
        } catch (e: any) {
            // only when not found
            s.error = t("account_not_found");
        } finally {
            setAddress(s)
            setFetching(false)
            onChange(s.id, s.error)
        }
    }

    useLayoutEffect(() => {
        if(addressOrId){
            try{
                handleOnChange(addressOrId);
            }catch(e:any){
                //no op
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [addressOrId]);


    return <div className="relative">
        <TextInput
            label={label}
            placeholder={`${AddressPrefix}-BY64-7FHD-..., 4790365424565431`}
            value={address.raw}
            onChange={handleOnChange}
            debounceDelay={500}
        />
        <div className="absolute top-8 right-4">
            {fetching && (<Spinner/>)}
            {(!fetching && address.exists) && (<HashIcon value={address.id} size={28}/>)}
        </div>
        {(address.raw.length > 0 && address.exists) &&
            <small className="text-gray-400">✅ {address.address} - {address.id}</small>}
        {address.error.length > 0 && <small className="text-red-700">❌ {address.error}</small>}
    </div>
}
