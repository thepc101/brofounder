"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, BarChart3, MessageSquare, Search } from "lucide-react";

const slides = [
  {
    icon: BarChart3,
    title: "Dashboard",
    description: "Your command center with AI recommendations, progress tracking, and real-time insights.",
    content: (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1.5">
            <div className="h-4 w-32 rounded-md bg-white/[0.06]" />
            <div className="h-2.5 w-48 rounded-md bg-white/[0.04]" />
          </div>
          <div className="flex gap-2">
            <div className="h-8 w-8 rounded-lg bg-white/[0.06]" />
            <div className="h-8 w-8 rounded-lg bg-white/[0.06]" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Validation", value: "87/100" },
            { label: "Market Size", value: "$12B" },
            { label: "Competitors", value: "12 found" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
              <p className="text-[10px] text-muted-foreground">{stat.label}</p>
              <p className="mt-1 text-base font-semibold">{stat.value}</p>
            </div>
          ))}
        </div>
        <div className="h-32 rounded-lg bg-white/[0.04]" />
        <div className="grid grid-cols-2 gap-3">
          <div className="h-20 rounded-lg bg-white/[0.04]" />
          <div className="h-20 rounded-lg bg-white/[0.04]" />
        </div>
      </div>
    ),
  },
  {
    icon: MessageSquare,
    title: "AI Workspace",
    description: "Chat with your AI co-founder and get structured outputs — business plans, roadmaps, and more.",
    content: (
      <div className="grid grid-cols-[1fr_1.5fr] gap-3">
        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
          <div className="space-y-2">
            {["Help me validate my SaaS idea", "Here's the market analysis", "What about pricing?"].map(
              (msg, i) => (
                <div
                  key={i}
                  className={`rounded-lg px-2.5 py-1.5 text-[11px] ${
                    i % 2 === 0
                      ? "ml-4 bg-white/10 text-white"
                      : "mr-4 bg-white/[0.04] text-muted-foreground"
                  }`}
                >
                  {msg}
                </div>
              )
            )}
          </div>
          <div className="mt-3 flex items-center gap-2 border-t border-white/[0.06] pt-2.5">
            <div className="h-7 flex-1 rounded-md bg-white/[0.04]" />
            <div className="h-7 w-7 rounded-md bg-white/[0.06]" />
          </div>
        </div>
        <div className="space-y-2">
          {["Business Summary", "Market Analysis", "Roadmap", "Pricing", "GTM Strategy"].map((s) => (
            <div key={s} className="rounded-md border border-white/[0.06] bg-white/[0.02] px-3 py-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-muted-foreground">{s}</span>
                <div className="h-3 w-3 rounded bg-white/[0.06]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    icon: Search,
    title: "Research Engine",
    description: "Deep market research, competitor analysis, and strategic insights generated automatically.",
    content: (
      <div className="space-y-3">
        <div className="flex gap-2">
          {["Market", "Competitors", "SWOT", "Trends", "Porter's Five"].map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[10px] text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
            <p className="text-[10px] text-muted-foreground">Total Addressable Market</p>
            <p className="mt-1 text-2xl font-bold">$50B</p>
          </div>
          <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
            <p className="text-[10px] text-muted-foreground">Serviceable Market</p>
            <p className="mt-1 text-2xl font-bold">$12B</p>
          </div>
        </div>
        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
          <p className="text-[10px] text-muted-foreground mb-2">SWOT Analysis</p>
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-md bg-white/[0.04] p-2">
              <p className="text-[9px] font-medium text-muted-foreground">Strengths</p>
              <div className="mt-1.5 space-y-1">
                <div className="h-1.5 w-full rounded bg-white/[0.08]" />
                <div className="h-1.5 w-3/4 rounded bg-white/[0.08]" />
              </div>
            </div>
            <div className="rounded-md bg-white/[0.04] p-2">
              <p className="text-[9px] font-medium text-muted-foreground">Opportunities</p>
              <div className="mt-1.5 space-y-1">
                <div className="h-1.5 w-full rounded bg-white/[0.08]" />
                <div className="h-1.5 w-2/3 rounded bg-white/[0.08]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
];

export default function Preview() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, [paused, next]);

  return (
    <section id="preview" className="relative z-10 py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Product
          </p>
          <h2
            className="text-4xl font-normal tracking-tight sm:text-5xl"
            style={{ fontFamily: "var(--font-display-face)" }}
          >
            See it in action
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            A peek inside your AI co-founder workspace.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-16"
        >
          {/* Dot indicators */}
          <div className="mb-6 flex items-center justify-center gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`carousel-dot ${i === current ? "active" : ""}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          {/* Carousel */}
          <div
            className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02]"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="p-8 sm:p-10"
              >
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04]">
                    {(() => {
                      const Icon = slides[current].icon;
                      return <Icon size={16} className="text-foreground/70" />;
                    })()}
                  </div>
                  <div>
                    <h3
                      className="text-lg font-normal"
                      style={{ fontFamily: "var(--font-display-face)" }}
                    >
                      {slides[current].title}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {slides[current].description}
                    </p>
                  </div>
                </div>
                {slides[current].content}
              </motion.div>
            </AnimatePresence>

            {/* Nav buttons */}
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/[0.1] bg-background/80 p-2 text-muted-foreground backdrop-blur-sm transition-all hover:border-white/[0.2] hover:text-foreground"
              aria-label="Previous"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/[0.1] bg-background/80 p-2 text-muted-foreground backdrop-blur-sm transition-all hover:border-white/[0.2] hover:text-foreground"
              aria-label="Next"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Title indicators */}
          <div className="mt-6 flex items-center justify-center gap-8">
            {slides.map((slide, i) => {
              const Icon = slide.icon;
              return (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`flex items-center gap-2 text-sm transition-colors ${
                    i === current
                      ? "text-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground/80"
                  }`}
                >
                  <Icon size={14} />
                  {slide.title}
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
