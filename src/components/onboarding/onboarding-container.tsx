"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useOnboarding } from "@/hooks/use-onboarding";
import { StepIdea } from "./step-idea";
import { StepStage } from "./step-stage";
import { StepProblem } from "./step-problem";
import { StepCustomer } from "./step-customer";
import { StepIndustry } from "./step-industry";
import { StepBusinessModel } from "./step-business-model";
import { StepCountry } from "./step-country";
import { StepTeam } from "./step-team";
import { StepExperience } from "./step-experience";
import { StepChallenge } from "./step-challenge";
import { StepGoals } from "./step-goals";
import { StepExtra } from "./step-extra";

const steps = [
  { component: StepIdea, title: "Your startup idea" },
  { component: StepStage, title: "Current stage" },
  { component: StepProblem, title: "Problem you solve" },
  { component: StepCustomer, title: "Target customer" },
  { component: StepIndustry, title: "Industry" },
  { component: StepBusinessModel, title: "Business model" },
  { component: StepCountry, title: "Country" },
  { component: StepTeam, title: "Team" },
  { component: StepExperience, title: "Experience" },
  { component: StepChallenge, title: "Biggest challenge" },
  { component: StepGoals, title: "Goals" },
  { component: StepExtra, title: "Anything else?" },
];

export function OnboardingContainer() {
  const {
    onboardingStep,
    progress,
    isFirstStep,
    isLastStep,
    totalSteps,
    nextStep,
    prevStep,
    skip,
    canProceed,
    generateWorkspace,
  } = useOnboarding();

  const CurrentStep = steps[onboardingStep].component;

  const handleNext = () => {
    if (isLastStep) {
      generateWorkspace();
    } else {
      nextStep();
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex h-14 max-w-2xl items-center justify-between px-4">
          <span className="text-lg font-semibold tracking-tight">brofounder</span>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground">
              Step {onboardingStep + 1} of {totalSteps}
            </span>
            <button
              onClick={skip}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Skip
            </button>
          </div>
        </div>
        <Progress value={progress} className="h-0.5 rounded-none bg-border [&>div]:bg-foreground" />
      </header>

      <main className="flex-1">
        <div className="mx-auto max-w-2xl px-4 pt-16 pb-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={onboardingStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              <CurrentStep />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 border-t border-border bg-background">
        <div className="mx-auto flex h-16 max-w-2xl items-center justify-between px-4">
          <Button
            variant="ghost"
            onClick={prevStep}
            disabled={isFirstStep}
            className="gap-2"
          >
            <ArrowLeft size={16} />
            Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={!canProceed}
            className="gap-2"
          >
            {isLastStep ? (
              <>
                Generate Workspace
                <Sparkles size={16} />
              </>
            ) : (
              <>
                Next
                <ArrowRight size={16} />
              </>
            )}
          </Button>
        </div>
      </footer>
    </div>
  );
}
