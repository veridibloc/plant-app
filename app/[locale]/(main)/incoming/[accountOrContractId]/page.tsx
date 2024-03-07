import {IncomingCollectionConfirmation} from "@/features/incoming/IncomingCollectionConfirmation";

export default async function Page({params : {accountOrContractId} } : { params: { accountOrContractId: string } }) {

  // check for contract
  return <IncomingCollectionConfirmation accountId={accountOrContractId} materialName={"Material"} quantity={1000} />;
}
