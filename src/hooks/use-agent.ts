"use client";

import { useState, useCallback, useRef } from "react";
import { useStore } from "@/lib/store";
import { generateId } from "@/lib/utils";
import type { AgentMessage, AgentResponse } from "@/lib/agent/agent";

export function useAgent() {
  const [messages, setMessages] = useState<AgentMessage[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const [currentToolCall, setCurrentToolCall] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const project = useStore((s) => s.project);
  const onboardingData = useStore((s) => s.onboardingData);

  const context = {
    projectName: project?.name,
    projectDescription: project?.description,
    industry: onboardingData.industry,
    stage: project?.stage,
    onboardingData,
  };

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isThinking) return;

      setError(null);

      const userMsg: AgentMessage = {
        id: generateId(),
        role: "user",
        content,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setIsThinking(true);
      setCurrentToolCall("Thinking...");

      try {
        abortRef.current = new AbortController();

        const response = await fetch("/api/agent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: content,
            history: messages,
            context,
          }),
          signal: abortRef.current.signal,
        });

        if (!response.ok) {
          throw new Error(`Agent error: ${response.status}`);
        }

        const data: AgentResponse = await response.json();

        // Add tool call messages
        for (const tc of data.toolCalls) {
          const toolCallMsg: AgentMessage = {
            id: generateId(),
            role: "tool_call",
            content: `Called ${tc.name}`,
            toolCall: { name: tc.name, args: tc.args },
            timestamp: new Date().toISOString(),
          };
          setMessages((prev) => [...prev, toolCallMsg]);

          const toolResultMsg: AgentMessage = {
            id: generateId(),
            role: "tool_result",
            content: tc.result.summary,
            toolCall: { name: tc.name, args: tc.args },
            toolResult: tc.result,
            timestamp: new Date().toISOString(),
          };
          setMessages((prev) => [...prev, toolResultMsg]);
        }

        // Add assistant response
        const assistantMsg: AgentMessage = {
          id: generateId(),
          role: "assistant",
          content: data.message,
          timestamp: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, assistantMsg]);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          setError(err.message || "Something went wrong");
          const errorMsg: AgentMessage = {
            id: generateId(),
            role: "assistant",
            content: "I encountered an error. Please try again.",
            timestamp: new Date().toISOString(),
          };
          setMessages((prev) => [...prev, errorMsg]);
        }
      } finally {
        setIsThinking(false);
        setCurrentToolCall(null);
        abortRef.current = null;
      }
    },
    [messages, isThinking, context]
  );

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
    setIsThinking(false);
    setCurrentToolCall(null);
  }, []);

  const stopGeneration = useCallback(() => {
    abortRef.current?.abort();
    setIsThinking(false);
    setCurrentToolCall(null);
  }, []);

  return {
    messages,
    isThinking,
    currentToolCall,
    error,
    sendMessage,
    clearMessages,
    stopGeneration,
  };
}
