'use server'
import {z} from 'zod'
import {contractsProvider} from '@/common/contractsProvider';
import {boomify, notAcceptable, unauthorized} from '@hapi/boom';
import {createSigner} from '@/server/createSigner';
import {ensureAuthenticatedUser} from "@/server/ensureAuthenticatedUser";
import {BusinessPartnerSelector, StockContract} from "@veridibloc/smart-contracts";
import {fetchUserAccount} from "@/server/fetchUserAccount";
import {User} from "@clerk/backend";
import {Address} from "@signumjs/core";

const schema = z.object({
    separatorContractId: z.string(),
    recyclerContractId: z.string(),
    lotId: z.string(),
    quantity: z.number().gt(0),
})

export async function registerLot(prevState: any, formData: FormData) {
    try {
        const parsedData = schema.safeParse({
            separatorContractId: formData.get("separatorContractId"),
            lotId: formData.get("lotId"),
            recyclerContractId: formData.get("recyclerContractId"),
            quantity: Number(formData.get("quantity")),
        })

        if (!parsedData.success) {
            return {error: parsedData.error.flatten().fieldErrors}
        }

        const user = await ensureAuthenticatedUser();
        if (user.publicMetadata.role === 'separator') {
            throw unauthorized("You are not authorized to perform this action");
        }

        const {lotId, quantity, separatorContractId, recyclerContractId} = parsedData.data;
        const separatorContract = await contractsProvider.getStockContract(separatorContractId);
        await ensureRecyclerIsAuthorizedPartner(user, separatorContract);

        console.info("Incoming Lot Receipt...", parsedData.data);
        const lotReceipt = await separatorContract.getSingleLotReceipt(lotId);
        if (lotReceipt) {
            throw notAcceptable(`The lot ${lotId} was already confirmed`);
        }


        const signer = await createSigner(contractsProvider.ledger, user);

        separatorContract.signer = signer
        const receiptTxId = await separatorContract.confirmLotReceipt(lotId, quantity);
        console.info("Lot Receipt confirmed...", receiptTxId);

        const recyclerContract = await contractsProvider.getStockContract(recyclerContractId);
        recyclerContract.signer = signer
        const txId = await recyclerContract.registerIncomingMaterial(quantity, lotId, receiptTxId?.fullHash)
        console.info("Material registered for stock...", txId);

        return {success: txId!.transaction};
    } catch (e: any) {
        const boom = boomify(e);
        console.error("[Error registerLot]:", boom.output.payload.message);
        return {error: boom.output.payload.message};
    }
}


async function ensureRecyclerIsAuthorizedPartner(user: User, separatorContract: StockContract) {
    const [authorizedPartners, account] = await Promise.all([
        separatorContract.getBusinessPartners(BusinessPartnerSelector.Authorized),
        fetchUserAccount(user)]
    )
    if(!account){
        throw unauthorized();
    }
    const recyclerAccountId = Address.fromPublicKey(account.publicKey).getNumericId();
    if (!authorizedPartners.some(({accountId}) => recyclerAccountId === accountId)){
        throw unauthorized();
    }
}