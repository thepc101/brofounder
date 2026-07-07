import { NextRequest, NextResponse } from "next/server";
import { runSpecializedAgent } from "@/lib/agent/agent";
import { getCodeGenSystemPrompt } from "@/lib/agent/prompts";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, type } = body;

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const contextStr = `Code type: ${type || "component"}
User request: ${prompt}

Generate production-quality code. Use TypeScript, Next.js 16, Tailwind CSS. Include proper types, error handling, and modern React patterns.`;

    const response = await runSpecializedAgent(contextStr, getCodeGenSystemPrompt());

    try {
      const parsed = JSON.parse(response);
      return NextResponse.json(parsed);
    } catch {
      return NextResponse.json({
        title: "Generated Code",
        type: type || "component",
        code: [
          {
            filename: "generated.tsx",
            language: "typescript",
            content: response,
          },
        ],
        instructions: "Copy the generated code into your project.",
        dependencies: [],
      });
    }
  } catch (error: any) {
    console.error("Code gen API error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate code" },
      { status: 500 }
    );
  }
}
