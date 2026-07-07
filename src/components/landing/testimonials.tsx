"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    quote: "brofounder helped me validate my idea in 2 days instead of 2 months. The market research alone saved me weeks of work.",
    name: "Alex Chen",
    title: "Founder & CEO",
    company: "RapidScale",
    badge: "YC W24",
    rating: 5,
  },
  {
    quote: "I've used every AI tool out there. brofounder is the only one that actually understands startup building, not just generating text.",
    name: "Sarah Miller",
    title: "Co-Founder",
    company: "PayFlow",
    badge: "Techstars '23",
    rating: 5,
  },
  {
    quote: "The MVP planner feature is worth its weight in gold. It helped us prioritize features that actually mattered for launch.",
    name: "Marcus Johnson",
    title: "CTO",
    company: "DataBridge",
    badge: "500 Global",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative z-10 py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
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
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 transition-colors hover:border-white/[0.12]"
            >
              {/* Stars */}
              <div className="mb-4 flex gap-0.5">
                {Array.from({ length: testimonial.rating }).map((_, j) => (
                  <Star key={j} size={12} className="fill-foreground/60 text-foreground/60" />
                ))}
              </div>

              <Quote size={16} className="mb-3 text-white/20" />
              <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="border-t border-white/[0.06] pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.title}, {testimonial.company}
                    </p>
                  </div>
                  <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-0.5 text-[10px] text-muted-foreground">
                    {testimonial.badge}
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
