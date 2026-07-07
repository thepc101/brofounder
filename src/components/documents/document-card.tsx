"use client";

import type { Document } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, File, BookOpen, Route, TrendingUp, ScrollText, Download } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const docIcons: Record<string, React.ElementType> = {
  "pitch-deck": Presentation,
  "business-plan": FileText,
  "prd": File,
  "tech-roadmap": Route,
  "investor-summary": TrendingUp,
  "marketing-plan": Megaphone,
};

const docLabels: Record<string, string> = {
  "pitch-deck": "Pitch Deck",
  "business-plan": "Business Plan",
  "prd": "Product Requirements",
  "tech-roadmap": "Technical Roadmap",
  "investor-summary": "Investor Summary",
  "marketing-plan": "Marketing Plan",
};

import { Presentation, Megaphone } from "lucide-react";

interface DocumentCardProps {
  document: Document;
}

export function DocumentCard({ document }: DocumentCardProps) {
  const Icon = docIcons[document.type] || FileText;

  const handleExport = () => {
    toast.success(`${document.title} exported`);
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="rounded-md border border-border p-2">
              <Icon size={16} className="text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-sm font-medium">{document.title}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                {docLabels[document.type] || document.type}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {formatDate(document.createdAt)}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={handleExport}>
            <Download size={14} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
