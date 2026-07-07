import Link from "next/link";
import {
  Search,
  Target,
  BarChart3,
  MessageSquare,
  FileText,
  Code2,
  Compass,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: MessageSquare,
    title: "Agentic AI Workspace",
    description:
      "Chat with an AI co-founder that browses the web, researches markets, and executes multi-step tasks autonomously. Not a chatbot — an agent.",
  },
  {
    icon: Search,
    title: "Market Research",
    description:
      "Deep market analysis with TAM/SAM/SOM sizing, trend identification, search intent data, and competitive landscape mapping.",
  },
  {
    icon: Target,
    title: "Idea Validation",
    description:
      "Score your idea across 8 dimensions with radar charts. Get honest, evidence-based feedback on viability before you build.",
  },
  {
    icon: BarChart3,
    title: "Competitor Intelligence",
    description:
      "Drop in a competitor URL and get instant analysis: positioning, pricing, strengths, weaknesses, and gaps you can exploit.",
  },
  {
    icon: Compass,
    title: "MVP Planning",
    description:
      "AI-generated roadmaps with MoSCoW prioritization, development phases, timeline estimates, and resource planning.",
  },
  {
    icon: FileText,
    title: "Document Generation",
    description:
      "Generate pitch decks, business plans, PRDs, and investor summaries — all tailored to your specific startup.",
  },
  {
    icon: Code2,
    title: "Code Generation",
    description:
      "Generate landing pages, API endpoints, database schemas, and fullstack code scaffolds from natural language.",
  },
  {
    icon: Zap,
    title: "Marketing Engine",
    description:
      "AI-powered positioning, messaging, content calendars, and launch checklists — all grounded in your market research.",
  },
];

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-serif text-4xl font-medium tracking-tight sm:text-5xl">
            Everything you need to go from idea to launch
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Brofounder combines deep market research, strategic planning, and
            content generation into one AI-powered workspace. Your co-founder
            works while you sleep.
          </p>
        </div>

        <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:bg-white/[0.04]"
            >
              <feature.icon className="h-5 w-5 text-blue-400" />
              <h3 className="mt-4 font-medium">{feature.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-24 rounded-xl border border-white/10 bg-white/[0.02] p-12 text-center">
          <h2 className="text-3xl font-medium">See it in action</h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Try Brofounder free and see how your AI co-founder transforms a raw
            idea into a launch-ready plan.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link
              href="/signup"
              className="inline-flex h-11 items-center justify-center rounded-lg bg-white px-8 text-sm font-medium text-black transition-all hover:bg-white/90"
            >
              Start Free Trial
            </Link>
            <Link
              href="/login"
              className="inline-flex h-11 items-center justify-center rounded-lg border border-white/15 px-8 text-sm font-medium transition-colors hover:bg-white/[0.05]"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
