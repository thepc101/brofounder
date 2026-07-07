"use client";

import { useStore } from "@/lib/store";
import { useCallback } from "react";
import { generateId } from "@/lib/utils";
import type { WorkspaceMessage, WorkspaceSection } from "@/types";

export function useWorkspace() {
  const {
    workspaceMessages,
    workspaceSections,
    isGenerating,
    project,
    addWorkspaceMessage,
    setWorkspaceSections,
    updateWorkspaceSection,
    setIsGenerating,
    addActivity,
  } = useStore();

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isGenerating) return;

      const userMessage: WorkspaceMessage = {
        id: generateId(),
        role: "user",
        content,
        timestamp: new Date().toISOString(),
      };

      addWorkspaceMessage(userMessage);
      setIsGenerating(true);

      try {
        const response = await fetch("/api/workspace", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: content,
            projectContext: project,
            existingSections: workspaceSections,
          }),
        });

        const data = await response.json();

        const assistantMessage: WorkspaceMessage = {
          id: generateId(),
          role: "assistant",
          content: data.message,
          timestamp: new Date().toISOString(),
        };

        addWorkspaceMessage(assistantMessage);

        if (data.sections) {
          setWorkspaceSections(data.sections);
        }

        addActivity({
          id: generateId(),
          type: "workspace",
          title: "Workspace updated",
          description: content.slice(0, 60) + "...",
          timestamp: new Date().toISOString(),
        });
      } catch (error) {
        const errorMessage: WorkspaceMessage = {
          id: generateId(),
          role: "assistant",
          content: "I encountered an error processing your request. Please try again.",
          timestamp: new Date().toISOString(),
        };
        addWorkspaceMessage(errorMessage);
      }

      setIsGenerating(false);
    },
    [isGenerating, project, workspaceSections, addWorkspaceMessage, setWorkspaceSections, setIsGenerating, addActivity]
  );

  const regenerateSection = useCallback(
    async (sectionId: string) => {
      const section = workspaceSections.find((s) => s.id === sectionId);
      if (!section) return;

      setIsGenerating(true);

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

      setIsGenerating(false);
    },
    [workspaceSections, project, updateWorkspaceSection, setIsGenerating]
  );

  const clearChat = useCallback(() => {
    useStore.getState().clearWorkspace();
  }, []);

  return {
    workspaceMessages,
    workspaceSections,
    isGenerating,
    sendMessage,
    regenerateSection,
    updateSection: updateWorkspaceSection,
    clearChat,
  };
}
