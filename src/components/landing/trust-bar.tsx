"use client";

import { motion } from "framer-motion";

const logos = [
  { name: "Y Combinator", abbr: "YC" },
  { name: "Techstars", abbr: "TS" },
  { name: "500 Global", abbr: "500" },
  { name: "Seedcamp", abbr: "SC" },
  { name: "Antler", abbr: "AN" },
  { name: "a16z", abbr: "a16z" },
  { name: "Sequoia", abbr: "SQ" },
  { name: "First Round", abbr: "FR" },
];

export function TrustBar() {
  return (
    <section className="relative z-10 py-16 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="mb-10 text-center text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Trusted by founders at
        </p>
      </motion.div>

      <div className="relative">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-background to-transparent" />

        <div className="animate-scroll-left flex w-max items-center gap-20">
          {[...logos, ...logos, ...logos].map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              className="flex items-center gap-2.5 text-white/20 transition-colors hover:text-white/40"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.06] text-xs font-semibold">
                {logo.abbr}
              </div>
              <span className="text-sm font-medium whitespace-nowrap">{logo.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
