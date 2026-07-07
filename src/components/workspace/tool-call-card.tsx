"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  Search,
  BarChart3,
  Users,
  Rocket,
  FileText,
  Code,
  Lightbulb,
  ChevronDown,
  CheckCircle2,
  XCircle,
  Loader2,
  ExternalLink,
  Copy,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";

const toolIcons: Record<string, React.ElementType> = {
  browse_website: Globe,
  search_web: Search,
  analyze_competitor: BarChart3,
  research_market: BarChart3,
  validate_idea: CheckCircle2,
  create_persona: Users,
  plan_mvp: Rocket,
  draft_document: FileText,
  get_strategy: Lightbulb,
  extract_leads: Users,
  update_project: Rocket,
  generate_code: Code,
  analyze_page: Globe,
};

const toolLabels: Record<string, string> = {
  browse_website: "Browsing website",
  search_web: "Searching the web",
  analyze_competitor: "Analyzing competitor",
  research_market: "Researching market",
  validate_idea: "Validating idea",
  create_persona: "Creating persona",
  plan_mvp: "Planning MVP",
  draft_document: "Drafting document",
  get_strategy: "Getting strategy",
  extract_leads: "Extracting leads",
  update_project: "Updating project",
  generate_code: "Generating code",
  analyze_page: "Analyzing page",
};

interface ToolCallCardProps {
  toolName: string;
  args: Record<string, string>;
  result?: {
    success: boolean;
    summary: string;
    data: unknown;
  };
  isPending?: boolean;
}

export function ToolCallCard({ toolName, args, result, isPending }: ToolCallCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const Icon = toolIcons[toolName] || Globe;
  const label = toolLabels[toolName] || toolName;

  const argEntries = Object.entries(args).filter(([_, v]) => v);

  const handleCopy = () => {
    navigator.clipboard.writeText(result?.summary || JSON.stringify(result?.data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group"
    >
      <div
        className={cn(
          "rounded-lg border transition-all duration-200",
          isPending
            ? "border-white/10 bg-white/[0.02]"
            : result?.success
            ? "border-white/10 bg-white/[0.02] hover:border-white/15"
            : "border-red-500/20 bg-red-500/[0.02]"
        )}
      >
        {/* Header */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex w-full items-center gap-2.5 px-3 py-2.5 text-left"
        >
          <div
            className={cn(
              "flex h-6 w-6 shrink-0 items-center justify-center rounded-md",
              isPending
                ? "bg-white/[0.06]"
                : result?.success
                ? "bg-emerald-500/10"
                : "bg-red-500/10"
            )}
          >
            {isPending ? (
              <Loader2 size={12} className="animate-spin text-white/50" />
            ) : result?.success ? (
              <CheckCircle2 size={12} className="text-emerald-400" />
            ) : (
              <XCircle size={12} className="text-red-400" />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <Icon size={12} className="shrink-0 text-white/40" />
              <span className="text-xs font-medium text-white/70">{label}</span>
            </div>
            {argEntries.length > 0 && (
              <p className="mt-0.5 truncate text-[10px] text-white/30">
                {argEntries.map(([k, v]) => `${k}: ${v}`).join(" · ")}
              </p>
            )}
          </div>

          <ChevronDown
            size={12}
            className={cn(
              "shrink-0 text-white/30 transition-transform duration-200",
              expanded && "rotate-180"
            )}
          />
        </button>

        {/* Expandable content */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="border-t border-white/10 px-3 py-2.5">
                {/* Args */}
                {argEntries.length > 0 && (
                  <div className="mb-2">
                    <p className="mb-1 text-[10px] font-medium uppercase tracking-wider text-white/30">
                      Arguments
                    </p>
                    <div className="rounded-md bg-white/[0.02] p-2">
                      {argEntries.map(([k, v]) => (
                        <div key={k} className="flex gap-2 text-[11px]">
                          <span className="text-white/40">{k}:</span>
                          <span className="break-all text-white/60">{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Result */}
                {result && (
                  <div>
                    <div className="mb-1 flex items-center justify-between">
                      <p className="text-[10px] font-medium uppercase tracking-wider text-white/30">
                        Result
                      </p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopy();
                        }}
                        className="flex items-center gap-1 text-[10px] text-white/30 hover:text-white/50"
                      >
                        {copied ? <Check size={10} /> : <Copy size={10} />}
                        {copied ? "Copied" : "Copy"}
                      </button>
                    </div>
                    <div className="rounded-md bg-white/[0.02] p-2 text-[11px] leading-relaxed text-white/50">
                      {result.summary}
                    </div>

                    {/* Show data preview for browsed pages */}
                    {result.data && typeof result.data === "object" && (result.data as any).title && (
                      <div className="mt-2 rounded-md bg-white/[0.02] p-2">
                        <div className="flex items-center gap-1.5 text-[10px] text-white/30">
                          <ExternalLink size={10} />
                          <span className="font-medium">{(result.data as any).title}</span>
                        </div>
                        {(result.data as any).description && (
                          <p className="mt-1 text-[10px] text-white/40">
                            {(result.data as any).description.slice(0, 150)}...
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {isPending && (
                  <div className="flex items-center gap-2 text-[11px] text-white/30">
                    <Loader2 size={10} className="animate-spin" />
                    Executing...
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
