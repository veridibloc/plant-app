import {notFound, unauthorized} from '@hapi/boom';
import {getEnv} from '@/common/getEnv';
import {generateMasterKeys} from '@signumjs/crypto';
import {NonSecureSigner} from '@veridibloc/smart-contracts';
import {currentUser} from '@clerk/nextjs';
import {Ledger} from '@signumjs/core';
import {decrypt} from './crypto';
import {fetchUserAccount} from './fetchUserAccount';
import {User} from "@clerk/backend";

export async function createSigner(ledger: Ledger, u: User | null = null) {
    let user = u;
    if (!user) {
        user = await currentUser();
        if(!user){
            throw unauthorized();
        }
    }

    const userAccount = await fetchUserAccount(user, true)
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

    return new NonSecureSigner({
        ledger,
        publicKey,
        privateKey: signPrivateKey
    })
}
