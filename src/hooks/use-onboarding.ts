"use client";

import { useStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import type { OnboardingData, StartupStage, BusinessModel, TeamSize, ExperienceLevel, FounderGoal, Project } from "@/types";

const TOTAL_STEPS = 12;

export function useOnboarding() {
  const router = useRouter();
  const {
    onboardingData,
    onboardingStep,
    setOnboardingData,
    setOnboardingStep,
    completeOnboarding,
    setProject,
    addActivity,
  } = useStore();

  const progress = ((onboardingStep + 1) / TOTAL_STEPS) * 100;
  const isFirstStep = onboardingStep === 0;
  const isLastStep = onboardingStep === TOTAL_STEPS - 1;

  const updateField = useCallback(
    (field: keyof OnboardingData, value: string | string[]) => {
      setOnboardingData({ [field]: value });
    },
    [setOnboardingData]
  );

  const nextStep = useCallback(() => {
    if (onboardingStep < TOTAL_STEPS - 1) {
      setOnboardingStep(onboardingStep + 1);
    }
  }, [onboardingStep, setOnboardingStep]);

  const prevStep = useCallback(() => {
    if (onboardingStep > 0) {
      setOnboardingStep(onboardingStep - 1);
    }
  }, [onboardingStep, setOnboardingStep]);

  const skip = useCallback(() => {
    nextStep();
  }, [nextStep]);

  const canProceed = useCallback(() => {
    switch (onboardingStep) {
      case 0: return onboardingData.idea.length >= 10;
      case 1: return onboardingData.stage !== "";
      case 2: return onboardingData.problem.length >= 10;
      case 3: return onboardingData.customer.length >= 5;
      case 4: return onboardingData.industry.length >= 2;
      case 5: return onboardingData.businessModel !== "";
      case 6: return onboardingData.country.length >= 2;
      case 9: return onboardingData.challenge.length >= 5;
      case 10: return onboardingData.goals.length > 0;
      default: return true;
    }
  }, [onboardingStep, onboardingData]);

  const generateWorkspace = useCallback(async () => {
    const project: Project = {
      id: Math.random().toString(36).substring(2, 15),
      name: onboardingData.idea.split(" ").slice(0, 5).join(" "),
      description: onboardingData.problem,
      stage: onboardingData.stage as StartupStage || "idea",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      onboardingData: onboardingData as OnboardingData,
    };
    setProject(project);
    completeOnboarding();
    addActivity({
      id: Math.random().toString(36).substring(2, 15),
      type: "workspace",
      title: "Workspace created",
      description: `Started working on ${project.name}`,
      timestamp: new Date().toISOString(),
    });
    router.push("/dashboard");
  }, [onboardingData, setProject, completeOnboarding, addActivity, router]);

  return {
    onboardingData,
    onboardingStep,
    progress,
    isFirstStep,
    isLastStep,
    totalSteps: TOTAL_STEPS,
    updateField,
    nextStep,
    prevStep,
    skip,
    canProceed: canProceed(),
    generateWorkspace,
  };
}
