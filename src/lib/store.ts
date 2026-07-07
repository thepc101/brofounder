import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  OnboardingData,
  Project,
  WorkspaceMessage,
  WorkspaceSection,
  ValidationResult,
  MarketResearch,
  CompetitorInfo,
  SWOT,
  PorterFiveForces,
  CustomerPersona,
  MVPPlan,
  MarketingPlan,
  Document,
  Activity,
  Task,
  DashboardData,
} from "@/types";
import { generateId } from "./utils";

interface AppState {
  // Auth
  isAuthenticated: boolean;
  user: { name: string; email: string; avatar?: string } | null;
  setAuth: (user: { name: string; email: string; avatar?: string }) => void;
  hydrateFromSupabase: (user: { name: string; email: string; avatar?: string }) => void;
  logout: () => void;

  // Onboarding
  onboardingData: OnboardingData;
  onboardingStep: number;
  onboardingComplete: boolean;
  setOnboardingData: (data: Partial<OnboardingData>) => void;
  setOnboardingStep: (step: number) => void;
  completeOnboarding: () => void;
  resetOnboarding: () => void;

  // Project
  project: Project | null;
  setProject: (project: Project) => void;

  // Workspace
  workspaceMessages: WorkspaceMessage[];
  workspaceSections: WorkspaceSection[];
  isGenerating: boolean;
  addWorkspaceMessage: (message: WorkspaceMessage) => void;
  setWorkspaceSections: (sections: WorkspaceSection[]) => void;
  updateWorkspaceSection: (id: string, content: string) => void;
  setIsGenerating: (generating: boolean) => void;
  clearWorkspace: () => void;

  // Research
  marketResearch: MarketResearch | null;
  competitors: CompetitorInfo[];
  swot: SWOT | null;
  porterFiveForces: PorterFiveForces | null;
  setMarketResearch: (data: MarketResearch) => void;
  setCompetitors: (data: CompetitorInfo[]) => void;
  setSwot: (data: SWOT) => void;
  setPorterFiveForces: (data: PorterFiveForces) => void;

  // Validation
  validationResult: ValidationResult | null;
  setValidationResult: (data: ValidationResult) => void;

  // Personas
  personas: CustomerPersona[];
  setPersonas: (data: CustomerPersona[]) => void;

  // MVP
  mvpPlan: MVPPlan | null;
  setMvpPlan: (data: MVPPlan) => void;

  // Marketing
  marketingPlan: MarketingPlan | null;
  setMarketingPlan: (data: MarketingPlan) => void;

  // Documents
  documents: Document[];
  addDocument: (doc: Document) => void;
  updateDocument: (id: string, data: Partial<Document>) => void;

  // Activity
  activities: Activity[];
  addActivity: (activity: Activity) => void;

  // Tasks
  tasks: Task[];
  addTask: (task: Task) => void;
  toggleTask: (id: string) => void;

  // UI
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
}

const defaultOnboardingData: OnboardingData = {
  idea: "",
  stage: "",
  problem: "",
  customer: "",
  industry: "",
  businessModel: "",
  country: "",
  team: "",
  experience: "",
  challenge: "",
  goals: [],
  extra: "",
};

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Auth
      isAuthenticated: false,
      user: null,
      setAuth: (user) => set({ isAuthenticated: true, user }),
      hydrateFromSupabase: (user) => set({ isAuthenticated: true, user }),
      logout: () => set({ isAuthenticated: false, user: null }),

      // Onboarding
      onboardingData: defaultOnboardingData,
      onboardingStep: 0,
      onboardingComplete: false,
      setOnboardingData: (data) =>
        set((state) => ({
          onboardingData: { ...state.onboardingData, ...data },
        })),
      setOnboardingStep: (step) => set({ onboardingStep: step }),
      completeOnboarding: () => set({ onboardingComplete: true, onboardingStep: 0 }),
      resetOnboarding: () =>
        set({
          onboardingData: defaultOnboardingData,
          onboardingStep: 0,
          onboardingComplete: false,
        }),

      // Project
      project: null,
      setProject: (project) => set({ project }),

      // Workspace
      workspaceMessages: [],
      workspaceSections: [],
      isGenerating: false,
      addWorkspaceMessage: (message) =>
        set((state) => ({
          workspaceMessages: [...state.workspaceMessages, message],
        })),
      setWorkspaceSections: (sections) => set({ workspaceSections: sections }),
      updateWorkspaceSection: (id, content) =>
        set((state) => ({
          workspaceSections: state.workspaceSections.map((s) =>
            s.id === id ? { ...s, content } : s
          ),
        })),
      setIsGenerating: (generating) => set({ isGenerating: generating }),
      clearWorkspace: () =>
        set({ workspaceMessages: [], workspaceSections: [] }),

      // Research
      marketResearch: null,
      competitors: [],
      swot: null,
      porterFiveForces: null,
      setMarketResearch: (data) => set({ marketResearch: data }),
      setCompetitors: (data) => set({ competitors: data }),
      setSwot: (data) => set({ swot: data }),
      setPorterFiveForces: (data) => set({ porterFiveForces: data }),

      // Validation
      validationResult: null,
      setValidationResult: (data) => set({ validationResult: data }),

      // Personas
      personas: [],
      setPersonas: (data) => set({ personas: data }),

      // MVP
      mvpPlan: null,
      setMvpPlan: (data) => set({ mvpPlan: data }),

      // Marketing
      marketingPlan: null,
      setMarketingPlan: (data) => set({ marketingPlan: data }),

      // Documents
      documents: [],
      addDocument: (doc) =>
        set((state) => ({ documents: [...state.documents, doc] })),
      updateDocument: (id, data) =>
        set((state) => ({
          documents: state.documents.map((d) =>
            d.id === id ? { ...d, ...data } : d
          ),
        })),

      // Activity
      activities: [],
      addActivity: (activity) =>
        set((state) => ({
          activities: [activity, ...state.activities].slice(0, 50),
        })),

      // Tasks
      tasks: [],
      addTask: (task) =>
        set((state) => ({ tasks: [...state.tasks, task] })),
      toggleTask: (id) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id ? { ...t, completed: !t.completed } : t
          ),
        })),

      // UI
      sidebarOpen: true,
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      commandPaletteOpen: false,
      setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),
    }),
    {
      name: "brofounder-store",
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        onboardingData: state.onboardingData,
        onboardingStep: state.onboardingStep,
        onboardingComplete: state.onboardingComplete,
        project: state.project,
        workspaceMessages: state.workspaceMessages,
        workspaceSections: state.workspaceSections,
        marketResearch: state.marketResearch,
        competitors: state.competitors,
        swot: state.swot,
        porterFiveForces: state.porterFiveForces,
        validationResult: state.validationResult,
        personas: state.personas,
        mvpPlan: state.mvpPlan,
        marketingPlan: state.marketingPlan,
        documents: state.documents,
        activities: state.activities,
        tasks: state.tasks,
      }),
    }
  )
);
