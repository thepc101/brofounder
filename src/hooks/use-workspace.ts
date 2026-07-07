"use client";

import { useStore } from "@/lib/store";
import { useCallback } from "react";
import { generateId } from "@/lib/utils";
import type { WorkspaceSection } from "@/types";

export function useWorkspace() {
  const {
    workspaceSections,
    project,
    setWorkspaceSections,
    updateWorkspaceSection,
    addActivity,
  } = useStore();

  const regenerateSection = useCallback(
    async (sectionId: string) => {
      const section = workspaceSections.find((s) => s.id === sectionId);
      if (!section) return;

      try {
        const response = await fetch("/api/workspace", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: `Regenerate the ${section.title} section`,
            projectContext: project,
            existingSections: workspaceSections,
            regenerateSection: sectionId,
          }),
        });
        const data = await response.json();
        if (data.section) {
          updateWorkspaceSection(sectionId, data.section.content);
        }
      } catch (error) {
        console.error("Failed to regenerate section:", error);
      }
    },
    [workspaceSections, project, updateWorkspaceSection]
  );

  return {
    workspaceSections,
    isGenerating: false,
    regenerateSection,
    updateSection: updateWorkspaceSection,
  };
}
