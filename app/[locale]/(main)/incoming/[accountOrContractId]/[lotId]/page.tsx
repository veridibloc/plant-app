import {IncomingLotConfirmation} from "@/features/incoming/IncomingLotConfirmation";

export default async function Page({params : {lotId, accountOrContractId} } : { params: { accountOrContractId: string, lotId: string } }) {

  // check for contract

  return <IncomingLotConfirmation contractId={accountOrContractId} lotId={lotId} materialName={"Material"} quantity={1000} />;
}
