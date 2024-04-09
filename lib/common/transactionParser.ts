import {Transaction} from "@signumjs/core";
import {convertHexEndianess, convertHexStringToDecString} from "@signumjs/util";

export function parseRegisterIncomingMaterialMessage(transaction: Transaction) {
    if (
        transaction?.attachment &&
        transaction.attachment.message &&
        transaction.attachment.messageIsText === false &&
        transaction.attachment.message.substring(0, 16) === "0100000000000000"
    ) {
        const quantityHex = transaction.attachment.message.substring(16, 32);
        const originIdHex = transaction.attachment.message.substring(32, 48);
        return {
            quantity: Number(convertHexStringToDecString(convertHexEndianess(quantityHex))),
            originId: convertHexStringToDecString(
                convertHexEndianess(originIdHex)
            ),
        };
    }
    return null;
}

export function parseGrantTokenMessage(transaction: Transaction) {
    if (
        transaction?.attachment &&
        transaction.attachment.message &&
        transaction.attachment.messageIsText === false
    ) {
        const materialIdHex = transaction.attachment.message.substring(0, 16);
        const quantityHex = transaction.attachment.message.substring(16, 32);
        const collectorIdHex = transaction.attachment.message.substring(32, 48);

        return {
            materialId: convertHexStringToDecString(
                convertHexEndianess(materialIdHex)
            ),
            quantity: convertHexStringToDecString(convertHexEndianess(quantityHex)),
            collectorId: convertHexStringToDecString(
                convertHexEndianess(collectorIdHex)
            ),
        };
    }
    return null;
}
