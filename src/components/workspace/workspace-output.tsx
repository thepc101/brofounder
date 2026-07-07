"use client";

import { motion } from "framer-motion";
import {
  FileText,
  Lightbulb,
  Target,
  Users,
  BarChart3,
  Crosshair,
  DollarSign,
  Rocket,
  AlertTriangle,
  ArrowRight,
  RefreshCw,
  Edit3,
  Check,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { useWorkspace } from "@/hooks/use-workspace";
import { cn } from "@/lib/utils";
import { useState } from "react";
import type { WorkspaceSection } from "@/types";

const sectionIcons: Record<string, React.ElementType> = {
  summary: FileText,
  problem: Lightbulb,
  solution: Lightbulb,
  icp: Users,
  market: BarChart3,
  competition: Crosshair,
  pricing: DollarSign,
  gtm: Rocket,
  risks: AlertTriangle,
  "next-steps": ArrowRight,
};

const sectionLabels: Record<string, string> = {
  summary: "Business Summary",
  problem: "Problem",
  solution: "Solution",
  icp: "Ideal Customer Profile",
  market: "Market",
  competition: "Competition",
  pricing: "Pricing",
  gtm: "Go-to-Market",
  risks: "Risks",
  "next-steps": "Next Steps",
};

function EditableSection({
  section,
  onUpdate,
  onRegenerate,
}: {
  section: WorkspaceSection;
  onUpdate: (id: string, content: string) => void;
  onRegenerate: (id: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(section.content);
  const [open, setOpen] = useState(true);
  const Icon = sectionIcons[section.type] || FileText;

  const handleSave = () => {
    onUpdate(section.id, editValue);
    setEditing(false);
  };

  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.01]">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-2 px-3 py-2.5 text-left"
      >
        <Icon size={13} className="shrink-0 text-white/25" />
        <span className="flex-1 text-[13px] font-medium text-white/50">
          {sectionLabels[section.type] || section.title}
        </span>
        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
          {editing ? (
            <>
              <button onClick={handleSave} className="rounded p-1 text-white/30 hover:text-white/60">
                <Check size={11} />
              </button>
              <button
                onClick={() => {
                  setEditValue(section.content);
                  setEditing(false);
                }}
                className="rounded p-1 text-white/30 hover:text-white/60"
              >
                <X size={11} />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  setEditValue(section.content);
                  setEditing(true);
                }}
                className="rounded p-1 text-white/20 hover:text-white/40"
              >
                <Edit3 size={11} />
              </button>
              <button
                onClick={() => onRegenerate(section.id)}
                className="rounded p-1 text-white/20 hover:text-white/40"
              >
                <RefreshCw size={11} />
              </button>
            </>
          )}
        </div>
      </button>
      {open && (
        <div className="border-t border-white/[0.03] px-3 py-2.5">
          {editing ? (
            <div className="space-y-2">
              <Textarea
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="min-h-[100px] rounded-lg border-white/10 bg-white/[0.03] text-sm"
                autoFocus
              />
            </div>
          ) : (
            <div className="whitespace-pre-wrap text-[13px] leading-relaxed text-white/35">
              {section.content}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function WorkspaceOutput() {
  const { workspaceSections, isGenerating, regenerateSection, updateSection } = useWorkspace();

  if (workspaceSections.length === 0 && !isGenerating) {
    return (
      <div className="flex h-full flex-col items-center justify-center p-8 text-center">
        <FileText size={28} className="mb-2 text-white/10" />
        <p className="text-[13px] text-white/25">Structured outputs appear here</p>
        <p className="mt-1 max-w-xs text-[11px] text-white/15">
          Ask your AI co-founder to generate a business plan, market analysis, or anything else.
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-white/10 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <FileText size={13} className="text-white/30" />
          <span className="text-[13px] font-medium text-white/50">Structured Outputs</span>
        </div>
        <p className="text-[10px] text-white/20">Editable sections with AI-generated content</p>
      </div>
      <ScrollArea className="flex-1">
        <div className="space-y-1.5 p-3">
          {isGenerating && workspaceSections.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <div className="flex items-center gap-2 text-[13px] text-white/25">
                <RefreshCw size={13} className="animate-spin" />
                Generating...
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-1.5"
            >
              {workspaceSections.map((section) => (
                <EditableSection
                  key={section.id}
                  section={section}
                  onUpdate={updateSection}
                  onRegenerate={regenerateSection}
                />
              ))}
            </motion.div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
