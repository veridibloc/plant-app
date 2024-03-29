import {LedgerClientFactory} from '@signumjs/core';
import {getEnv} from '@/server/getEnv';

export function getLedgerClient() {
    const defaultNodeUrl = (getEnv("NEXT_PUBLIC_LEDGER_HOST_URLS") || "https://europe3.testnet.signum.network").split(',')[0];
    return LedgerClientFactory.createClient({
        nodeHost: defaultNodeUrl
    })
}
