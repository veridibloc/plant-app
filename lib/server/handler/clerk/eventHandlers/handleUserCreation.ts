import {UserWebhookEvent, UserJSON} from '@clerk/nextjs/server'
import {generateMasterKeys} from '@signumjs/crypto';
import {Address, AttachmentMessage, LedgerClientFactory} from '@signumjs/core';
import {getEnv} from '@/server/getEnv';
import {createBip39Seed, encrypt} from '@/server/crypto';
import db from '@/server/prisma'
import {Amount} from '@signumjs/util';
import {getLedgerClient} from '@/server/getLedgerClient';


/*
{
  "data": {
    "birthday": "",
    "created_at": 1654012591514,
    "email_addresses": [
      {
        "email_address": "example@example.org",
        "id": "idn_29w83yL7CwVlJXylYLxcslromF1",
        "linked_to": [],
        "object": "email_address",
        "verification": {
          "status": "verified",
          "strategy": "ticket"
        }
      }
    ],
    "external_accounts": [],
    "external_id": "567772",
    "first_name": "Example",
    "gender": "",
    "id": "user_29w83sxmDNGwOuEthce5gg56FcC",
    "image_url": "https://img.clerk.com/xxxxxx",
    "last_name": "Example",
    "last_sign_in_at": 1654012591514,
    "object": "user",
    "password_enabled": true,
    "phone_numbers": [],
    "primary_email_address_id": "idn_29w83yL7CwVlJXylYLxcslromF1",
    "primary_phone_number_id": null,
    "primary_web3_wallet_id": null,
    "private_metadata": {},
    "profile_image_url": "https://www.gravatar.com/avatar?d=mp",
    "public_metadata": {},
    "two_factor_enabled": false,
    "unsafe_metadata": {},
    "updated_at": 1654012591835,
    "username": null,
    "web3_wallets": []
  },
  "object": "event",
  "type": "user.created"
}
 */
export async function handleUserCreation(event: UserWebhookEvent) {
    const user = event.data as UserJSON;
    const seed = createBip39Seed();
    const encryptedSeed = encrypt(seed, getEnv('AES_SECRET')) as string;
    const {publicKey} = generateMasterKeys(seed);
    const address = Address.fromPublicKey(publicKey);
    console.info("Creating account: ", user.email_addresses[0].email_address, user.id);
    await db.account.create({
        data: {
            userId: user.id,
            accountId: address.getNumericId(),
            encSeed: encryptedSeed,
            publicKey,
            status: 'Active'
        }
    })
    console.info("Activating Account: ",address.getReedSolomonAddress(false), user.id);
    await activateLedgerAccount(address);
    console.log("User successfully created", address.getNumericId());
}

async function activateLedgerAccount(address: Address) {
    const ledger = getLedgerClient();
    const {publicKey, signPrivateKey} = generateMasterKeys(getEnv('VERIDIBLOC_ACTIVATION_ACCOUNT_SEED'))
    return ledger.transaction.sendAmountToSingleRecipient({
        amountPlanck: Amount.fromSigna(getEnv('ACTIVATION_AMOUNT_SIGNA') || '0.01').getPlanck(),
        feePlanck: Amount.fromSigna(0.02).getPlanck(),
        recipientId: address.getNumericId(),
        recipientPublicKey: address.getPublicKey(),
        senderPublicKey:publicKey,
        senderPrivateKey:signPrivateKey,
        attachment: new AttachmentMessage({
            message: 'Bem vindo à Veridibloc! Uma nova era de reciclagem começou! ♻️ - Movido pelo blockchain ecológico Signum.',
            messageIsText: true
        })
    })

}
