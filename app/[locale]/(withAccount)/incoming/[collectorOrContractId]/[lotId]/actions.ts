'use server'
import {z, ZodError} from 'zod'
import {contractsProvider} from '@/common/contractsProvider';
import {badRequest, boomify, notFound, unauthorized} from '@hapi/boom';
import {createSigner} from '@/server/createSigner';
import {ensureAuthenticatedUser} from "@/server/ensureAuthenticatedUser";

const schema = z.object({
    contractId: z.string(),
    lotId: z.string(),
    quantity: z.number().gt(0),
})

export async function registerLot(prevState: any, formData: FormData) {
    try {
        const parsedData = schema.safeParse({
            contractId: formData.get("contractId"),
            lotId: formData.get("lotId"),
            quantity: Number(formData.get("quantity")),
        })

        if(!parsedData.success){
            return {error: parsedData.error.flatten().fieldErrors}
        }

        const user = await ensureAuthenticatedUser();
        if(user.publicMetadata.role !== 'recycler'){
            throw unauthorized("You are not authorized to perform this action");
        }

        const {lotId, quantity, contractId} =  parsedData.data;
        const contract  = await contractsProvider.getStockContract(contractId);
        contract.signer = await createSigner(contractsProvider.ledger, user);
        const txId = await contract.confirmLotReceipt(lotId, quantity);
        console.info("Lot Receipt confirmed...", txId);
        return {success: txId!.transaction};
    } catch (e: any) {
        console.error("[Error registerLot]:", e.message);
        const boom = boomify(e);
        return {error: boom.output.payload.message};
    }
}


