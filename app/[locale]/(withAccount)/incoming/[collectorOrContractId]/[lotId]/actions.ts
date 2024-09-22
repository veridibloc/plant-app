'use server'
import {z} from 'zod'
import {contractsProvider} from '@/common/contractsProvider';
import {boomify, notAcceptable, unauthorized} from '@hapi/boom';
import {createSigner} from '@/server/createSigner';
import {ensureAuthenticatedUser} from "@/server/ensureAuthenticatedUser";
import {BusinessPartnerSelector, StockContract} from "@veridibloc/smart-contracts";
import {fetchUserAccount} from "@/server/fetchUserAccount";
import {User} from "@clerk/backend";
import {Address, Transaction} from "@signumjs/core";
import {MetaInfo} from "@/types/userAccount";
import {parseRegisterIncomingMaterialMessage} from "@/common/transactionParser";

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
        await Promise.all([
            ensureUserIsAuthorizedPartner(user, separatorContract),
            ensureLotIdIsNotRegisteredAlready(user, lotId)
        ])

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


async function ensureUserIsAuthorizedPartner(user: User, separatorContract: StockContract) {
    const [authorizedPartners, account] = await Promise.all([
        separatorContract.getBusinessPartners(BusinessPartnerSelector.Authorized),
        fetchUserAccount(user)]
    )
    if (!account) {
        throw unauthorized();
    }
    const recyclerAccountId = Address.fromPublicKey(account.publicKey).getNumericId();
    if (!authorizedPartners.some(({accountId}) => recyclerAccountId === accountId)) {
        throw unauthorized();
    }
}

/**
 * This message checks, if an incoming lot is not pending already, or was registered elsewhere.
 * @param user
 * @param lotId
 */
async function ensureLotIdIsNotRegisteredAlready(user: User, lotId: string) {
    await Promise.all([
        ensureUserContractsHaveNotLotId(user, lotId), // no other of my contracts have this
        ensureLotIdIsNotPending(lotId), // not in transit
        ensureLotIdIsNotInRecentBlocks(lotId, 4) // was not registered elsewhere last 4 blocks
    ])
}

async function ensureUserContractsHaveNotLotId(user: User, lotId: string): Promise<void> {
    const metaInfo = (user.publicMetadata as unknown as MetaInfo) ?? {};
    const stockContractIds = metaInfo.stockContracts.map(({id}) => id)

    const ownStockContracts = await contractsProvider.getManyStockContracts(stockContractIds);

    // 1 - check if any of the contracts has the lot ID registered already (Map Key 4)
    const incomingQuantities = await Promise.all(ownStockContracts.map(c => c.getKeyMapValue(StockContract.Maps.KeyIncomingMaterial.toString(), lotId)))
    const contractHasLotAlready = incomingQuantities.some(q => Number(q) > 0);
    if (contractHasLotAlready) {
        throw unauthorized(`Lot (id: ${lotId}) was already registered`);
    }
}

async function ensureLotIdIsNotPending(lotId: string): Promise<void> {
    const {unconfirmedTransactions} = await contractsProvider.ledger.transaction.getUnconfirmedTransactions()
    if (_transactionHasIncomingMessage(unconfirmedTransactions, lotId)) {
        throw unauthorized(`Lot (id: ${lotId}) is being registered already`);
    }
}

async function ensureLotIdIsNotInRecentBlocks(lotId: string, numberOfBlocks: number): Promise<void> {
    const {blocks} = await contractsProvider.ledger.block.getBlocks(0, numberOfBlocks - 1, true)
    const lastBlocksTransactions = blocks.flatMap(b => b.transactions as Transaction[]);
    if (_transactionHasIncomingMessage(lastBlocksTransactions, lotId)) {
        throw unauthorized(`Lot (id: ${lotId}) was registered already`);
    }
}

function _transactionHasIncomingMessage(txs: Transaction[], lotId: string) {
    return txs.some(tx => {
        const incomingMaterialMessage = parseRegisterIncomingMaterialMessage(tx)
        if (!incomingMaterialMessage) {
            return false
        }
        return incomingMaterialMessage.originId === lotId
    })
}