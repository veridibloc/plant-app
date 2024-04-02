import { WorkInProgress } from "@/features/exceptions/workInProgress";
import {PageProps} from "@/types/pageProps";
import {cache} from "react";
import {contractsProvider} from "@/common/contractsProvider";
import {notFound} from "next/navigation";
import {TokenInfo} from "@/types/tokenInfo";

const fetchAccountTokenInfo = cache(async (tokenId: string) : Promise<TokenInfo | null> => {
  try{
    if(tokenId === "0"){
      return {
        tokenId: "0",
        ticker: process.env.NEXT_PUBLIC_LEDGER_IS_TESTNET ?  "TSIGNA" : "SIGNA",
        decimals: 8
      }
    }
    const tokenInfo = await contractsProvider.ledger.asset.getAsset({assetId: tokenId});
    return {
      tokenId,
      decimals: tokenInfo.decimals,
      ticker: tokenInfo.name
    }
  } catch(e: any) {
    console.error(e.message)
    return null;
  }
})

export default async function Page({params : {tokenId}} : PageProps<{ tokenId: string }>) {
  const tokenInfo = await fetchAccountTokenInfo(tokenId);
  if(!tokenInfo) {
    notFound();
  }

  console.log("tokenInfo", tokenInfo);

  return <WorkInProgress />;
}
