'use server'
import {z} from 'zod'
import {contractsProvider} from '@/common/contractsProvider';
import {boomify, unauthorized} from '@hapi/boom';
import {createSigner} from '@/server/createSigner';
import {ensureAuthenticatedUser} from "@/server/ensureAuthenticatedUser";

const schema = z.object({
    lotId: z.string().regex(/^\d{10,24}$/), // single ID
    stockContractId: z.string().regex(/^\d{10,24}$/),
    weight: z.number().gt(0),
})


export async function createLotByLotIdAndWeight(prevState: any, formData: FormData) {
    try {
        const parsedData = schema.parse({
            weight: formData.get("weight"),
            lotId: formData.get("lotId"),
            stockContractId: formData.get("stockContractId"),
        })

        const user = await ensureAuthenticatedUser();
        if (user.publicMetadata.role !== 'converter') {
            throw unauthorized("You are not authorized to perform this action");
        }

        const {lotId, stockContractId, weight} = parsedData
        const contract = await contractsProvider.getStockContract(stockContractId);// check if exists!
        contract.signer = await createSigner(contract.ledger)
        const txId = await contract.registerOutgoingMaterialByLotIdAndQuantity(lotId, weight);
        console.info(`Created a new lot (id: ${txId!.transaction}) from ${lotId} with quantity ${weight} for contract ${stockContractId}`);
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


