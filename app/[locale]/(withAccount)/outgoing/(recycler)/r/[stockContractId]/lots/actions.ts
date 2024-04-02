'use server'
import {z} from 'zod'
import {contractsProvider} from '@/common/contractsProvider';
import {boomify, unauthorized} from '@hapi/boom';
import {createSigner} from '@/server/createSigner';
import {ensureAuthenticatedUser} from "@/server/ensureAuthenticatedUser";

const schema = z.object({
    lotIds: z.string().regex(/^(\d{10,24},)*\d{10,24}$/), // concatenated ids
    stockContractId: z.string(),
})


export async function createLotByLotIds(prevState: any, formData: FormData) {
    try {
        const parsedData = schema.parse({
            lotIds: formData.get("lotIds"),
            stockContractId: formData.get("stockContractId"),
        })

        const user = await ensureAuthenticatedUser();
        if (user.publicMetadata.role !== 'recycler') {
            throw unauthorized("You are not authorized to perform this action");
        }

        const {lotIds, stockContractId} = parsedData
        const contract = await contractsProvider.getStockContract(stockContractId);// check if exists!
        contract.signer = await createSigner(contract.ledger)
        const txId = await contract.registerOutgoingMaterialByLotIds(lotIds.split(","));
        console.info(`Created a new lots ${lotIds} for contract ${stockContractId}`);
        return {
            success: true,
            lotId: txId!.transaction
        };
    } catch (e: any) {
        console.error("[Error mountLot]:", e.message);
        const boom = boomify(e);
        return {error: boom.output.payload.message};
    }
}


