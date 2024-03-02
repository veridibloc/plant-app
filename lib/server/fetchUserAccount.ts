import { cache } from "react";
import { User } from "@clerk/backend";
import prisma from "@/server/prisma";

export const fetchUserAccount = cache(
  async (user: User): Promise<{ id: string; pk: string } | null> => {
    const userId = user.id;

    const account = await prisma.account.findUnique({
      where: {
        userId,
      },
    });

    if (!account) {
      console.error(`Account for userId [${userId}] not found`);
      return null;
    }

    return {
      id: account.accountId,
      pk: account.publicKey,
    };
  }
);
