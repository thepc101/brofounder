"use client";

import { useStore } from "@/lib/store";
import { formatDate } from "@/lib/utils";
import { Calendar, ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export function ProjectCard() {
  const project = useStore((s) => s.project);

  if (!project) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <p className="text-sm text-muted-foreground">No project yet</p>
          <Link
            href="/onboarding"
            className="mt-2 text-sm font-medium text-foreground hover:underline"
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
    <Card className="group">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="font-semibold">{project.name}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {project.description}
            </p>
          </div>
          <Link
            href="/workspace"
            className="rounded-md p-1.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:text-foreground"
          >
            <ArrowUpRight size={16} />
          </Link>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <Badge variant="secondary" className="text-xs">
            {stageLabels[project.stage] || project.stage}
          </Badge>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar size={12} />
            {formatDate(project.createdAt)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
