'use server'
import {z} from 'zod'
import {contractsProvider} from '@/common/contractsProvider';
import {boomify, notFound, unauthorized} from '@hapi/boom';
import {createSigner} from '@/server/createSigner';
import {ensureAuthenticatedUser} from "@/server/ensureAuthenticatedUser";

const schema = z.object({
    collectorId: z.string(),
    materialId: z.string(),
    quantity: z.number().gt(0),
})

export async function registerCollection(prevState: any, formData: FormData) {
    try {
        const parsedData = schema.safeParse({
            collectorId: formData.get("collectorId"),
            materialId: formData.get("material"),
            quantity: Number(formData.get("quantity")),
        })
        if(!parsedData.success){
            return {error: parsedData.error.flatten().fieldErrors}
        }

        const user = await ensureAuthenticatedUser();
        if(user.publicMetadata.role !== 'separator'){
            throw unauthorized("You are not authorized to perform this action");
        }
        
        const contract = await contractsProvider.getCollectorTokenContractSingleton();// check if exists!
        const {materialId, quantity, collectorId} =  parsedData.data;

        // checks if account exists, if not throws
        await contractsProvider.ledger.account.getAccount({
            accountId: collectorId,
            includeCommittedAmount: false,
            includeEstimatedCommitment: false,
        })
        contract.signer = await createSigner(contractsProvider.ledger, user);
        const txId = await contract.grantCollectorToken(materialId, quantity, collectorId);
        console.info("Collection registered and collector token granted...", txId);
        return {success: txId!.transaction};
    } catch (e: any) {
        console.error("[Error registerAction]:", e.message);
        const boom = boomify(e);
        return {error: boom.output.payload.message};
    }
}


