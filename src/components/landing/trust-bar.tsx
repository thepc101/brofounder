"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const logos = [
  { name: "Y Combinator", src: "/logos/yc.svg" },
  { name: "Techstars", src: "/logos/techstars.svg" },
  { name: "500 Global", src: "/logos/500.svg" },
  { name: "Seedcamp", src: "/logos/seedcamp.svg" },
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
          Backed by the best
        </p>
      </motion.div>

      <div className="relative">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-background to-transparent" />

        <div className="animate-scroll-left flex w-max items-center gap-16">
          {[...logos, ...logos, ...logos].map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              className="flex h-12 w-28 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] p-2 transition-colors hover:border-white/15 hover:bg-white/[0.05]"
            >
              <Image
                src={logo.src}
                alt={logo.name}
                width={80}
                height={40}
                className="h-8 w-auto object-contain opacity-50 grayscale transition-all hover:opacity-80 hover:grayscale-0"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
