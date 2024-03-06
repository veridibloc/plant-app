import { Webhook } from "svix";
import { UserWebhookEvent, WebhookEvent} from "@clerk/nextjs/server";
import { handleUserCreation } from "./eventHandlers/handleUserCreation";
import { handleUserUpdate } from "./eventHandlers/handleUserUpdate";
import { handleUserDeletion } from "./eventHandlers/handleUserDeletion";
import { getEnv } from "../../../common/getEnv";
import { NextRequest, NextResponse } from "next/server";
import { headers as NextHeaders } from "next/headers";

console.log("WH", getEnv("CLERK_WEBHOOK_SECRET"));

export const handleWebhook = async (req: NextRequest) => {
  const headers = NextHeaders();
  const svix_id = headers.get("svix-id");
  const svix_timestamp = headers.get("svix-timestamp");
  const svix_signature = headers.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return NextResponse.json({ message: "No svix headers" }, { status: 400 });
  }

  let evt: WebhookEvent;
  try {
    const body = await req.json();
    const webhook = new Webhook(getEnv("CLERK_WEBHOOK_SECRET"));
    evt = webhook.verify(JSON.stringify(body), {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return NextResponse.json(
      { message: "Verification failed" },
      { status: 403 }
    );
  }

  const { id } = evt.data;
  const eventType = evt.type;

  console.log(`Webhook with and ID of ${id} and type of ${eventType}`);

  switch (evt.type) {
    case "user.created":
      await handleUserCreation(evt as UserWebhookEvent);
      break;
    case "user.updated":
      await handleUserUpdate(evt as UserWebhookEvent);
      break;
    case "user.deleted":
      await handleUserDeletion(evt as UserWebhookEvent);
      break;
    default:
      return NextResponse.json(
        { message: `Unsupported Webhook Event: ${eventType}` },
        { status: 422 }
      );
  }

  return NextResponse.json({ message: "ok" }, { status: 201 });
};
