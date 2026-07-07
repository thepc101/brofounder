import { NextRequest, NextResponse } from "next/server";
import { runAgent, type AgentMessage } from "@/lib/agent/agent";
import type { AgentContext } from "@/lib/agent/tools";
import type { AISettingsQuality } from "@/lib/store";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, history, context, quality } = body as {
      message: string;
      history: AgentMessage[];
      context?: AgentContext;
      quality?: AISettingsQuality;
    };

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const result = await runAgent(message, history || [], context, quality || "medium");

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Agent API error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process request" },
      { status: 500 }
    );
  }
}
