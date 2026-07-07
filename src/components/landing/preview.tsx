"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const slides = [
  {
    title: "Dashboard",
    description: "Your command center with AI recommendations, progress tracking, and real-time insights.",
    content: (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1.5">
            <div className="h-4 w-32 rounded-md bg-muted" />
            <div className="h-3 w-48 rounded-md bg-muted" />
          </div>
          <div className="flex gap-2">
            <div className="h-8 w-8 rounded-lg bg-muted" />
            <div className="h-8 w-8 rounded-lg bg-muted" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Validation Score", value: "87" },
            { label: "Market Size", value: "$12B" },
            { label: "Competitors", value: "12" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-lg border border-border/60 p-3">
              <p className="text-[10px] text-muted-foreground">{stat.label}</p>
              <p className="mt-1 text-lg font-semibold">{stat.value}</p>
            </div>
          ))}
        </div>
        <div className="h-28 rounded-lg bg-muted" />
        <div className="grid grid-cols-2 gap-3">
          <div className="h-20 rounded-lg bg-muted" />
          <div className="h-20 rounded-lg bg-muted" />
        </div>
      </div>
    ),
  },
  {
    title: "AI Workspace",
    description: "Chat with your AI co-founder and get structured outputs — business plans, roadmaps, and more.",
    content: (
      <div className="grid grid-cols-[1fr_1.5fr] gap-3">
        <div className="rounded-lg border border-border/60 p-3">
          <div className="space-y-2.5">
            {["I need help with my MVP plan", "Here's a suggested roadmap", "What about pricing?"].map(
              (msg, i) => (
                <div
                  key={i}
                  className={`rounded-lg px-2.5 py-1.5 text-[11px] ${
                    i % 2 === 0
                      ? "ml-6 bg-primary text-primary-foreground"
                      : "mr-6 bg-accent"
                  }`}
                >
                  {msg}
                </div>
              )
            )}
          </div>
          <div className="mt-3 flex items-center gap-2 border-t border-border/60 pt-2.5">
            <div className="h-7 flex-1 rounded-md bg-muted" />
            <div className="h-7 w-7 rounded-md bg-muted" />
          </div>
        </div>
        <div className="space-y-2">
          {["Business Summary", "Roadmap", "Features", "Timeline", "Pricing"].map((s) => (
            <div key={s} className="rounded-md border border-border/60 px-3 py-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-muted-foreground">{s}</span>
                <div className="h-3 w-3 rounded bg-muted" />
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "Research Engine",
    description: "Deep market research, competitor analysis, and strategic insights generated automatically.",
    content: (
      <div className="space-y-3">
        <div className="flex gap-2">
          {["Market", "Competitors", "SWOT", "Porter's Five", "Trends"].map((t) => (
            <span
              key={t}
              className="rounded-full border border-border/60 px-3 py-1 text-[10px] text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-border/60 p-3">
            <p className="text-[10px] text-muted-foreground mb-1">TAM</p>
            <p className="text-xl font-bold">$50B</p>
          </div>
          <div className="rounded-lg border border-border/60 p-3">
            <p className="text-[10px] text-muted-foreground mb-1">SAM</p>
            <p className="text-xl font-bold">$12B</p>
          </div>
        </div>
        <div className="rounded-lg border border-border/60 p-3">
          <p className="text-[10px] text-muted-foreground mb-2">SWOT Analysis</p>
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-md bg-accent/50 p-2">
              <p className="text-[9px] font-medium text-muted-foreground">Strengths</p>
              <div className="mt-1 space-y-0.5">
                <div className="h-2 w-full rounded bg-muted" />
                <div className="h-2 w-3/4 rounded bg-muted" />
              </div>
            </div>
            <div className="rounded-md bg-accent/50 p-2">
              <p className="text-[9px] font-medium text-muted-foreground">Weaknesses</p>
              <div className="mt-1 space-y-0.5">
                <div className="h-2 w-full rounded bg-muted" />
                <div className="h-2 w-3/4 rounded bg-muted" />
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
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [paused, next]);

  return (
    <section id="preview" className="relative z-10 border-b border-border/50 py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
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
        </div>

        <div className="mt-16">
          {/* Tab indicators */}
          <div className="mb-8 flex items-center justify-center gap-1">
            {slides.map((slide, i) => (
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
            className="relative overflow-hidden rounded-xl border border-border/60 bg-card/30"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="p-8 sm:p-12"
              >
                <div className="mb-6">
                  <h3
                    className="text-xl font-normal"
                    style={{ fontFamily: "var(--font-display-face)" }}
                  >
                    {slides[current].title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {slides[current].description}
                  </p>
                </div>
                {slides[current].content}
              </motion.div>
            </AnimatePresence>

            {/* Nav buttons */}
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-border/60 bg-background/80 p-2 text-muted-foreground backdrop-blur-sm transition-colors hover:text-foreground"
              aria-label="Previous slide"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-border/60 bg-background/80 p-2 text-muted-foreground backdrop-blur-sm transition-colors hover:text-foreground"
              aria-label="Next slide"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Slide title indicators */}
          <div className="mt-6 flex items-center justify-center gap-6">
            {slides.map((slide, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`text-sm transition-colors ${
                  i === current
                    ? "text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {slide.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
