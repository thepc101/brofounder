// Startup stages
export type StartupStage = 'idea' | 'validating' | 'building-mvp' | 'growing' | 'scaling';

// Business models
export type BusinessModel = 'saas' | 'marketplace' | 'ecommerce' | 'ai' | 'agency' | 'consumer' | 'other';

// Team sizes
export type TeamSize = 'solo' | '2-3' | '4-10' | '11-50' | '50+';

// Experience levels
export type ExperienceLevel = 'first-time' | 'some-experience' | 'experienced' | 'serial-entrepreneur';

// Goals
export type FounderGoal = 'generate-mvp' | 'validate' | 'raise-funding' | 'find-pmf' | 'launch' | 'scale';

// Onboarding data
export interface OnboardingData {
  idea: string;
  stage: StartupStage | '';
  problem: string;
  customer: string;
  industry: string;
  businessModel: BusinessModel | '';
  country: string;
  team: TeamSize | '';
  experience: ExperienceLevel | '';
  challenge: string;
  goals: FounderGoal[];
  extra: string;
}

// Project
export interface Project {
  id: string;
  name: string;
  description: string;
  stage: StartupStage;
  createdAt: string;
  updatedAt: string;
  onboardingData: OnboardingData;
}

// Workspace
export interface WorkspaceSection {
  id: string;
  title: string;
  content: string;
  type: 'summary' | 'problem' | 'solution' | 'icp' | 'market' | 'competition' | 'pricing' | 'gtm' | 'risks' | 'next-steps';
  editable: boolean;
}

export interface WorkspaceMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

// Research
export interface MarketResearch {
  tam: string;
  sam: string;
  som: string;
  trends: string[];
  painPoints: string[];
  searchIntent: string;
  buyingBehavior: string;
}

export interface CompetitorInfo {
  name: string;
  description: string;
  strengths: string[];
  weaknesses: string[];
  pricing: string;
  marketShare?: string;
  founded?: string;
}

export interface SWOT {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

export interface PorterFiveForces {
  threatOfNewEntrants: string;
  bargainingPowerOfBuyers: string;
  bargainingPowerOfSuppliers: string;
  threatOfSubstitutes: string;
  rivalryIntensity: string;
}

// Validation
export interface ValidationResult {
  ideaScore: number;
  demandScore: number;
  executionDifficulty: number;
  revenuePotential: number;
  competitionLevel: number;
  aiConfidence: number;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
}

// Persona
export interface CustomerPersona {
  name: string;
  age: string;
  role: string;
  goals: string[];
  painPoints: string[];
  objections: string[];
  buyingTriggers: string[];
  preferredPlatforms: string[];
  dailyWorkflow: string;
  messagingStrategy: string;
}

// MVP
export interface MVPPlan {
  roadmap: RoadmapItem[];
  priorities: MoscowItem[];
  phases: DevelopmentPhase[];
  technicalSuggestions: string[];
  timeline: string;
}

export interface RoadmapItem {
  phase: string;
  tasks: string[];
  duration: string;
}

export interface MoscowItem {
  category: 'must-have' | 'should-have' | 'could-have' | 'wont-have';
  features: string[];
}

export interface DevelopmentPhase {
  name: string;
  duration: string;
  tasks: string[];
  deliverables: string[];
}

// Marketing
export interface MarketingPlan {
  positioning: string;
  tagline: string;
  landingPageCopy: string;
  seoStrategy: string;
  launchStrategy: string;
  socialPosts: string[];
  emailCampaign: EmailCampaign;
  productHuntChecklist: string[];
  redditStrategy: string;
  contentRoadmap: ContentItem[];
}

export interface EmailCampaign {
  subject: string;
  preview: string;
  sequence: EmailItem[];
}

export interface EmailItem {
  day: number;
  subject: string;
  body: string;
}

export interface ContentItem {
  topic: string;
  format: string;
  channel: string;
  date: string;
}

// Documents
export interface Document {
  id: string;
  title: string;
  type: 'pitch-deck' | 'business-plan' | 'prd' | 'tech-roadmap' | 'investor-summary' | 'marketing-plan';
  content: string;
  createdAt: string;
  updatedAt: string;
  exported: boolean;
}

// Activity
export interface Activity {
  id: string;
  type: 'research' | 'validation' | 'workspace' | 'document' | 'marketing' | 'mvp' | 'audience' | 'competitors';
  title: string;
  description: string;
  timestamp: string;
}

// Task
export interface Task {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string;
  priority: 'low' | 'medium' | 'high';
}

// Dashboard
export interface DashboardData {
  project: Project | null;
  progress: number;
  recommendations: string[];
  recentActivity: Activity[];
  todayTasks: Task[];
  validationScore: number;
  marketOpportunity: number;
}
