import { NextRequest } from "next/server";
import { handleWebhook } from "@/server/handler/clerk/handleWebhook";

export async function POST(req: NextRequest) {
  return handleWebhook(req);
}
