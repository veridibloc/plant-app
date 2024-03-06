import {UserJSON, UserWebhookEvent} from '@clerk/nextjs/server'
import db from '../../../prisma'

export async function handleUserDeletion(event: UserWebhookEvent) {
    const user = event.data as UserJSON;
    console.log(`Marking user ${user.id} as deleted:`);
    try {

        await db.account.update({
            where: {
                userId: user.id,
            },
            data: {
                status: "Deleted",
            }
        })
    } catch (e: any) {
        console.error("[User Deletion Failed]:", e.message)
        // ignore if not exists
    }
}
