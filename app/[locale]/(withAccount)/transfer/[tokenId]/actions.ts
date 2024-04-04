'use server'
import {z} from 'zod'
import {contractsProvider} from '@/common/contractsProvider';
import {badRequest, boomify} from '@hapi/boom';
import {createSigner} from '@/server/createSigner';
import {ensureAuthenticatedUser} from "@/server/ensureAuthenticatedUser";
import {Amount} from "@signumjs/util";

const schema = z.object({
    recipientId: z.string(),
    quantity: z.number().gt(0),
    tokenId: z.string(),
})

export async function transferToken(formData: FormData) {
    try {
        const parsedData = schema.safeParse({
            recipientId: formData.get("recipientId"),
            tokenId: formData.get("tokenId"),
            quantity: Number(formData.get("quantity")),
        })
        if(!parsedData.success){
            return {error: parsedData.error.flatten().fieldErrors}
        }

        const {recipientId, quantity, tokenId} = parsedData.data;

        const user = await ensureAuthenticatedUser();
        const ledger = contractsProvider.ledger;

        await new Promise(resolve => setTimeout(resolve, 2000))

        // checks if account exists
        const recipient = await ledger.account.getAccount({
            accountId: recipientId,
            includeCommittedAmount: false,
            includeEstimatedCommitment: false,
        })
        if(!recipient.publicKey){
            throw badRequest("Recipient has no public key");
        }

        // const signer = await createSigner(ledger, user);
        // const senderPublicKey =  await signer.getPublicKey();
        // const unsignedTx = await ledger.asset.transferAsset({
        //     recipientId,
        //     quantity,
        //     feePlanck: Amount.fromPlanck(0.02).getPlanck(),
        //     senderPublicKey,
        //     assetId: tokenId,
        // })
        // const txId = await signer.signTransaction(unsignedTx.unsignedTransactionBytes);
        const txId = { transaction: "txId" }
        console.info(`Transfer of ${quantity} of token ${tokenId} submitted...`, txId);
        return {success: txId!.transaction};
    } catch (e: any) {
        console.error("[Error registerAction]:", e.message);
        const boom = boomify(e);
        return {error: boom.output.payload.message};
    }
}


