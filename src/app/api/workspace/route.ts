import { NextRequest, NextResponse } from "next/server";
import { createGroqCompletion, type GroqMessage } from "@/lib/groq";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, projectContext, existingSections, regenerateSection } = body;

    const systemPrompt = `You are brofounder, an AI co-founder. You help startup founders build their businesses.

Your responses should be structured as JSON with this shape:
{
  "message": "Your conversational response to the user",
  "sections": [
    { "id": "unique-id", "title": "Section Title", "content": "Section content here", "type": "summary|problem|solution|icp|market|competition|pricing|gtm|risks|next-steps", "editable": true }
  ]
}

Generate relevant sections based on what the user asks. Each section should be substantive and actionable.`;

    const userMessage = `Project context: ${JSON.stringify(projectContext || {})}
${existingSections ? `Existing sections: ${JSON.stringify(existingSections)}` : ""}
${regenerateSection ? `Regenerate section: ${regenerateSection}` : ""}

User message: ${message}

Respond with JSON only.`;

    const groqMessages: GroqMessage[] = [
      { role: "system", content: systemPrompt },
      { role: "user", content: userMessage },
    ];

    const response = await createGroqCompletion(groqMessages, {
      temperature: 0.7,
      max_tokens: 4096,
    });

    // Try to parse JSON response, with fallback
    try {
      const parsed = JSON.parse(response);
      return NextResponse.json(parsed);
    } catch {
      // If not valid JSON, return as plain message
      return NextResponse.json({
        message: response,
        sections: [],
      });
    }
  } catch (error) {
    console.error("Workspace API error:", error);
    return NextResponse.json(
      { error: "Failed to process workspace request" },
      { status: 500 }
    );
  }
}
