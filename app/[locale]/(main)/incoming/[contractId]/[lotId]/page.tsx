import {IncomingConfirmation} from "@/features/incoming/IncomingConfirmation";

export default async function Page({params : {lotId, contractId} } : { params: { contractId: string, lotId: string } }) {

  // check for contract

  return <IncomingConfirmation lotId={lotId} materialName={"Material"} quantity={1000} />;
}
