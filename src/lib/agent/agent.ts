import { createGroqCompletion, type GroqMessage } from "@/lib/groq";
import { getToolByName, type AgentContext, type ToolResult } from "./tools";
import { getAgentSystemPrompt } from "./prompts";
import type { AISettingsQuality } from "@/lib/store";

export interface AgentMessage {
  id: string;
  role: "user" | "assistant" | "tool_call" | "tool_result";
  content: string;
  toolCall?: { name: string; args: Record<string, string> };
  toolResult?: ToolResult;
  timestamp: string;
}

export interface AgentResponse {
  message: string;
  toolCalls: { name: string; args: Record<string, string>; result: ToolResult }[];
  done: boolean;
}

function getQualityConfig(quality: AISettingsQuality) {
  switch (quality) {
    case "high":
      return { model: "llama-3.3-70b-versatile", temperature: 0.7, max_tokens: 8192, maxIterations: 10 };
    case "medium":
      return { model: "llama-3.3-70b-versatile", temperature: 0.7, max_tokens: 4096, maxIterations: 6 };
    case "low":
      return { model: "mixtral-8x7b-32768", temperature: 0.5, max_tokens: 2048, maxIterations: 3 };
  }
}

const TOOL_CALL_REGEX = /```tool\s*\n?(\{[\s\S]*?\})\s*\n?```/;

function parseToolCall(text: string): { name: string; args: Record<string, string> } | null {
  const match = text.match(TOOL_CALL_REGEX);
  if (!match) return null;
  try {
    const parsed = JSON.parse(match[1]);
    if (parsed.name && typeof parsed.name === "string") {
      return { name: parsed.name, args: parsed.args || {} };
    }
  } catch {}
  return null;
}

function stripToolCalls(text: string): string {
  return text.replace(TOOL_CALL_REGEX, "").trim();
}

export async function runAgent(
  userMessage: string,
  history: AgentMessage[],
  context?: AgentContext,
  quality: AISettingsQuality = "medium",
  onToolCall?: (call: { name: string; args: Record<string, string> }) => void,
  onToolResult?: (result: { name: string; result: ToolResult }) => void,
  onThinking?: (text: string) => void
): Promise<AgentResponse> {
  const config = getQualityConfig(quality);
  const systemPrompt = getAgentSystemPrompt(context);

  const groqMessages: GroqMessage[] = [
    { role: "system", content: systemPrompt },
  ];

  // Build conversation context — keep last N messages based on quality
  const contextWindow = quality === "high" ? 20 : quality === "medium" ? 12 : 6;
  const recentHistory = history.slice(-contextWindow);

  for (const msg of recentHistory) {
    if (msg.role === "user") {
      groqMessages.push({ role: "user", content: msg.content });
    } else if (msg.role === "assistant") {
      groqMessages.push({ role: "assistant", content: msg.content });
    } else if (msg.role === "tool_result" && msg.toolResult) {
      groqMessages.push({
        role: "user",
        content: `[Tool Result - ${msg.toolCall?.name || "unknown"}]:\n${msg.toolResult.summary}`,
      });
    }
  }

  groqMessages.push({ role: "user", content: userMessage });

  const allToolCalls: AgentResponse["toolCalls"] = [];
  let iteration = 0;
  let finalMessage = "";

  while (iteration < config.maxIterations) {
    iteration++;
    onThinking?.(iteration === 1 ? "Thinking..." : `Running tool ${iteration}/${config.maxIterations}...`);

    const response = await createGroqCompletion(groqMessages, {
      model: config.model,
      temperature: config.temperature,
      max_tokens: config.max_tokens,
    });

    const toolCall = parseToolCall(response);

    if (!toolCall) {
      finalMessage = stripToolCalls(response) || response;
      break;
    }

    onToolCall?.(toolCall);

    const tool = getToolByName(toolCall.name);
    let result: ToolResult;

    if (tool) {
      result = await tool.execute(toolCall.args, context);
    } else {
      result = { success: false, data: null, summary: `Unknown tool: ${toolCall.name}` };
    }

    onToolResult?.({ name: toolCall.name, result });
    allToolCalls.push({ name: toolCall.name, args: toolCall.args, result });

    groqMessages.push({ role: "assistant", content: response });
    groqMessages.push({
      role: "user",
      content: `[Tool Result - ${toolCall.name}]:\n${result.summary}\n\nContinue with your analysis.`,
    });
  }

  if (!finalMessage) {
    finalMessage = "Analysis complete. Here's what I found based on the research conducted.";
  }

  return { message: finalMessage, toolCalls: allToolCalls, done: true };
}

export async function runSpecializedAgent(
  userMessage: string,
  systemPrompt: string,
  context?: AgentContext,
  quality: AISettingsQuality = "medium"
): Promise<string> {
  const config = getQualityConfig(quality);
  const groqMessages: GroqMessage[] = [
    { role: "system", content: systemPrompt },
    { role: "user", content: userMessage },
  ];
  return await createGroqCompletion(groqMessages, {
    model: config.model,
    temperature: config.temperature,
    max_tokens: config.max_tokens,
  });
}
