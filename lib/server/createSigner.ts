import {notFound, unauthorized, notAcceptable} from '@hapi/boom';
import {getEnv} from '@/common/getEnv';
import {generateMasterKeys} from '@signumjs/crypto';
import {NonSecureSigner} from '@veridibloc/smart-contracts';
import {currentUser} from '@clerk/nextjs';
import {Address, Ledger} from '@signumjs/core';
import {decrypt} from './crypto';
import {fetchUserAccount} from './fetchUserAccount';
import {User} from "@clerk/backend";
import {Amount} from "@signumjs/util";

export async function createSigner(ledger: Ledger, u: User | null = null) {
    let user = u;
    if (!user) {
        user = await currentUser();
        if(!user){
            throw unauthorized();
        }
    }

    const userAccount = await fetchUserAccount( user, true);
    if (!userAccount) {
        throw notFound("User Account not found!")
    }
    const seed = decrypt(userAccount.encryptedSeed ?? "", getEnv("AES_SECRET"))
    const {
        publicKey,
        signPrivateKey,
    } = generateMasterKeys(seed)

    if (publicKey.toLowerCase() !== userAccount.publicKey.toLowerCase()) {
        throw unauthorized("Public Key Mismatch");
    }
    const address = Address.fromPublicKey(publicKey);
    const  account = await ledger.account.getAccount({accountId:address.getNumericId(), includeCommittedAmount: false, includeEstimatedCommitment: false});
    if(Amount.fromPlanck(account.guaranteedBalanceNQT).less(Amount.fromSigna(3))){
        throw notAcceptable("Insufficient funds")
    }

    return new NonSecureSigner({
        ledger,
        publicKey,
        privateKey: signPrivateKey
    })
}
