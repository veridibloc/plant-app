import {cache} from 'react'
import {MetaInfo, UserAccount} from '@/types/userAccount';
import prisma from './prisma';
import {User} from '@clerk/backend';

const fetchAccountFromDatabase = cache( async (userId: string) => {
    console.debug("Fetching account from database...", userId);
    return prisma.account.findUnique({where: {userId}})
});

export async function fetchUserAccount(user: User, withSeed = false): Promise<UserAccount | null> {
    const account = await fetchAccountFromDatabase(user.id);

    if (!account) return null;

    const metaInfo = (user.publicMetadata as unknown as MetaInfo) ?? {};
    // being defensive
    if(!metaInfo.collectibles){
        metaInfo.collectibles = [];
    }
    if(!metaInfo.stockContracts){
        metaInfo.stockContracts = [];
    }

    return {
        email: user.emailAddresses[0].emailAddress,
        logoUrl: user.imageUrl,
        publicKey: account.publicKey,
        firstName: user.firstName ?? "",
        isActive: account.status === "Active",
        encryptedSeed: withSeed ? account.encSeed : undefined,
        ...metaInfo,
    }
}
