'use server'

import {z} from 'zod'
import {boomify, notFound} from '@hapi/boom';
import {contractsProvider} from '@/common/contractsProvider';
import {createSigner} from '@/server/createSigner';
import {ensureAuthenticatedUser} from "@/server/ensureAuthenticatedUser";
import {MetaInfo} from "@/types/userAccount";
import {User} from "@clerk/backend";


const schema = z.object({
    materialId: z.string(),
    quantity: z.number().gt(0),
})

function assertCorrectStockContractId(stockContractId: string, user: User) {
    const userMetaData = user.publicMetadata as unknown as MetaInfo;
    if(!userMetaData.stockContracts.find(({id}) => id === stockContractId)){
        throw notFound(`Stock contract ${stockContractId} not assigned to authenticated user`);
    }
}


export async function registerMaterial(prevState: any, formData: FormData) {

    try {
        const parsedData = schema.parse({
            materialId: formData.get("materialId"),
            quantity: Number(formData.get("quantity")),
        })

        // TODO: better logging
        console.log("registerMaterial", parsedData);
        const {materialId : stockContractId, quantity} = parsedData
        const user = await ensureAuthenticatedUser();
        assertCorrectStockContractId(stockContractId, user)
        const contract = await contractsProvider.getStockContract(stockContractId);// check if exists!
        contract.signer = await createSigner(contractsProvider.ledger, user);

        const txId = await contract.registerIncomingMaterial(quantity)
        console.info(`Incoming Material for contract ${stockContractId} (quantity: ${quantity}) registered...`);
        return {success: txId!.transaction};
    } catch (e: any) {
        return {error: e.message};
    }
}
