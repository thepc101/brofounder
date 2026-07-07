"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Loader2,
  Copy,
  Check,
  Download,
  ChevronDown,
  ChevronUp,
  Pencil,
  RotateCcw,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface ToolSection {
  id: string;
  title: string;
  content: string;
  type: string;
  editable?: boolean;
}

interface SaaSToolWrapperProps {
  title: string;
  description: string;
  icon: React.ElementType;
  placeholder: string;
  sections: ToolSection[];
  isGenerating: boolean;
  onGenerate: (prompt: string) => void;
  onRegenerate?: () => void;
  onSectionEdit?: (id: string, content: string) => void;
  metrics?: { label: string; value: string }[];
  showPrompt?: boolean;
}

export function SaaSToolWrapper({
  title,
  description,
  icon: Icon,
  placeholder,
  sections,
  isGenerating,
  onGenerate,
  onRegenerate,
  onSectionEdit,
  metrics,
  showPrompt = true,
}: SaaSToolWrapperProps) {
  const [prompt, setPrompt] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [copied, setCopied] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleGenerate = () => {
    if (!prompt.trim() || isGenerating) return;
    onGenerate(prompt.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleGenerate();
    }
  };

  const toggleSection = (id: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const expandAll = () => {
    if (expandedSections.size === sections.length) {
      setExpandedSections(new Set());
    } else {
      setExpandedSections(new Set(sections.map((s) => s.id)));
    }
  };

  const handleCopy = () => {
    const allContent = sections.map((s) => `## ${s.title}\n\n${s.content}`).join("\n\n---\n\n");
    navigator.clipboard.writeText(allContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const allContent = sections.map((s) => `## ${s.title}\n\n${s.content}`).join("\n\n---\n\n");
    const blob = new Blob([allContent], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title.toLowerCase().replace(/\s+/g, "-")}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const startEditing = (section: ToolSection) => {
    setEditingId(section.id);
    setEditContent(section.content);
  };

  const saveEdit = (id: string) => {
    onSectionEdit?.(id, editContent);
    setEditingId(null);
  };

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="border-b border-white/[0.06] px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.06]">
              <Icon size={16} className="text-white/60" />
            </div>
            <div>
              <h2 className="text-sm font-medium">{title}</h2>
              <p className="text-xs text-white/30">{description}</p>
            </div>
          </div>
          {sections.length > 0 && (
            <div className="flex items-center gap-1.5">
              <Button
                variant="ghost"
                size="sm"
                onClick={expandAll}
                className="h-7 gap-1.5 text-[11px] text-white/40 hover:text-white/60"
              >
                {expandedSections.size === sections.length ? (
                  <>
                    <ChevronUp size={12} /> Collapse
                  </>
                ) : (
                  <>
                    <ChevronDown size={12} /> Expand
                  </>
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                className="h-7 gap-1.5 text-[11px] text-white/40 hover:text-white/60"
              >
                {copied ? <Check size={12} /> : <Copy size={12} />}
                {copied ? "Copied" : "Copy"}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDownload}
                className="h-7 gap-1.5 text-[11px] text-white/40 hover:text-white/60"
              >
                <Download size={12} />
                Export
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {sections.length === 0 && !isGenerating ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 py-20 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.04]">
              <Sparkles size={24} className="text-white/20" />
            </div>
            <h3 className="text-sm font-medium text-white/50">
              Describe what you need
            </h3>
            <p className="mt-1 max-w-sm text-xs text-white/25">
              {placeholder}
            </p>
          </div>
        ) : (
          <div className="p-6">
            {/* Metrics */}
            {metrics && metrics.length > 0 && (
              <div className="mb-6 grid grid-cols-3 gap-3">
                {metrics.map((m) => (
                  <div
                    key={m.label}
                    className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3"
                  >
                    <p className="text-[10px] uppercase tracking-wider text-white/30">{m.label}</p>
                    <p className="mt-1 text-sm font-medium text-white/70">{m.value}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Sections */}
            <div className="space-y-2">
              {sections.map((section) => (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-lg border border-white/[0.06] bg-white/[0.02]"
                >
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="flex w-full items-center justify-between px-4 py-3 text-left"
                  >
                    <h3 className="text-sm font-medium text-white/70">{section.title}</h3>
                    <div className="flex items-center gap-2">
                      {section.editable && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            startEditing(section);
                          }}
                          className="rounded p-1 text-white/20 hover:text-white/50"
                        >
                          <Pencil size={12} />
                        </button>
                      )}
                      {expandedSections.has(section.id) ? (
                        <ChevronUp size={14} className="text-white/20" />
                      ) : (
                        <ChevronDown size={14} className="text-white/20" />
                      )}
                    </div>
                  </button>
                  <AnimatePresence>
                    {expandedSections.has(section.id) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-white/[0.04] px-4 py-3">
                          {editingId === section.id ? (
                            <div className="space-y-2">
                              <Textarea
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                                className="min-h-[200px] rounded-lg border-white/[0.08] bg-white/[0.03] text-sm"
                              />
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  onClick={() => saveEdit(section.id)}
                                  className="h-7 rounded-lg bg-white/[0.08] text-xs"
                                >
                                  Save
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => setEditingId(null)}
                                  className="h-7 text-xs text-white/40"
                                >
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div className="whitespace-pre-wrap text-sm leading-relaxed text-white/50">
                              {section.content}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            {/* Regenerate */}
            {onRegenerate && (
              <div className="mt-4 flex justify-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onRegenerate}
                  className="gap-1.5 text-xs text-white/30 hover:text-white/50"
                >
                  <RotateCcw size={12} />
                  Regenerate
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Generating state */}
        {isGenerating && (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center gap-3 text-sm text-white/30">
              <Loader2 size={16} className="animate-spin" />
              Generating...
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      {showPrompt && (
        <div className="border-t border-white/[0.06] p-4">
          <div className="flex items-end gap-2">
            <Textarea
              ref={textareaRef}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className="min-h-[44px] max-h-[120px] resize-none rounded-xl border-white/[0.08] bg-white/[0.03] text-sm placeholder:text-white/20 focus:border-white/[0.15]"
              rows={1}
            />
            <Button
              size="icon"
              onClick={handleGenerate}
              disabled={!prompt.trim() || isGenerating}
              className="shrink-0 rounded-xl bg-white/[0.08] text-white/60 hover:bg-white/[0.12] disabled:opacity-30"
            >
              <ArrowRight size={16} />
            </Button>
          </div>
          <p className="mt-1.5 text-[10px] text-white/20">
            Be specific for best results · Press Enter to generate
          </p>
        </div>
      )}
    </div>
  );
}
