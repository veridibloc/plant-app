'use server'
import {z, ZodError} from 'zod'
import {contractsProvider} from '@/common/contractsProvider';
import {badRequest, boomify, notFound, unauthorized} from '@hapi/boom';
import {createSigner} from '@/server/createSigner';
import {ensureAuthenticatedUser} from "@/server/ensureAuthenticatedUser";

const schema = z.object({
    materialContractId: z.string(),
    weight: z.number().gt(0),
})


export async function createLotByWeight(prevState: any, formData: FormData) {
    try {
        const parsedData = schema.parse({
            materialContractId: formData.get("materialId"),
            weight: Number(formData.get("weight")),
        })

        const {materialContractId, weight} = parsedData
        const contract = await contractsProvider.getStockContract(materialContractId);// check if exists!
        contract.signer = await createSigner(contract.ledger)

        const {stockQuantity} = contract.getData();
        if(stockQuantity < weight){
            throw new Error("Not enough material in stock");
        }

        const txId = await contract.registerOutgoingMaterialByWeight(weight);
        console.info(`Created a lot of weight ${weight} kg for contract ${materialContractId}`);
        return {success: txId!.transaction};
    } catch (e: any) {
        console.error("[Error mountLot]:", e.message);
        const boom = boomify(e);
        return {error: boom.output.payload.message};
    }
}


