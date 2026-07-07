import { NextRequest, NextResponse } from "next/server";
import { createGroqCompletion, type GroqMessage } from "@/lib/groq";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { onboardingData } = body;

    const systemPrompt = `You are brofounder, an AI co-founder. Generate an initial workspace for a new founder based on their onboarding data.

Return a JSON object with this shape:
{
  "message": "A welcome message for the founder",
  "sections": [
    { "id": "unique-id", "title": "Section Title", "content": "Detailed content based on the founder's inputs", "type": "summary|problem|solution|icp|market|competition|pricing|gtm|risks|next-steps", "editable": true }
  ]
}

Generate 5-7 sections that are most relevant to the founder's stage and goals.`;

    const userMessage = `Onboarding data: ${JSON.stringify(onboardingData)}

Generate the initial workspace. Respond with JSON only.`;

    const groqMessages: GroqMessage[] = [
      { role: "system", content: systemPrompt },
      { role: "user", content: userMessage },
    ];

    const response = await createGroqCompletion(groqMessages);

    try {
      const parsed = JSON.parse(response);
      return NextResponse.json(parsed);
    } catch {
      // Generate default sections if parsing fails
      const defaultSections = [
        { id: "s1", title: "Welcome to brofounder", content: "Your workspace has been created. Ask your AI co-founder anything about your startup.", type: "summary", editable: true },
        { id: "s2", title: "Getting Started", content: "1. Explore the dashboard for an overview\n2. Use the workspace to chat with your AI co-founder\n3. Run research to understand your market\n4. Validate your idea\n5. Plan your MVP", type: "next-steps", editable: true },
      ];

      return NextResponse.json({
        message: "Welcome to brofounder! Your workspace is ready.",
        sections: defaultSections,
      });
    }
  } catch (error) {
    console.error("Onboarding API error:", error);
    return NextResponse.json(
      { error: "Failed to process onboarding" },
      { status: 500 }
    );
  }
}
