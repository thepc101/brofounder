"use client";

import { useState } from "react";
import { FileText, FileCheck, Presentation, BarChart, Route } from "lucide-react";
import { SaaSToolWrapper } from "@/components/tools/saas-tool-wrapper";
import { useStore } from "@/lib/store";
import { generateId } from "@/lib/utils";
import { motion } from "framer-motion";

const docTypes = [
  { id: "pitch-deck", label: "Pitch Deck", icon: Presentation, description: "Investor-ready pitch presentation" },
  { id: "business-plan", label: "Business Plan", icon: FileCheck, description: "Comprehensive business plan" },
  { id: "prd", label: "PRD", icon: FileText, description: "Product requirements document" },
  { id: "investor-summary", label: "Investor Summary", icon: BarChart, description: "One-page investor brief" },
  { id: "tech-roadmap", label: "Tech Roadmap", icon: Route, description: "Technical development roadmap" },
];

interface DocSection {
  id: string;
  title: string;
  content: string;
  type: string;
  editable?: boolean;
}

export default function DocumentsPage() {
  const [sections, setSections] = useState<DocSection[]>([]);
  const [docType, setDocType] = useState("pitch-deck");
  const [isGenerating, setIsGenerating] = useState(false);
  const project = useStore((s) => s.project);
  const onboardingData = useStore((s) => s.onboardingData);

  const handleGenerate = async (prompt: string) => {
    setIsGenerating(true);
    try {
      const fullPrompt = `Generate a ${docTypes.find((d) => d.id === docType)?.label || docType}. ${prompt}`;
      const response = await fetch("/api/documents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: fullPrompt,
          type: docType,
          projectName: project?.name,
          industry: onboardingData.industry,
          onboardingData,
        }),
      });
      const data = await response.json();
      if (data.sections) setSections(data.sections);
    } catch {
      setSections([
        {
          id: generateId(),
          title: "Error",
          content: "Failed to generate document. Please try again.",
          type: "error",
        },
      ]);
    }
    setIsGenerating(false);
  };

  const handleSectionEdit = (id: string, content: string) => {
    setSections((prev) => prev.map((s) => (s.id === id ? { ...s, content } : s)));
  };

  return (
    <div className="flex h-full flex-col">
      {/* Doc Type Selector */}
      <div className="border-b border-white/10 px-6 py-3">
        <div className="flex items-center gap-2">
          {docTypes.map((dt) => (
            <button
              key={dt.id}
              onClick={() => {
                setDocType(dt.id);
                setSections([]);
              }}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs transition-all ${
                docType === dt.id
                  ? "bg-white/[0.08] text-white/80"
                  : "text-white/30 hover:bg-white/[0.04] hover:text-white/50"
              }`}
            >
              <dt.icon size={12} />
              {dt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tool */}
      <div className="flex-1 overflow-hidden">
        <SaaSToolWrapper
          title={`${docTypes.find((d) => d.id === docType)?.label || "Document"} Generator`}
          description={docTypes.find((d) => d.id === docType)?.description || "Generate documents"}
          icon={FileText}
          placeholder={`Describe your ${docTypes.find((d) => d.id === docType)?.label || "document"}... e.g., 'Generate a pitch deck for an AI-powered task management tool raising $2M seed'`}
          sections={sections}
          isGenerating={isGenerating}
          onGenerate={handleGenerate}
          onSectionEdit={handleSectionEdit}
        />
      </div>
    </div>
  );
}
