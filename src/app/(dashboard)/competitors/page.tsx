"use client";

import { useState } from "react";
import { Crosshair, Globe, Plus, Trash2, ExternalLink } from "lucide-react";
import { SaaSToolWrapper } from "@/components/tools/saas-tool-wrapper";
import { useStore } from "@/lib/store";
import { generateId } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

interface AnalysisSection {
  id: string;
  title: string;
  content: string;
  type: string;
  editable?: boolean;
}

export default function CompetitorsPage() {
  const [sections, setSections] = useState<AnalysisSection[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [competitorUrl, setCompetitorUrl] = useState("");
  const [analyzingUrl, setAnalyzingUrl] = useState<string | null>(null);
  const competitors = useStore((s) => s.competitors);
  const setCompetitors = useStore((s) => s.setCompetitors);

  const handleGenerate = async (prompt: string) => {
    setIsGenerating(true);
    try {
      const response = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `Analyze the competitor market for: ${prompt}. Browse competitor websites, analyze their strengths and weaknesses, and provide a comprehensive comparison.`,
          history: [],
          context: {},
        }),
      });
      const data = await response.json();
      setSections([
        {
          id: generateId(),
          title: "Competitive Analysis",
          content: data.message,
          type: "analysis",
          editable: true,
        },
      ]);
    } catch {
      setSections([
        {
          id: generateId(),
          title: "Error",
          content: "Failed to analyze competitors. Please try again.",
          type: "error",
        },
      ]);
    }
    setIsGenerating(false);
  };

  const analyzeUrl = async () => {
    if (!competitorUrl.trim()) return;
    setAnalyzingUrl(competitorUrl);
    setIsGenerating(true);

    try {
      const response = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `Browse ${competitorUrl} and analyze this competitor. What do they do? What's their value proposition? Pricing? Strengths and weaknesses?`,
          history: [],
          context: {},
        }),
      });
      const data = await response.json();

      setSections((prev) => [
        {
          id: generateId(),
          title: `Analysis: ${new URL(competitorUrl).hostname}`,
          content: data.message,
          type: "competitor-analysis",
          editable: true,
        },
        ...prev,
      ]);

      setCompetitorUrl("");
    } catch {}
    setAnalyzingUrl(null);
    setIsGenerating(false);
  };

  const handleSectionEdit = (id: string, content: string) => {
    setSections((prev) => prev.map((s) => (s.id === id ? { ...s, content } : s)));
  };

  return (
    <div className="flex h-full flex-col">
      {/* Quick URL Analyzer */}
      <div className="border-b border-white/[0.06] px-6 py-3">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Globe
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
            />
            <Input
              value={competitorUrl}
              onChange={(e) => setCompetitorUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && analyzeUrl()}
              placeholder="Paste a competitor URL to analyze..."
              className="h-8 rounded-lg border-white/[0.08] bg-white/[0.03] pl-9 text-xs placeholder:text-white/20"
            />
          </div>
          <Button
            size="sm"
            onClick={analyzeUrl}
            disabled={!competitorUrl.trim() || isGenerating}
            className="h-8 rounded-lg bg-white/[0.08] text-xs hover:bg-white/[0.12]"
          >
            Analyze
          </Button>
        </div>
      </div>

      {/* Tool */}
      <div className="flex-1 overflow-hidden">
        <SaaSToolWrapper
          title="Competitor Intelligence"
          description="Browse, analyze, and compare competitors with real-time data"
          icon={Crosshair}
          placeholder="Describe your competitive landscape... e.g., 'Analyze the top 5 project management tools and find gaps in the market'"
          sections={sections}
          isGenerating={isGenerating}
          onGenerate={handleGenerate}
          onSectionEdit={handleSectionEdit}
          showPrompt={true}
        />
      </div>
    </div>
  );
}
