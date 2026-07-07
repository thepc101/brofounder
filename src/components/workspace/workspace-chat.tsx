"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Loader2,
  BrainCircuit,
  Trash2,
  StopCircle,
  Sparkles,
  Globe,
  Search,
  BarChart3,
  Lightbulb,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAgent } from "@/hooks/use-agent";
import { ToolCallCard } from "./tool-call-card";
import { cn } from "@/lib/utils";

const suggestions = [
  { icon: Globe, label: "Browse my competitor's website", prompt: "Browse https://notion.so and analyze what they do well and where they're weak" },
  { icon: Search, label: "Research the AI SaaS market", prompt: "Research the AI SaaS market size, trends, and key players in 2025" },
  { icon: BarChart3, label: "Analyze this market", prompt: "Analyze the market for AI-powered productivity tools. Who are the top 5 players? What's the TAM?" },
  { icon: Lightbulb, label: "Validate my idea", prompt: "Validate my idea: An AI-powered async communication platform for remote teams. Is there demand?" },
];

export function WorkspaceChat() {
  const { messages, isThinking, currentToolCall, error, sendMessage, clearMessages, stopGeneration } =
    useAgent();
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || isThinking) return;
    sendMessage(input.trim());
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-2.5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/[0.06]">
            <BrainCircuit size={14} className="text-white/70" />
          </div>
          <div>
            <span className="text-sm font-medium">AI Co-Founder</span>
            <div className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span className="text-[10px] text-white/40">Online</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {messages.length > 0 && (
            <Button
              variant="ghost"
              size="icon"
              onClick={clearMessages}
              className="h-7 w-7 text-white/40 hover:text-white/70"
            >
              <Trash2 size={13} />
            </Button>
          )}
        </div>
      </div>

      {/* Messages */}
      <ScrollArea ref={scrollRef} className="flex-1">
        <div className="p-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.04]">
                <Sparkles size={20} className="text-white/40" />
              </div>
              <h3 className="text-sm font-medium text-white/70">What can I help you build?</h3>
              <p className="mt-1 max-w-xs text-xs text-white/30">
                I can browse websites, research markets, analyze competitors, validate ideas, and
                create documents.
              </p>

              <div className="mt-6 grid w-full max-w-md grid-cols-2 gap-2">
                {suggestions.map((s) => (
                  <button
                    key={s.label}
                    onClick={() => {
                      setInput(s.prompt);
                      textareaRef.current?.focus();
                    }}
                    className="group flex items-start gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] p-2.5 text-left transition-all hover:border-white/[0.12] hover:bg-white/[0.04]"
                  >
                    <s.icon
                      size={14}
                      className="mt-0.5 shrink-0 text-white/30 transition-colors group-hover:text-white/50"
                    />
                    <span className="text-[11px] text-white/40 group-hover:text-white/60">
                      {s.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <AnimatePresence mode="popLayout">
                {messages.map((msg) => {
                  if (msg.role === "tool_call" && msg.toolCall) {
                    return (
                      <ToolCallCard
                        key={msg.id}
                        toolName={msg.toolCall.name}
                        args={msg.toolCall.args}
                        isPending
                      />
                    );
                  }

                  if (msg.role === "tool_result" && msg.toolCall) {
                    return (
                      <ToolCallCard
                        key={msg.id}
                        toolName={msg.toolCall.name}
                        args={msg.toolCall.args}
                        result={msg.toolResult}
                      />
                    );
                  }

                  return (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className={cn(
                        "flex",
                        msg.role === "user" ? "justify-end" : "justify-start"
                      )}
                    >
                      <div
                        className={cn(
                          "max-w-[85%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed",
                          msg.role === "user"
                            ? "bg-white/[0.08] text-white/90"
                            : "text-white/70"
                        )}
                      >
                        <div className="whitespace-pre-wrap">{msg.content}</div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {/* Thinking indicator */}
              {isThinking && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-xs text-white/30"
                >
                  <Loader2 size={12} className="animate-spin" />
                  <span>{currentToolCall || "Thinking..."}</span>
                </motion.div>
              )}

              {error && (
                <div className="rounded-lg border border-red-500/20 bg-red-500/[0.05] px-3 py-2 text-xs text-red-400">
                  {error}
                </div>
              )}
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="border-t border-white/[0.06] p-3">
        <div className="flex items-end gap-2">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything — I can browse, research, analyze, and build..."
            className="min-h-[40px] max-h-[120px] resize-none rounded-xl border-white/[0.08] bg-white/[0.03] text-sm placeholder:text-white/20 focus:border-white/[0.15] focus:ring-white/[0.1]"
            rows={1}
          />
          {isThinking ? (
            <Button
              size="icon"
              onClick={stopGeneration}
              className="shrink-0 rounded-xl bg-white/[0.08] text-white/60 hover:bg-white/[0.12]"
            >
              <StopCircle size={16} />
            </Button>
          ) : (
            <Button
              size="icon"
              onClick={handleSend}
              disabled={!input.trim()}
              className="shrink-0 rounded-xl bg-white/[0.08] text-white/60 hover:bg-white/[0.12] disabled:opacity-30"
            >
              <ArrowRight size={16} />
            </Button>
          )}
        </div>
        <p className="mt-1.5 text-[10px] text-white/20">
          Enter to send · Shift+Enter for new line · I can browse websites, research, and take
          action
        </p>
      </div>
    </div>
  );
}
