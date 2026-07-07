"use client";

import { useState } from "react";
import { Code, Globe, Database, Component, Layers } from "lucide-react";
import { SaaSToolWrapper } from "@/components/tools/saas-tool-wrapper";
import { generateId } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";

const codeTypes = [
  { id: "landing-page", label: "Landing Page", icon: Globe, description: "Full landing page with HTML/CSS/JS" },
  { id: "api-endpoint", label: "API Endpoint", icon: Database, description: "Next.js API route" },
  { id: "database-schema", label: "DB Schema", icon: Database, description: "PostgreSQL/MongoDB schema" },
  { id: "component", label: "React Component", icon: Component, description: "Reusable React component" },
  { id: "fullstack-app", label: "Fullstack App", icon: Layers, description: "Complete app scaffold" },
];

interface CodeSection {
  id: string;
  title: string;
  content: string;
  type: string;
  editable?: boolean;
}

interface GeneratedFile {
  filename: string;
  language: string;
  content: string;
}

export default function CodeGenPage() {
  const [sections, setSections] = useState<CodeSection[]>([]);
  const [files, setFiles] = useState<GeneratedFile[]>([]);
  const [codeType, setCodeType] = useState("landing-page");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedFile, setCopiedFile] = useState<string | null>(null);

  const handleGenerate = async (prompt: string) => {
    setIsGenerating(true);
    try {
      const response = await fetch("/api/codegen", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          type: codeType,
        }),
      });
      const data = await response.json();

      if (data.code) {
        setFiles(data.code);
        setSections(
          data.code.map((f: GeneratedFile) => ({
            id: generateId(),
            title: f.filename,
            content: f.content,
            type: "code",
            editable: true,
          }))
        );
      } else if (data.sections) {
        setSections(data.sections);
      }
    } catch {
      setSections([
        {
          id: generateId(),
          title: "Error",
          content: "Failed to generate code. Please try again.",
          type: "error",
        },
      ]);
    }
    setIsGenerating(false);
  };

  const handleSectionEdit = (id: string, content: string) => {
    setSections((prev) => prev.map((s) => (s.id === id ? { ...s, content } : s)));
  };

  const copyFile = (filename: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedFile(filename);
    setTimeout(() => setCopiedFile(null), 2000);
  };

  return (
    <div className="flex h-full flex-col">
      {/* Code Type Selector */}
      <div className="border-b border-white/[0.06] px-6 py-3">
        <div className="flex items-center gap-2">
          {codeTypes.map((ct) => (
            <button
              key={ct.id}
              onClick={() => {
                setCodeType(ct.id);
                setSections([]);
                setFiles([]);
              }}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs transition-all ${
                codeType === ct.id
                  ? "bg-white/[0.08] text-white/80"
                  : "text-white/30 hover:bg-white/[0.04] hover:text-white/50"
              }`}
            >
              <ct.icon size={12} />
              {ct.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tool */}
      <div className="flex-1 overflow-hidden">
        <SaaSToolWrapper
          title="Code Generator"
          description={`Generate ${codeTypes.find((c) => c.id === codeType)?.label || "code"} with AI`}
          icon={Code}
          placeholder={`Describe what you need... e.g., 'Landing page for an AI SaaS with hero, features, pricing, and CTA'`}
          sections={sections}
          isGenerating={isGenerating}
          onGenerate={handleGenerate}
          onSectionEdit={handleSectionEdit}
        />
      </div>
    </div>
  );
}
