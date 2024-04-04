"use client"

import {TextInput} from "@/ui/components/Inputs/TextInput";
import {ChainValue} from "@signumjs/util";
import {useEffect, useLayoutEffect, useState} from "react";
import {TokenInfo} from "@/types/tokenInfo";
import {useFormatter, useTranslations} from "next-intl";
export interface TokenValue {
    quantity: string;
    raw: string;
    error: string;
}

const InitialTokenValue: TokenValue = {
    raw: "",
    quantity: "",
    error: "",
}

interface Props {
    tokenInfo: TokenInfo;
    maxQuantity: number;
    onChange: (quantity: string, tokenInfo: TokenInfo, error: string) => void;
    quantity?: string
}

export function AmountInput({tokenInfo, maxQuantity, onChange, quantity}: Props) {
    const t = useTranslations("common")
    const [tokenValue, setTokenValue] = useState(InitialTokenValue);
    const {number} = useFormatter();


    const handleAmountChange = (value: string) => {
        if (!value) {
            setTokenValue({
                raw: value,
                quantity: "0",
                error: "",
            })
            return;
        }

        let quantity = "";
        let error = "";
        try {
            const amount = Number(value);
            if (!Number.isNaN(amount)) {
                quantity = ChainValue.create(tokenInfo.decimals).setCompound(amount).getAtomic();
                const nqt = Number(quantity)
                const minimumAmount = 1 / Math.pow(10, tokenInfo.decimals);
                if(amount < minimumAmount) {
                    error = t("minimum_amount_is", {amount: minimumAmount});
                }
                if(nqt > maxQuantity) {
                    error = t("not_enough_balance");
                }
                setTokenValue({
                    raw: number(amount, {maximumFractionDigits: tokenInfo.decimals}),
                    quantity,
                    error
                })
            }
        } catch (e: any) {
            error = t("invalid_amount");
            // do nothing
            setTokenValue({
                raw: value,
                quantity: "0",
                error,
            })
        } finally {
            onChange(quantity, tokenInfo, error);
        }
    }

    useLayoutEffect(() => {
        if(quantity){
            try{
                const value = ChainValue.create(tokenInfo.decimals).setAtomic(quantity);
                handleAmountChange(value.getCompound());
            }catch(e:any){
                //no op
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [quantity, tokenInfo]);

    return (
        <div className="relative">
            <TextInput
                label="Amount"
                value={Number(tokenValue.raw)}
                onChange={handleAmountChange}
                type="number"
            />
            <div className="absolute top-8 right-4 font-medium text-gray-500">{tokenInfo.ticker.toUpperCase()}</div>
            {tokenValue.error.length > 0 && <small className="text-red-700">{tokenValue.error}</small>}
        </div>
    )
}
