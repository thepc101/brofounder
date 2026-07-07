import { createGroqCompletion, type GroqMessage } from "@/lib/groq";
import { getToolByName, type AgentContext, type ToolResult } from "./tools";
import { getAgentSystemPrompt } from "./prompts";

export interface AgentMessage {
  id: string;
  role: "user" | "assistant" | "tool_call" | "tool_result";
  content: string;
  toolCall?: {
    name: string;
    args: Record<string, string>;
  };
  toolResult?: ToolResult;
  timestamp: string;
}

export interface AgentResponse {
  message: string;
  toolCalls: { name: string; args: Record<string, string>; result: ToolResult }[];
  done: boolean;
}

const MAX_ITERATIONS = 8;
const TOOL_CALL_REGEX = /```tool\s*\n?(\{[\s\S]*?\})\s*\n?```/;

function parseToolCall(text: string): { name: string; args: Record<string, string> } | null {
  const match = text.match(TOOL_CALL_REGEX);
  if (!match) return null;

  try {
    const parsed = JSON.parse(match[1]);
    if (parsed.name && typeof parsed.name === "string") {
      return {
        name: parsed.name,
        args: parsed.args || {},
      };
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
  onToolCall?: (call: { name: string; args: Record<string, string> }) => void,
  onToolResult?: (result: { name: string; result: ToolResult }) => void,
  onThinking?: (text: string) => void
): Promise<AgentResponse> {
  const systemPrompt = getAgentSystemPrompt(context);

  const groqMessages: GroqMessage[] = [
    { role: "system", content: systemPrompt },
  ];

  // Convert history to Groq messages (skip tool_call/tool_result, include them as context)
  for (const msg of history) {
    if (msg.role === "user") {
      groqMessages.push({ role: "user", content: msg.content });
    } else if (msg.role === "assistant") {
      groqMessages.push({ role: "assistant", content: msg.content });
    } else if (msg.role === "tool_result" && msg.toolResult) {
      groqMessages.push({
        role: "user",
        content: `[Tool Result - ${msg.toolCall?.name || "unknown"}]:\n${msg.toolResult.summary}\n\nFull data: ${JSON.stringify(msg.toolResult.data).slice(0, 4000)}`,
      });
    }
  }

  // Add current user message
  groqMessages.push({ role: "user", content: userMessage });

  const allToolCalls: AgentResponse["toolCalls"] = [];
  let iteration = 0;
  let finalMessage = "";

  while (iteration < MAX_ITERATIONS) {
    iteration++;

    const response = await createGroqCompletion(groqMessages, {
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 4096,
    });

    // Check for tool calls
    const toolCall = parseToolCall(response);

    if (!toolCall) {
      // No tool call — this is the final response
      finalMessage = stripToolCalls(response) || response;
      break;
    }

    // Notify about tool call
    onToolCall?.(toolCall);

    // Execute the tool
    const tool = getToolByName(toolCall.name);
    let result: ToolResult;

    if (tool) {
      result = await tool.execute(toolCall.args, context);
    } else {
      result = {
        success: false,
        data: null,
        summary: `Unknown tool: ${toolCall.name}. Available tools: browse_website, search_web, analyze_competitor, research_market, validate_idea, create_persona, plan_mvp, draft_document, get_strategy, extract_leads, update_project, generate_code, analyze_page`,
      };
    }

    // Notify about result
    onToolResult?.({ name: toolCall.name, result });
    allToolCalls.push({ name: toolCall.name, args: toolCall.args, result });

    // Add the assistant's response (with tool call) and the result to messages
    groqMessages.push({ role: "assistant", content: response });
    groqMessages.push({
      role: "user",
      content: `[Tool Result - ${toolCall.name}]:\n${result.summary}\n\nFull data: ${JSON.stringify(result.data).slice(0, 4000)}\n\nNow continue with your analysis or call another tool.`,
    });

    onThinking?.(`Executed ${toolCall.name}... (${iteration}/${MAX_ITERATIONS})`);
  }

  // If we exhausted iterations without a final message
  if (!finalMessage) {
    finalMessage = "I've completed my analysis. Here's what I found based on the research I conducted.";
  }

  return {
    message: finalMessage,
    toolCalls: allToolCalls,
    done: true,
  };
}

// Simplified version for document/marketing/code generation
export async function runSpecializedAgent(
  userMessage: string,
  systemPrompt: string,
  context?: AgentContext
): Promise<string> {
  const groqMessages: GroqMessage[] = [
    { role: "system", content: systemPrompt },
    { role: "user", content: userMessage },
  ];

  return await createGroqCompletion(groqMessages, {
    model: "llama-3.3-70b-versatile",
    temperature: 0.7,
    max_tokens: 8192,
  });
}
