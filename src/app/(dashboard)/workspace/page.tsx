"use client";

import { useState } from "react";
import {
  Activity,
  BarChart3,
  Bot,
  CalendarClock,
  CheckCircle2,
  FileText,
  Flame,
  Gauge,
  Globe2,
  Handshake,
  LayoutGrid,
  LineChart,
  Loader2,
  Play,
  Radar,
  Rocket,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import { WorkspaceChat } from "@/components/workspace/workspace-chat";
import { WorkspaceOutput } from "@/components/workspace/workspace-output";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const operatingMetrics = [
  { label: "Runway focus", value: "12 wk", detail: "free plan", icon: Gauge },
  { label: "Validation", value: "74", detail: "+8 this week", icon: Radar },
  { label: "Launch risk", value: "Low", detail: "3 blockers", icon: ShieldCheck },
  { label: "Next win", value: "5 leads", detail: "today", icon: Flame },
];

const agentTeams = [
  {
    name: "Research Desk",
    icon: Search,
    status: "Ready",
    prompt: "Find market shifts, citations, competitor moves, and pricing opportunities.",
  },
  {
    name: "Growth Operator",
    icon: LineChart,
    status: "Armed",
    prompt: "Generate weekly acquisition experiments, copy, channels, and success metrics.",
  },
  {
    name: "Product PM",
    icon: LayoutGrid,
    status: "Sequencing",
    prompt: "Convert fuzzy customer pain into MVP scope, PRDs, and launch milestones.",
  },
  {
    name: "Investor Chief",
    icon: Handshake,
    status: "Polishing",
    prompt: "Tighten narrative, milestones, proof, target investor lists, and follow-up emails.",
  },
];

const workflows = [
  { icon: Target, title: "Idea to ICP", desc: "Score the wedge, persona, urgency, budget, and channels." },
  { icon: Users, title: "Lead Miner", desc: "Inspect directories or websites and turn them into outreach targets." },
  { icon: CalendarClock, title: "Launch Sprint", desc: "Plan a 14-day Product Hunt, Reddit, LinkedIn, and email push." },
  { icon: FileText, title: "Fundraise Room", desc: "Build memo, deck outline, objections, and investor updates." },
  { icon: Rocket, title: "MVP Builder", desc: "Turn a feature thesis into screens, data model, and API tasks." },
  { icon: BarChart3, title: "Pricing Lab", desc: "Compare competitors and suggest packaging that can convert." },
];

function MetricStrip() {
  return (
    <div className="grid grid-cols-2 gap-2 xl:grid-cols-4">
      {operatingMetrics.map((item) => (
        <div key={item.label} className="rounded-lg border border-white/10 bg-white/[0.025] p-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.16em] text-white/25">{item.label}</span>
            <item.icon size={14} className="text-sky-300/55" />
          </div>
          <div className="mt-2 flex items-end gap-2">
            <span className="text-xl font-semibold tracking-tight text-white/80">{item.value}</span>
            <span className="pb-1 text-[11px] text-emerald-300/55">{item.detail}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function WebTabAgentPanel() {
  const [url, setUrl] = useState("https://aicofounder.com");
  const [loadedUrl, setLoadedUrl] = useState("https://aicofounder.com");
  const [focus, setFocus] = useState("Find positioning gaps, conversion ideas, pricing signals, and features we can beat.");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const normalizedUrl = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return "";
    return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  };

  const openTab = () => {
    const next = normalizedUrl(url);
    if (next) setLoadedUrl(next);
  };

  const analyzeOpenTab = async () => {
    const target = normalizedUrl(loadedUrl || url);
    if (!target) return;
    setLoading(true);
    setError("");
    setAnalysis("");

    try {
      const response = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `Analyze this open web tab as my agentic AI co-founder: ${target}\nFocus: ${focus}\nReturn a founder-grade brief with what the page does, proof signals, gaps, counter-positioning, feature ideas, and three immediate actions.`,
          history: [],
          quality: "high",
        }),
      });

      if (!response.ok) throw new Error("The agent could not analyze this tab.");
      const data = await response.json();
      setAnalysis(data.message || "Analysis complete.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[520px] flex-col overflow-hidden rounded-lg border border-white/10 bg-[#080b12]">
      <div className="flex flex-wrap items-center gap-2 border-b border-white/10 bg-white/[0.025] p-2.5">
        <div className="flex min-w-[260px] flex-1 items-center gap-2 rounded-md border border-white/10 bg-black/25 px-2.5">
          <Globe2 size={14} className="text-white/25" />
          <Input
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            onKeyDown={(event) => event.key === "Enter" && openTab()}
            className="h-8 border-0 bg-transparent px-0 text-[12px] text-white/70 shadow-none focus-visible:ring-0"
          />
        </div>
        <Button onClick={openTab} size="sm" className="h-8 gap-1.5 rounded-md bg-white/[0.08] text-[11px] text-white/70 hover:bg-white/[0.12]">
          <Globe2 size={13} /> Open
        </Button>
        <Button onClick={analyzeOpenTab} disabled={loading} size="sm" className="h-8 gap-1.5 rounded-md bg-sky-500/15 text-[11px] text-sky-200/80 hover:bg-sky-500/20">
          {loading ? <Loader2 size={13} className="animate-spin" /> : <Sparkles size={13} />}
          Let AI See It
        </Button>
      </div>

      <div className="grid flex-1 grid-cols-1 lg:grid-cols-[1.4fr_0.9fr]">
        <div className="min-h-[360px] border-b border-white/10 lg:border-b-0 lg:border-r">
          <iframe
            src={loadedUrl}
            title="Agent web tab"
            className="h-full min-h-[360px] w-full bg-white"
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
          />
        </div>
        <div className="flex min-h-[360px] flex-col">
          <div className="border-b border-white/10 p-3">
            <div className="flex items-center gap-2">
              <Bot size={14} className="text-sky-300/60" />
              <span className="text-[13px] font-medium text-white/75">Browser Intelligence</span>
            </div>
            <Textarea
              value={focus}
              onChange={(event) => setFocus(event.target.value)}
              className="mt-3 min-h-[74px] resize-none rounded-lg border-white/10 bg-white/[0.035] text-[12px] leading-relaxed text-white/60"
            />
          </div>
          <ScrollArea className="flex-1">
            <div className="p-3">
              {error && (
                <div className="rounded-lg border border-red-400/15 bg-red-500/[0.05] p-3 text-[12px] text-red-200/70">
                  {error}
                </div>
              )}
              {loading && (
                <div className="flex items-center gap-2 rounded-lg border border-sky-300/10 bg-sky-500/[0.04] p-3 text-[12px] text-sky-100/65">
                  <Loader2 size={14} className="animate-spin" /> Reading the tab, extracting signals, and forming a founder brief...
                </div>
              )}
              {!loading && !analysis && !error && (
                <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4 text-[12px] leading-relaxed text-white/35">
                  Open a competitor, landing page, directory, investor list, pricing page, or customer forum. The AI can inspect the URL, summarize what matters, and turn it into actions.
                </div>
              )}
              {analysis && (
                <div className="whitespace-pre-wrap rounded-lg border border-white/10 bg-white/[0.025] p-4 text-[12px] leading-relaxed text-white/62">
                  {analysis}
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}

function FounderOpsPanel() {
  const [selected, setSelected] = useState(agentTeams[0].name);

  return (
    <div className="grid gap-3 xl:grid-cols-[0.95fr_1.05fr]">
      <div className="rounded-lg border border-white/10 bg-white/[0.025] p-3">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <p className="text-[13px] font-medium text-white/75">Agent Teams</p>
            <p className="text-[11px] text-white/25">Specialized operators for founder workflows</p>
          </div>
          <Activity size={15} className="text-emerald-300/55" />
        </div>
        <div className="space-y-1.5">
          {agentTeams.map((team) => (
            <button
              key={team.name}
              onClick={() => setSelected(team.name)}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-all",
                selected === team.name
                  ? "border-sky-300/20 bg-sky-500/[0.07]"
                  : "border-white/8 bg-white/[0.015] hover:bg-white/[0.04]"
              )}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-white/[0.06]">
                <team.icon size={15} className={selected === team.name ? "text-sky-200/75" : "text-white/35"} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-[13px] font-medium text-white/70">{team.name}</p>
                  <span className="rounded-full bg-emerald-400/10 px-2 py-0.5 text-[10px] text-emerald-200/60">
                    {team.status}
                  </span>
                </div>
                <p className="mt-1 text-[11px] leading-relaxed text-white/28">{team.prompt}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-white/10 bg-white/[0.025] p-3">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <p className="text-[13px] font-medium text-white/75">Founder Playbooks</p>
            <p className="text-[11px] text-white/25">Polished workflows that turn AI output into movement</p>
          </div>
          <Button size="sm" className="h-8 gap-1.5 rounded-md bg-white/[0.08] text-[11px] text-white/70 hover:bg-white/[0.12]">
            <Play size={12} /> Run Sprint
          </Button>
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          {workflows.map((item) => (
            <div key={item.title} className="rounded-lg border border-white/10 bg-black/15 p-3">
              <div className="mb-2 flex items-center gap-2">
                <item.icon size={14} className="text-sky-200/60" />
                <span className="text-[12px] font-medium text-white/70">{item.title}</span>
              </div>
              <p className="text-[11px] leading-relaxed text-white/30">{item.desc}</p>
              <div className="mt-3 flex items-center gap-1 text-[10px] text-white/22">
                <CheckCircle2 size={11} className="text-emerald-300/45" /> Templates, tools, and exports ready
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function WorkspacePage() {
  return (
    <div className="flex h-full overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.08),transparent_30%),#05070c]">
      <div className="w-[390px] shrink-0 border-r border-white/10">
        <WorkspaceChat />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="border-b border-white/10 px-4 py-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-sky-500/12">
                  <Sparkles size={15} className="text-sky-200/75" />
                </div>
                <h1 className="text-[16px] font-semibold tracking-tight text-white/85">Founder Command Center</h1>
              </div>
              <p className="mt-1 text-[11px] text-white/28">
                Browse, research, plan, write, and ship with agent teams designed for solo founders.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" className="h-8 gap-1.5 rounded-md bg-white/[0.08] text-[11px] text-white/70 hover:bg-white/[0.12]">
                <Send size={12} /> Share Brief
              </Button>
              <Button size="sm" className="h-8 gap-1.5 rounded-md bg-emerald-500/15 text-[11px] text-emerald-100/75 hover:bg-emerald-500/20">
                <Rocket size={12} /> Launch Sprint
              </Button>
            </div>
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="space-y-3 p-4">
            <MetricStrip />
            <WebTabAgentPanel />
            <FounderOpsPanel />
            <div className="grid gap-3 xl:grid-cols-[1fr_420px]">
              <div className="rounded-lg border border-white/10 bg-white/[0.025] p-3">
                <div className="mb-3 flex items-center gap-2">
                  <Sparkles size={14} className="text-sky-200/60" />
                  <span className="text-[13px] font-medium text-white/75">Board-Level Next Moves</span>
                </div>
                <div className="grid gap-2 md:grid-cols-3">
                  {["Validate the painful wedge", "Steal the pricing frame", "Ship the proof loop"].map((title, index) => (
                    <div key={title} className="rounded-lg border border-white/10 bg-black/15 p-3">
                      <span className="text-[10px] uppercase tracking-[0.16em] text-white/20">Move 0{index + 1}</span>
                      <p className="mt-2 text-[13px] font-medium text-white/72">{title}</p>
                      <p className="mt-1 text-[11px] leading-relaxed text-white/30">
                        Convert research into one public artifact, one customer conversation, and one measurable experiment.
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="min-h-[320px] overflow-hidden rounded-lg border border-white/10 bg-white/[0.02]">
                <WorkspaceOutput />
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
