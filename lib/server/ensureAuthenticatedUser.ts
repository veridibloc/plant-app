"use server";
import { currentUser} from "@clerk/nextjs";
import {unauthorized}  from "@hapi/boom"
export async function ensureAuthenticatedUser() {
    const user = await currentUser()
    if(!user){
        throw unauthorized();
    }
    return user;
}