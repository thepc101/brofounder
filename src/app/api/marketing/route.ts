import { NextRequest, NextResponse } from "next/server";
import { runSpecializedAgent } from "@/lib/agent/agent";
import { getMarketingSystemPrompt } from "@/lib/agent/prompts";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, projectName, industry } = body;

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const contextStr = `Project: ${projectName || "Startup"}\nIndustry: ${industry || "General"}\n\nUser request: ${prompt}`;

    const response = await runSpecializedAgent(contextStr, getMarketingSystemPrompt());

    // Try to parse as JSON
    try {
      const parsed = JSON.parse(response);
      return NextResponse.json(parsed);
    } catch {
      return NextResponse.json({
        title: "Marketing Plan",
        sections: [
          {
            id: "plan-1",
            title: "Marketing Strategy",
            content: response,
            type: "positioning",
            editable: true,
          },
        ],
      });
    }
  } catch (error: any) {
    console.error("Marketing API error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate marketing plan" },
      { status: 500 }
    );
  }
}
