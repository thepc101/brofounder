"use client";

import { WorkspaceChat } from "@/components/workspace/workspace-chat";
import { WorkspaceOutput } from "@/components/workspace/workspace-output";

export default function WorkspacePage() {
  return (
    <div className="flex h-full overflow-hidden">
      <div className="w-[420px] shrink-0 border-r border-white/[0.04]">
        <WorkspaceChat />
      </div>
      <div className="flex flex-1 flex-col">
        <WorkspaceOutput />
      </div>
    </div>
  );
}
