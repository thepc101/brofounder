"use client";

import { Sparkles, FileText, BarChart3, Users, Target, Lightbulb } from "lucide-react";

interface SuggestionChipsProps {
  onSelect: (suggestion: string) => void;
}

const suggestions = [
  { icon: FileText, text: "Generate business plan" },
  { icon: BarChart3, text: "Analyze market" },
  { icon: Users, text: "Define customer persona" },
  { icon: Target, text: "Validate idea" },
  { icon: Lightbulb, text: "Suggest features" },
];

export function SuggestionChips({ onSelect }: SuggestionChipsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {suggestions.map((s) => (
        <button
          key={s.text}
          onClick={() => onSelect(s.text)}
          className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
        >
          <s.icon size={12} />
          {s.text}
        </button>
      ))}
    </div>
  );
}
