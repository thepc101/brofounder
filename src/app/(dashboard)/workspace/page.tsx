"use client";

import { useCallback } from "react";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { WorkspaceChat } from "@/components/workspace/workspace-chat";
import { WorkspaceOutput } from "@/components/workspace/workspace-output";
import { useWorkspace } from "@/hooks/use-workspace";

export default function WorkspacePage() {
  const { sendMessage } = useWorkspace();

  return (
    <div className="flex h-full flex-col">
      <DashboardHeader
        title="Workspace"
        description="Your AI co-founder workspace. Chat and generate structured outputs."
      />
      <div className="flex flex-1 overflow-hidden">
        <div className="flex w-[400px] shrink-0 flex-col">
          <WorkspaceChat />
        </div>
        <div className="flex flex-1 flex-col">
          <WorkspaceOutput />
        </div>
      </div>
    </div>
  );
}
