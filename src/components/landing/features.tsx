"use client";

import { motion } from "framer-motion";
import {
  Lightbulb, Search, Crosshair, Users, Map, Rocket,
  DollarSign, Layout, Megaphone, Presentation, CheckCircle2,
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

export default function Features() {
  return (
    <section id="features" className="relative z-10 py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
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
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group cursor-default rounded-xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-white/15 hover:bg-white/[0.04]"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] transition-colors group-hover:border-white/20">
                <feature.icon size={18} className="text-foreground/70" />
              </div>
              <h3 className="mb-2 text-sm font-medium">{feature.title}</h3>
              <p className="text-[13px] leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
