import { getAIResponseStream } from "@/utils/aiClient";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { systemPrompt, userPrompt } = await req.json();
  const token = cookies().get("token");

  if (!token) {
    return new Response("Unauthorized", { status: 401 });
  }

  if (!userPrompt) {
    return NextResponse.json({ error: "User prompt is required" }, { status: 400 });
  }

  const stream = new ReadableStream({
    async start(controller) {
      try {
        await getAIResponseStream(systemPrompt, userPrompt, (chunk) => {
          controller.enqueue(new TextEncoder().encode(chunk));
        });
      } catch (error) {
        console.error("Error streaming AI response:", error);
        controller.error(error);
      } finally {
        controller.close();
      }
    },
  });

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
