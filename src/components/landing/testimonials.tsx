"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "brofounder helped me validate my idea in 2 days instead of 2 months. The market research alone saved me weeks of work.",
    name: "Alex Chen",
    title: "Founder & CEO",
    company: "RapidScale",
    yc: "YC W24",
  },
  {
    quote: "I've used every AI tool out there. brofounder is the only one that actually understands startup building, not just generating text.",
    name: "Sarah Miller",
    title: "Co-Founder",
    company: "PayFlow",
    yc: "Techstars '23",
  },
  {
    quote: "The MVP planner feature is worth its weight in gold. It helped us prioritize features that actually mattered for launch.",
    name: "Marcus Johnson",
    title: "CTO",
    company: "DataBridge",
    yc: "500 Global",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative z-10 border-b border-border/50 py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Testimonials
          </p>
          <h2
            className="text-4xl font-normal tracking-tight sm:text-5xl"
            style={{ fontFamily: "var(--font-display-face)" }}
          >
            Loved by founders
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            Join thousands of founders building with brofounder.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="group rounded-xl border border-border/60 bg-card/30 p-6 transition-all duration-200 hover:border-border hover:bg-card/50"
            >
              <Quote size={18} className="mb-4 text-muted-foreground/30" />
              <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="border-t border-border/40 pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.title}, {testimonial.company}
                    </p>
                  </div>
                  <span className="rounded-full border border-border/60 px-2.5 py-0.5 text-[10px] text-muted-foreground">
                    {testimonial.yc}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
