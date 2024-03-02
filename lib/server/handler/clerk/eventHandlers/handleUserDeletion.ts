import {UserJSON, UserWebhookEvent } from '@clerk/nextjs/server'
import db from '@/server/prisma'

export async function handleUserDeletion(event: UserWebhookEvent) {
    const user = event.data as UserJSON;
    console.log(`Marking user ${user.id} as deleted:`);
    await db.account.update({
        where: {
            userId: user.id,
        },
        data: {
            status: "Deleted",
        }
    })
}
