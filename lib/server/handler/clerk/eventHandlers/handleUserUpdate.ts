import { UserWebhookEvent, UserJSON } from '@clerk/nextjs/server'
import db from '@/server/prisma'

export async function handleUserUpdate(event: UserWebhookEvent) {
    const user = event.data as UserJSON;
    console.log("Updating user:", user.id);
    await db.account.update({
        where: {
            userId: user.id,
        },
        data: {
            status: user.banned ? "Inactive" : "Active",
        }
    })
}
