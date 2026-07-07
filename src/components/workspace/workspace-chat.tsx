"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, BrainCircuit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useWorkspace } from "@/hooks/use-workspace";
import { cn } from "@/lib/utils";
import { formatRelativeTime } from "@/lib/utils";

export function WorkspaceChat() {
  const { workspaceMessages, isGenerating, sendMessage } = useWorkspace();
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [workspaceMessages]);

  const handleSend = () => {
    if (!input.trim() || isGenerating) return;
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
    <div className="flex h-full flex-col border-r border-border">
      <div className="border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <BrainCircuit size={16} className="text-foreground" />
          <span className="text-sm font-medium">AI Co-Founder</span>
        </div>
        <p className="text-xs text-muted-foreground mt-0.5">
          Ask anything about your startup
        </p>
      </div>

      <ScrollArea ref={scrollRef} className="flex-1">
        <div className="space-y-4 p-4">
          {workspaceMessages.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <BrainCircuit size={32} className="text-muted-foreground mb-3" />
              <p className="text-sm text-muted-foreground">
                Start a conversation with your AI co-founder.
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Ask about validation, research, strategy, or anything else.
              </p>
            </div>
          )}
          <AnimatePresence>
            {workspaceMessages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={cn(
                  "flex",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[85%] rounded-lg px-3 py-2 text-sm",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-accent"
                  )}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  <p
                    className={cn(
                      "mt-1 text-[10px]",
                      message.role === "user"
                        ? "text-primary-foreground/60"
                        : "text-muted-foreground"
                    )}
                  >
                    {formatRelativeTime(message.timestamp)}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {isGenerating && (
            <div className="flex justify-start">
              <div className="rounded-lg bg-accent px-3 py-2">
                <div className="flex items-center gap-2">
                  <Loader2 size={14} className="animate-spin" />
                  <span className="text-sm text-muted-foreground">Thinking...</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="border-t border-border p-3">
        <div className="flex items-end gap-2">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask your AI co-founder..."
            className="min-h-[40px] max-h-[120px] resize-none text-sm"
            rows={1}
          />
          <Button
            size="icon"
            onClick={handleSend}
            disabled={!input.trim() || isGenerating}
            className="shrink-0"
          >
            <Send size={16} />
          </Button>
        </div>
        <p className="mt-1.5 text-[10px] text-muted-foreground">
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}
