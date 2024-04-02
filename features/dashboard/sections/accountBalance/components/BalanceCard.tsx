"use client";
import {useFormatter} from "next-intl";

// @ts-ignore
import ColorHash from "color-hash"
import Image from "next/image";
import {TokenBalance} from "@/types/tokenBalance";
import {ChainValue} from "@signumjs/util";
import {PureClientOnly} from "@/ui/components/PureClientOnly";
import {generateNumberFromString} from "@/common/stringToNumber";
import Link from "next/link";

const colorHash = new ColorHash();

interface Props {
    balance: TokenBalance;
}

export const BalanceCard = (props: Props) => {
    const {number} = useFormatter();
    const {decimals, balance, tokenId, ticker} = props.balance;

    const amount = Number(ChainValue.create(decimals).setAtomic(balance).getCompound());
    const color = colorHash.hex(tokenId);
    const degree = generateNumberFromString(tokenId, 360);
    const isSigna = tokenId === "0";

    return (
        <PureClientOnly>
            <Link href={`/transfer/${tokenId}`} className="w-full">
                <div className="flex items-center justify-between bg-white border rounded-xl p-4 w-full hover:bg-gray-200">
                    <div className="flex items-center space-x-1">

                        {isSigna ? (
                            <Image
                                src="/assets/signum_logo_blue.svg"
                                width={40}
                                height={49}
                                alt="Signum Logo"
                                className="mx-2"
                                unoptimized
                            />
                        ) : (

                            <div className="rounded-full h-[40px] w-[40px]" style={{
                                background: `linear-gradient(${degree}deg, #22d3ee 20%, ${color} 100%)`
                            }}/>
                        )}

                        <h3 className="text-4xl font-bold text-gray-800"></h3>
                        <h3 className="text-lg font-bold text-gray-800">
                            {number(amount, {maximumFractionDigits: decimals})}
                        </h3>
                    </div>
                    <p className="font-medium text-gray-500">{ticker.toUpperCase()}</p>
                </div>
                {isSigna && (<hr className="w-full mt-1"/>)}
            </Link>
        </PureClientOnly>
    );
};
