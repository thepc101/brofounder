"use client";

import { motion } from "framer-motion";
import { TrendingUp, Users, Rocket, Zap } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "2,847",
    label: "Active Founders",
    description: "Building right now",
  },
  {
    icon: Rocket,
    value: "312",
    label: "MVPs Launched",
    description: "In the last 90 days",
  },
  {
    icon: TrendingUp,
    value: "$4.2M",
    label: "Revenue Generated",
    description: "By our users",
  },
  {
    icon: Zap,
    value: "18,400+",
    label: "Ideas Validated",
    description: "And counting",
  },
];

const logos = [
  { name: "Y Combinator", src: "/logos/yc.svg" },
  { name: "Techstars", src: "/logos/techstars.svg" },
  { name: "500 Global", src: "/logos/500.svg" },
  { name: "Seedcamp", src: "/logos/seedcamp.svg" },
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
            Traction
          </p>
          <h2
            className="text-4xl font-normal tracking-tight sm:text-5xl"
            style={{ fontFamily: "var(--font-display-face)" }}
          >
            Real founders, real results
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            Numbers that speak louder than words.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group rounded-xl border border-white/10 bg-white/[0.02] p-6 text-center transition-colors hover:border-white/15"
            >
              <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04]">
                <stat.icon size={18} className="text-foreground/70" />
              </div>
              <p
                className="text-3xl font-normal tracking-tight sm:text-4xl"
                style={{ fontFamily: "var(--font-display-face)" }}
              >
                {stat.value}
              </p>
              <p className="mt-1 text-sm font-medium">{stat.label}</p>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Founder logos section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-20"
        >
          <p className="mb-8 text-center text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Featured in
          </p>
          <div className="flex flex-wrap items-center justify-center gap-12">
            {logos.map((logo) => (
              <div
                key={logo.name}
                className="flex h-14 w-36 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] p-3"
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="h-full w-auto object-contain opacity-40 grayscale transition-all hover:opacity-70 hover:grayscale-0"
                />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
