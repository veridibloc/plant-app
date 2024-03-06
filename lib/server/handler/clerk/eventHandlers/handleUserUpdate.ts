import { UserWebhookEvent, UserJSON } from '@clerk/nextjs/server'
import db from '../../../prisma'

export async function handleUserUpdate(event: UserWebhookEvent) {
    const user = event.data as UserJSON;
    console.log("Updating user:", user.id);
    try {

        await db.account.update({
        where: {
            userId: user.id,
        },
        data: {
            status: user.banned ? "Inactive" : "Active",
        }
    })
    } catch (e: any) {
        console.error("[User Update Failed]:", e.message)
        // ignore if not exists
    }
}
