"use client";

import { useStore } from "@/lib/store";
import { formatDate } from "@/lib/utils";
import { Calendar, ArrowUpRight, Rocket } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export function ProjectCard() {
  const project = useStore((s) => s.project);

  if (!project) {
    return (
      <Card className="border-white/[0.06] bg-white/[0.02]">
        <CardContent className="flex flex-col items-center justify-center py-10">
          <Rocket size={24} className="mb-2 text-white/15" />
          <p className="text-sm text-white/30">No project yet</p>
          <Link
            href="/onboarding"
            className="mt-2 text-sm font-medium text-white/50 transition-colors hover:text-white/70"
          >
            Start your onboarding
          </Link>
        </CardContent>
      </Card>
    );
  }

  const stageLabels: Record<string, string> = {
    idea: "Just an idea",
    validating: "Validating",
    "building-mvp": "Building MVP",
    growing: "Growing",
    scaling: "Scaling",
  };

  return (
    <Card className="group border-white/[0.06] bg-white/[0.02] transition-all duration-200 hover:border-white/[0.1]">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="text-[15px] font-medium text-white/80">{project.name}</h3>
            <p className="line-clamp-2 text-[13px] text-white/35">{project.description}</p>
          </div>
          <Link
            href="/workspace"
            className="rounded-lg p-1.5 text-white/20 opacity-0 transition-all group-hover:opacity-100 hover:text-white/50"
          >
            <ArrowUpRight size={14} />
          </Link>
        </div>
        <div className="mt-3 flex items-center gap-3">
          <Badge
            variant="secondary"
            className="rounded-md border-white/[0.08] bg-white/[0.04] text-[10px] text-white/50"
          >
            {stageLabels[project.stage] || project.stage}
          </Badge>
          <div className="flex items-center gap-1 text-[11px] text-white/25">
            <Calendar size={10} />
            {formatDate(project.createdAt)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
