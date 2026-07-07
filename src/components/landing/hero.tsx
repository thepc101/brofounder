"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] as const } },
};

const stats = [
  { value: "10K+", label: "Founders" },
  { value: "50K+", label: "Ideas Validated" },
  { value: "Free", label: "No Credit Card" },
];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden">
      {/* Video Background with parallax */}
      <motion.div
        style={{ scale: videoScale, opacity: videoOpacity }}
        className="absolute inset-0 z-0"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
        />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y: textY }}
        className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center"
      >
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-5xl"
        >
          {/* Badge */}
          <motion.div variants={item} className="mb-8 flex justify-center">
            <div className="liquid-glass inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm text-muted-foreground">
              <Sparkles size={14} className="text-foreground/70" />
              <span>The free AI co-founder platform</span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={item}
            className="text-5xl font-normal normal-case leading-[0.92] tracking-[-3px] sm:text-7xl md:text-[5.5rem]"
            style={{ fontFamily: "var(--font-display-face)" }}
          >
            Build startups with
            <br />
            <em className="not-italic text-muted-foreground">your AI co-founder.</em>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={item}
            className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Go from idea → validated business → MVP → launch. Not a chatbot.
            A real product builder that thinks like a founder.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={item}
            className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <Link
              href="/signup"
              className="liquid-glass group flex items-center gap-2.5 rounded-full px-10 py-4 text-base text-foreground transition-all hover:scale-[1.03]"
            >
              Start Building Free
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="#preview"
              className="rounded-full border border-white/10 px-8 py-4 text-base text-muted-foreground transition-all hover:border-white/20 hover:text-foreground"
            >
              See How It Works
            </Link>
          </motion.div>

          {/* Trust indicators */}
          <motion.div variants={item} className="mt-16 flex flex-wrap items-center justify-center gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-semibold tracking-tight">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Micro trust badges */}
          <motion.div variants={item} className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {["No credit card required", "Free forever", "Export your data"].map((text) => (
              <div key={text} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <CheckCircle2 size={12} className="text-foreground/50" />
                {text}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
}
