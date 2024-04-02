'use server'
import {z} from 'zod'
import {contractsProvider} from '@/common/contractsProvider';
import {boomify, unauthorized, notAcceptable} from '@hapi/boom';
import {createSigner} from '@/server/createSigner';
import {ensureAuthenticatedUser} from "@/server/ensureAuthenticatedUser";

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
        if (user.publicMetadata.role !== 'recycler') {
            throw unauthorized("You are not authorized to perform this action");
        }
        console.info("Incoming Lot Receipt...", parsedData.data);

        const {lotId, quantity, separatorContractId, recyclerContractId} = parsedData.data;
        const signer = await createSigner(contractsProvider.ledger, user);
        const separatorContract = await contractsProvider.getStockContract(separatorContractId);
        separatorContract.signer = signer

        const lotReceipt = await separatorContract.getSingleLotReceipt(lotId);
        if (lotReceipt) {
            throw notAcceptable(`The lot ${lotId} was already confirmed`);
        }
        const receiptTxId = await separatorContract.confirmLotReceipt(lotId, quantity);
        console.info("Lot Receipt confirmed...", receiptTxId);

        const recyclerContract = await contractsProvider.getStockContract(recyclerContractId);
        recyclerContract.signer = signer
        const txId = await recyclerContract.registerIncomingMaterial(quantity, lotId, receiptTxId?.fullHash)
        console.info("Material registered for stock...", txId);

        return {success: txId!.transaction};
    } catch (e: any) {
        console.error("[Error registerLot]:", e.message);
        const boom = boomify(e);
        return {error: boom.output.payload.message};
    }
}


