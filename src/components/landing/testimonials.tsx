"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "brofounder helped me validate my idea in 2 days instead of 2 months. The market research alone saved me weeks of work.",
    name: "Alex Chen",
    title: "Founder & CEO",
    company: "RapidScale",
  },
  {
    quote: "I've used every AI tool out there. brofounder is the only one that actually understands startup building, not just generating text.",
    name: "Sarah Miller",
    title: "Co-Founder",
    company: "PayFlow",
  },
  {
    quote: "The MVP planner feature is worth its weight in gold. It helped us prioritize features that actually mattered for launch.",
    name: "Marcus Johnson",
    title: "CTO",
    company: "DataBridge",
  },
];

export default function Testimonials() {
  return (
    <section className="border-b border-border py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Loved by founders
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Join thousands of founders building with brofounder.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="group relative rounded-lg border border-border bg-card p-6 transition-all hover:border-muted-foreground/20"
            >
              <Quote size={20} className="mb-4 text-muted-foreground/40" />
              <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                "{testimonial.quote}"
              </p>
              <div className="border-t border-border pt-4">
                <p className="text-sm font-medium">{testimonial.name}</p>
                <p className="text-xs text-muted-foreground">
                  {testimonial.title}, {testimonial.company}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
