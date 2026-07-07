import { NextRequest, NextResponse } from "next/server";
import { runSpecializedAgent } from "@/lib/agent/agent";
import { getDocumentSystemPrompt } from "@/lib/agent/prompts";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, type, projectName, industry, onboardingData } = body;

    if (!prompt || !type) {
      return NextResponse.json({ error: "Prompt and type are required" }, { status: 400 });
    }

    const contextStr = `Document type: ${type}
Project: ${projectName || "Startup"}
Industry: ${industry || "General"}
${onboardingData ? `Context: ${JSON.stringify(onboardingData)}` : ""}

User request: ${prompt}

Generate a complete, professional ${type} document. Structure it with clear sections, use specific numbers and data where possible, and make it investor-ready.`;

    const response = await runSpecializedAgent(contextStr, getDocumentSystemPrompt());

    try {
      const parsed = JSON.parse(response);
      return NextResponse.json(parsed);
    } catch {
      return NextResponse.json({
        title: `${type.charAt(0).toUpperCase() + type.slice(1).replace(/-/g, " ")}`,
        type,
        sections: [
          {
            id: "doc-1",
            title: "Document",
            content: response,
            type: "overview",
            editable: true,
          },
        ],
      });
    }
  } catch (error: any) {
    console.error("Document API error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate document" },
      { status: 500 }
    );
  }
}
