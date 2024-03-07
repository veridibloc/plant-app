import {cache} from 'react'
import {MetaInfo, UserAccount} from '@/types/userAccount';
import {MaterialInfo} from '@/types/materialInfo';
import prisma from './prisma';
import {User} from '@clerk/backend';
export const fetchUserAccount = cache(async (user: User, withSeed = false): Promise<UserAccount | null> => {
    const account = await prisma.account.findUnique({where: {userId: user.id}})

    if (!account) return null;

    const metaInfo = (user.publicMetadata as unknown as MetaInfo) ?? {};
    // being defensive
    if(!metaInfo.collectible){
        metaInfo.collectible = [];
    }
    if(!metaInfo.stockContracts){
        metaInfo.stockContracts= [];
    }

    return {
        email: user.emailAddresses[0].emailAddress,
        publicKey: account.publicKey,
        firstName: user.firstName ?? "",
        isActive: account.status === "Active",
        encryptedSeed: withSeed ? account.encSeed : undefined,
        ...metaInfo,
    }
})
