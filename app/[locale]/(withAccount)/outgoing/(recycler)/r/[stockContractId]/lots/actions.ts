'use server'
import {z, ZodError} from 'zod'
import {contractsProvider} from '@/common/contractsProvider';
import {badRequest, boomify, notFound, unauthorized} from '@hapi/boom';
import {createSigner} from '@/server/createSigner';
import {ensureAuthenticatedUser} from "@/server/ensureAuthenticatedUser";

const schema = z.object({
    lotIds: z.string().regex(/^(\d{10,24},)*\d{10,24}$/), // concatenated ids
    separatorContractId: z.string(),
    stockContractId: z.string(),
})


export async function createLotByLotIds(prevState: any, formData: FormData) {
    try {
        const parsedData = schema.parse({
            lotIds: formData.get("lotIds"),
            separatorContractId: formData.get("separatorContractId"),
            stockContractId: formData.get("stockContractId"),
        })

        const lotIdsArray = parsedData.lotIds.split(",");
        console.log(parsedData)

        await new Promise(resolve => setTimeout(resolve, 2000))

        // const {materialContractId, weight} = parsedData
        // const contract = await contractsProvider.getStockContract(materialContractId);// check if exists!
        // contract.signer = await createSigner(contract.ledger)
        //
        // const {stockQuantity} = contract.getData();
        // if(stockQuantity < weight){
        //     throw new Error("Not enough material in stock");
        // }
        //
        // const txId = await contract.registerOutgoingMaterialByWeight(weight);
        // console.info(`Created a lot of weight ${weight} kg for contract ${materialContractId}`);
        const txId = { transaction: "testid"}
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


