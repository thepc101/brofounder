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
  Plus,
  MessageSquare,
  MoreHorizontal,
  Pencil,
  X,
  ChevronDown,
  Zap,
  Gauge,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAgent } from "@/hooks/use-agent";
import { ToolCallCard } from "./tool-call-card";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import type { AISettingsQuality } from "@/lib/store";

const suggestions = [
  { icon: Globe, label: "Browse a website", prompt: "Browse https://vercel.com and analyze their product strategy" },
  { icon: Search, label: "Research a market", prompt: "Research the AI SaaS market size, trends, and key players in 2025" },
  { icon: BarChart3, label: "Analyze competitors", prompt: "Analyze the top 5 project management tools and find gaps" },
  { icon: Lightbulb, label: "Validate my idea", prompt: "Validate my idea: An AI-powered async communication platform for remote teams" },
];

const qualityOptions: { value: AISettingsQuality; label: string; desc: string }[] = [
  { value: "high", label: "High", desc: "Best model, deeper analysis, more tools" },
  { value: "medium", label: "Medium", desc: "Balanced speed and quality" },
  { value: "low", label: "Fast", desc: "Quick responses, lighter analysis" },
];

export function WorkspaceChat() {
  const { messages, isThinking, currentToolCall, error, sendMessage, clearMessages, stopGeneration } =
    useAgent();
  const [input, setInput] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const [editingTitle, setEditingTitle] = useState<string | null>(null);
  const [titleValue, setTitleValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const conversations = useStore((s) => s.conversations);
  const activeConversationId = useStore((s) => s.activeConversationId);
  const createConversation = useStore((s) => s.createConversation);
  const setActiveConversation = useStore((s) => s.setActiveConversation);
  const deleteConversation = useStore((s) => s.deleteConversation);
  const renameConversation = useStore((s) => s.renameConversation);
  const aiQuality = useStore((s) => s.aiQuality);
  const setAiQuality = useStore((s) => s.setAiQuality);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || isThinking) return;
    // Auto-create conversation if none active
    if (!activeConversationId) {
      createConversation();
    }
    sendMessage(input.trim());
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const startRename = (id: string, currentTitle: string) => {
    setEditingTitle(id);
    setTitleValue(currentTitle);
  };

  const saveRename = (id: string) => {
    if (titleValue.trim()) {
      renameConversation(id, titleValue.trim());
    }
    setEditingTitle(null);
  };

  return (
    <div className="flex h-full">
      {/* History Sidebar */}
      <div
        className={cn(
          "flex flex-col border-r border-white/10 bg-white/[0.01] transition-all duration-300",
          showHistory ? "w-56" : "w-0 overflow-hidden"
        )}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-3 py-2.5">
          <span className="text-[11px] font-medium text-white/40">History</span>
          <button
            onClick={() => setShowHistory(false)}
            className="rounded p-0.5 text-white/20 hover:text-white/40"
          >
            <X size={12} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-1.5">
          {conversations.length === 0 ? (
            <p className="px-2 py-4 text-center text-[11px] text-white/20">No conversations yet</p>
          ) : (
            <div className="space-y-0.5">
              {conversations.map((conv) => (
                <div
                  key={conv.id}
                  className={cn(
                    "group flex items-center gap-1.5 rounded-lg px-2 py-1.5 transition-all",
                    conv.id === activeConversationId
                      ? "bg-white/[0.06] text-white/70"
                      : "text-white/30 hover:bg-white/[0.03] hover:text-white/50"
                  )}
                >
                  <button
                    onClick={() => setActiveConversation(conv.id)}
                    className="flex min-w-0 flex-1 items-center gap-1.5"
                  >
                    <MessageSquare size={11} className="shrink-0" />
                    {editingTitle === conv.id ? (
                      <input
                        value={titleValue}
                        onChange={(e) => setTitleValue(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && saveRename(conv.id)}
                        onBlur={() => saveRename(conv.id)}
                        className="min-w-0 flex-1 bg-transparent text-[11px] outline-none"
                        autoFocus
                      />
                    ) : (
                      <span className="truncate text-[11px]">{conv.title}</span>
                    )}
                  </button>
                  <div className="hidden group-hover:flex items-center gap-0.5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        startRename(conv.id, conv.title);
                      }}
                      className="rounded p-0.5 text-white/20 hover:text-white/50"
                    >
                      <Pencil size={10} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteConversation(conv.id);
                      }}
                      className="rounded p-0.5 text-white/20 hover:text-red-400/60"
                    >
                      <Trash2 size={10} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Chat */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="rounded-lg p-1.5 text-white/25 transition-colors hover:bg-white/[0.06] hover:text-white/50"
              title="Chat history"
            >
              <MessageSquare size={14} />
            </button>
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-500/10">
              <BrainCircuit size={12} className="text-blue-400/70" />
            </div>
            <div>
              <span className="text-[13px] font-medium text-white/70">AI Co-Founder</span>
              <div className="flex items-center gap-1">
                <span className="h-1 w-1 rounded-full bg-emerald-400" />
                <span className="text-[9px] text-white/30">Online</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Quality selector */}
            <div className="flex items-center rounded-lg border border-white/10 bg-white/[0.02] p-0.5">
              {qualityOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setAiQuality(opt.value)}
                  className={cn(
                    "rounded-md px-2 py-1 text-[10px] font-medium transition-all",
                    aiQuality === opt.value
                      ? "bg-white/[0.08] text-white/70"
                      : "text-white/25 hover:text-white/40"
                  )}
                  title={opt.desc}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                clearMessages();
                if (activeConversationId) {
                  setActiveConversation("");
                }
              }}
              className="rounded-lg p-1.5 text-white/20 transition-colors hover:bg-white/[0.06] hover:text-white/40"
              title="New chat"
            >
              <Plus size={14} />
            </button>

            {messages.length > 0 && (
              <button
                onClick={clearMessages}
                className="rounded-lg p-1.5 text-white/20 transition-colors hover:bg-white/[0.06] hover:text-white/40"
                title="Clear chat"
              >
                <Trash2 size={13} />
              </button>
            )}
          </div>
        </div>

        {/* Messages */}
        <ScrollArea ref={scrollRef} className="flex-1">
          <div className="p-4">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10">
                  <Sparkles size={22} className="text-blue-400/50" />
                </div>
                <h3 className="text-[15px] font-medium text-white/60">What can I help you build?</h3>
                <p className="mt-1.5 max-w-xs text-[12px] leading-relaxed text-white/25">
                  I can browse websites, research markets, analyze competitors, validate ideas, and
                  create documents — all with real data.
                </p>

                <div className="mt-8 grid w-full max-w-md grid-cols-2 gap-2">
                  {suggestions.map((s) => (
                    <button
                      key={s.label}
                      onClick={() => {
                        setInput(s.prompt);
                        textareaRef.current?.focus();
                      }}
                      className="group flex items-start gap-2.5 rounded-xl border border-white/10 bg-white/[0.02] p-3 text-left transition-all hover:border-white/15 hover:bg-white/[0.04]"
                    >
                      <s.icon
                        size={14}
                        className="mt-0.5 shrink-0 text-white/20 transition-colors group-hover:text-blue-400/50"
                      />
                      <span className="text-[12px] text-white/35 group-hover:text-white/55">
                        {s.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
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
                            "max-w-[85%] rounded-2xl px-4 py-3 text-[13px] leading-relaxed",
                            msg.role === "user"
                              ? "bg-blue-500/15 text-white/85 border border-blue-500/10"
                              : "text-white/60"
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
                    className="flex items-center gap-2.5"
                  >
                    <div className="flex items-center gap-1 rounded-xl bg-white/[0.04] px-3 py-2">
                      <span className="typing-dot h-1.5 w-1.5 rounded-full bg-white/30" />
                      <span className="typing-dot h-1.5 w-1.5 rounded-full bg-white/30" />
                      <span className="typing-dot h-1.5 w-1.5 rounded-full bg-white/30" />
                    </div>
                    {currentToolCall && currentToolCall !== "Thinking..." && (
                      <span className="text-[11px] text-white/20">{currentToolCall}</span>
                    )}
                  </motion.div>
                )}

                {error && (
                  <div className="rounded-xl border border-red-500/15 bg-red-500/[0.04] px-4 py-3 text-[12px] text-red-400/70">
                    {error}
                  </div>
                )}
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="border-t border-white/10 p-3">
          <div className="flex items-end gap-2">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything — I can browse, research, analyze, and build..."
              className="min-h-[42px] max-h-[120px] resize-none rounded-xl border-white/10 bg-white/[0.03] text-[13px] placeholder:text-white/15 focus:border-blue-500/30 focus:ring-blue-500/10"
              rows={1}
            />
            {isThinking ? (
              <Button
                size="icon"
                onClick={stopGeneration}
                className="shrink-0 rounded-xl h-[42px] w-[42px] bg-red-500/10 text-red-400/60 hover:bg-red-500/15"
              >
                <StopCircle size={16} />
              </Button>
            ) : (
              <Button
                size="icon"
                onClick={handleSend}
                disabled={!input.trim()}
                className="shrink-0 rounded-xl h-[42px] w-[42px] bg-blue-500/15 text-blue-400/60 hover:bg-blue-500/20 disabled:opacity-20"
              >
                <ArrowRight size={16} />
              </Button>
            )}
          </div>
          <div className="mt-1.5 flex items-center justify-between">
            <p className="text-[10px] text-white/15">
              Enter to send · Shift+Enter for new line
            </p>
            <div className="flex items-center gap-1 text-[10px] text-white/15">
              <Gauge size={10} />
              {aiQuality} quality
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
