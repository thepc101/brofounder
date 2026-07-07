import { NextRequest, NextResponse } from "next/server";
import { createGroqCompletion, type GroqMessage } from "@/lib/groq";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages, system } = body as {
      messages: { role: string; content: string }[];
      system?: string;
    };

    const groqMessages: GroqMessage[] = [
      {
        role: "system",
        content: system || "You are brofounder, an AI co-founder that helps startup founders build their businesses. Be concise, practical, and actionable. Provide structured, formatted responses.",
      },
      ...messages.map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
    ];

    const response = await createGroqCompletion(groqMessages);

    return NextResponse.json({ content: response });
  } catch (error) {
    console.error("AI API error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
