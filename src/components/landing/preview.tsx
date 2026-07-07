"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const slides = [
  {
    title: "Dashboard",
    description: "Your command center with AI recommendations, progress tracking, and real-time insights.",
    content: (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="h-4 w-32 rounded bg-muted" />
            <div className="h-3 w-48 rounded bg-muted" />
          </div>
          <div className="flex gap-2">
            <div className="h-8 w-8 rounded-md bg-muted" />
            <div className="h-8 w-8 rounded-md bg-muted" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-lg border border-border p-4">
              <div className="h-3 w-20 rounded bg-muted mb-2" />
              <div className="h-8 w-16 rounded bg-muted" />
            </div>
          ))}
        </div>
        <div className="h-32 rounded-lg bg-muted" />
      </div>
    ),
  },
  {
    title: "AI Workspace",
    description: "Chat with your AI co-founder and get structured outputs — business plans, roadmaps, and more.",
    content: (
      <div className="grid grid-cols-[1fr_1.5fr] gap-4">
        <div className="rounded-lg border border-border p-3">
          <div className="space-y-3">
            {["I need help with my MVP plan", "Here's a suggested roadmap"].map((msg, i) => (
              <div
                key={i}
                className={cn(
                  "rounded-lg px-3 py-2 text-xs",
                  i === 0 ? "bg-primary text-primary-foreground ml-8" : "bg-accent mr-8"
                )}
              >
                {msg}
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-2 border-t border-border pt-3">
            <div className="h-7 flex-1 rounded-md bg-muted" />
            <div className="h-7 w-7 rounded-md bg-muted" />
          </div>
        </div>
        <div className="space-y-2">
          {["Roadmap", "Features", "Timeline"].map((s) => (
            <div key={s} className="rounded-md border border-border p-2">
              <div className="h-3 w-16 rounded bg-muted" />
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
          {["Market", "Competitors", "SWOT", "Porter's Five"].map((t) => (
            <div key={t} className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
              {t}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-border p-3">
            <div className="h-3 w-24 rounded bg-muted mb-2" />
            <div className="h-6 w-16 rounded bg-muted" />
          </div>
          <div className="rounded-lg border border-border p-3">
            <div className="h-3 w-24 rounded bg-muted mb-2" />
            <div className="h-6 w-16 rounded bg-muted" />
          </div>
        </div>
        <div className="h-20 rounded-lg bg-muted" />
      </div>
    ),
  },
];

export default function Preview() {
  const [current, setCurrent] = useState(0);

  return (
    <section id="preview" className="border-b border-border py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            See it in action
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A peek inside your AI co-founder workspace.
          </p>
        </div>
        <div className="mt-16">
          <div className="flex items-center justify-center gap-4 mb-8">
            {slides.map((slide, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={cn(
                  "text-sm transition-colors",
                  i === current
                    ? "text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {slide.title}
              </button>
            ))}
          </div>
          <div className="relative overflow-hidden rounded-lg border border-border bg-card">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="p-6 sm:p-10"
              >
                <h3 className="text-lg font-semibold mb-2">{slides[current].title}</h3>
                <p className="text-sm text-muted-foreground mb-8">{slides[current].description}</p>
                {slides[current].content}
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="mt-6 flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrent(Math.max(0, current - 1))}
              disabled={current === 0}
            >
              <ChevronLeft size={16} />
            </Button>
            <span className="text-sm text-muted-foreground">
              {current + 1} / {slides.length}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrent(Math.min(slides.length - 1, current + 1))}
              disabled={current === slides.length - 1}
            >
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
