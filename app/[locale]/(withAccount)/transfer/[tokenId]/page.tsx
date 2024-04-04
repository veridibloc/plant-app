import {PageProps} from "@/types/pageProps";
import {cache} from "react";
import {contractsProvider} from "@/common/contractsProvider";
import {notFound} from "next/navigation";
import {TokenInfo} from "@/types/tokenInfo";
import {PageContainer} from "@/ui/components/Layout/PageContainer";
import {TransferForm} from "@/features/transfer";
import {Header} from "@/ui/components/Layout/Header";
import {useTranslations} from "next-intl";

const fetchAccountTokenInfo = cache(async (tokenId: string): Promise<TokenInfo | null> => {
    try {
        if (tokenId === "0") {
            return {
                tokenId: "0",
                ticker: process.env.NEXT_PUBLIC_LEDGER_IS_TESTNET ? "TSIGNA" : "SIGNA",
                decimals: 8
            }
        }
        const tokenInfo = await contractsProvider.ledger.asset.getAsset({assetId: tokenId});
        return {
            tokenId,
            decimals: tokenInfo.decimals,
            ticker: tokenInfo.name
        }
    } catch (e: any) {
        console.error(e.message)
        return null;
    }
})

export default async function Page({params: {tokenId}, searchParams}: PageProps<{ tokenId: string }, {r?: string, q?: string}>) {
    const tokenInfo = await fetchAccountTokenInfo(tokenId);
    if (!tokenInfo) {
        notFound();
    }
    return <PageContainer>
        <PageContent tokenInfo={tokenInfo} recipient={searchParams.r} quantity={searchParams.q}/>
    </PageContainer>;
}

interface Props {
    tokenInfo: TokenInfo;
    recipient?: string;
    quantity?:string;
}
function PageContent({tokenInfo, recipient, quantity}: Props) {
    const t = useTranslations("transfer")

    return (
        <>
            <Header title={t("title")} description={t("description")}/>
            <TransferForm tokenInfo={tokenInfo} recipient={recipient} quantity={quantity}/>
        </>
    )
}


