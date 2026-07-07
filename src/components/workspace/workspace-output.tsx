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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
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

  const handleCancel = () => {
    setEditValue(section.content);
    setEditing(false);
  };

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm font-medium hover:bg-accent/50">
        <Icon size={14} className="text-muted-foreground shrink-0" />
        <span className="flex-1">{sectionLabels[section.type] || section.title}</span>
        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
          {editing ? (
            <>
              <button onClick={handleSave} className="rounded p-1 text-muted-foreground hover:text-foreground">
                <Check size={12} />
              </button>
              <button onClick={handleCancel} className="rounded p-1 text-muted-foreground hover:text-foreground">
                <X size={12} />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  setEditValue(section.content);
                  setEditing(true);
                }}
                className="rounded p-1 text-muted-foreground hover:text-foreground"
              >
                <Edit3 size={12} />
              </button>
              <button
                onClick={() => onRegenerate(section.id)}
                className="rounded p-1 text-muted-foreground hover:text-foreground"
              >
                <RefreshCw size={12} />
              </button>
            </>
          )}
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="px-3 pb-3">
          {editing ? (
            <Textarea
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="min-h-[100px] text-sm"
              autoFocus
            />
          ) : (
            <div className="rounded-md bg-accent/30 px-3 py-2 text-sm text-muted-foreground">
              {section.content}
            </div>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

export function WorkspaceOutput() {
  const { workspaceSections, isGenerating, regenerateSection, updateSection } = useWorkspace();

  if (workspaceSections.length === 0 && !isGenerating) {
    return (
      <div className="flex h-full flex-col items-center justify-center text-center p-8">
        <FileText size={32} className="text-muted-foreground mb-3" />
        <p className="text-sm text-muted-foreground">
          Your structured outputs will appear here.
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Ask your AI co-founder to generate a business plan, market analysis, or anything else.
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <FileText size={16} className="text-foreground" />
          <span className="text-sm font-medium">Structured Outputs</span>
        </div>
        <p className="text-xs text-muted-foreground mt-0.5">
          Editable sections with AI-generated content
        </p>
      </div>
      <ScrollArea className="flex-1">
        <div className="space-y-1 p-3">
          {isGenerating && workspaceSections.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <RefreshCw size={14} className="animate-spin" />
                Generating your workspace...
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.05 }}
              className="space-y-1"
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
