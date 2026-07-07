"use client";

import { motion } from "framer-motion";
import {
  Lightbulb,
  Search,
  Crosshair,
  Users,
  Map,
  Rocket,
  DollarSign,
  Layout,
  Megaphone,
  Presentation,
  CheckCircle2,
} from "lucide-react";

const features = [
  { icon: Lightbulb, title: "Idea Validation", description: "Score your idea across demand, revenue potential, and execution difficulty with AI-powered analysis." },
  { icon: Search, title: "Market Research", description: "Deep market analysis with TAM, SAM, SOM, trends, and competitive landscape in seconds." },
  { icon: Crosshair, title: "Competitor Analysis", description: "Feature matrices, SWOT analysis, and strategic recommendations against your competition." },
  { icon: Users, title: "Customer Personas", description: "Detailed buyer personas with goals, pain points, objections, and messaging strategies." },
  { icon: Map, title: "Roadmaps", description: "Strategic product roadmaps aligned with your stage, goals, and market opportunities." },
  { icon: Rocket, title: "MVP Planning", description: "MoSCoW prioritization, development phases, and technical specifications for your MVP." },
  { icon: DollarSign, title: "Pricing Strategy", description: "Data-driven pricing recommendations based on market positioning and value metrics." },
  { icon: Layout, title: "Landing Page Generator", description: "High-converting landing page copy with positioning, taglines, and SEO optimization." },
  { icon: Megaphone, title: "Marketing Planner", description: "Full go-to-market strategy with content calendars, social posts, and launch campaigns." },
  { icon: Presentation, title: "Pitch Builder", description: "Comprehensive pitch decks, investor summaries, and fundraising strategy." },
  { icon: CheckCircle2, title: "Launch Checklist", description: "Step-by-step launch playbook from pre-launch to post-launch growth." },
];

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

export default function Features() {
  return (
    <section id="features" className="relative z-10 border-b border-border/50 py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Capabilities
          </p>
          <h2
            className="text-4xl font-normal tracking-tight sm:text-5xl"
            style={{ fontFamily: "var(--font-display-face)" }}
          >
            Everything you need to build
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            From idea validation to launch — your AI co-founder handles the heavy lifting.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={item}
              className="group rounded-xl border border-border/60 bg-card/30 p-5 transition-all duration-200 hover:border-border hover:bg-card/50"
            >
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-accent/50">
                <feature.icon size={16} className="text-foreground" />
              </div>
              <h3 className="mb-1.5 text-sm font-medium">{feature.title}</h3>
              <p className="text-xs leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
