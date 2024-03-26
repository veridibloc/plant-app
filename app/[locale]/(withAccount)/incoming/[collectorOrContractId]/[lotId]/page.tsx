import {IncomingLotConfirmation} from "@/features/incoming/recycler/IncomingLotConfirmation";
import {cache} from "react";
import {contractsProvider} from "@/common/contractsProvider";
import {PageProps} from "@/types/pageProps";
import {LotData} from "@veridibloc/smart-contracts";
import {notFound} from "next/navigation";
import {DescriptorData} from "@signumjs/standards";

interface StockLotInfo {
  materialSlug: string;
  lotData: LotData,
  hasReceiptAlready: boolean
}


const fetchStockContractLotInfo = cache(async (contractId: string, lotId: string) : Promise<StockLotInfo|null> => {
  try {
    const contract = await contractsProvider.getStockContract(contractId);
    const [lotData, lotReceipt] = await Promise.all([
              contract.getLotData(lotId),
          contract.getSingleLotReceipt(lotId)
    ])

    const contractDescriptor = DescriptorData.parse(contract.contract.description)

    return {
      materialSlug: (contractDescriptor.getCustomField("x-mat") as string ?? "other").toLowerCase(),
      lotData: lotData,
      hasReceiptAlready: Boolean(lotReceipt)
    }
  } catch (e: any) {
    console.error(e);
    return null;
  }
});

interface Props extends PageProps<{collectorOrContractId: string, lotId: string}>{}

export default async function Page({params : {lotId, collectorOrContractId} } : Props) {
  const lotInfo = await fetchStockContractLotInfo(collectorOrContractId, lotId);
  if(!lotInfo){
    notFound();
  }

  return <IncomingLotConfirmation
      contractId={collectorOrContractId}
      materialSlug={lotInfo.materialSlug}
      lotData={lotInfo.lotData}
      hasReceiptAlready={lotInfo.hasReceiptAlready}
  />;
}
