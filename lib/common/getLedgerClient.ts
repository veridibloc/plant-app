import {Ledger, LedgerClientFactory} from '@signumjs/core';
import {getEnv} from './getEnv';

export function getLedgerClient() {
    const defaultNodeUrl = (process.env.NEXT_PUBLIC_LEDGER_HOST_URLS || "https://europe3.testnet.signum.network").split(',')[0];
    return LedgerClientFactory.createClient({
        nodeHost: defaultNodeUrl
    }) as Ledger
}
