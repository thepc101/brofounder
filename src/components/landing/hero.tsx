"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="mx-auto max-w-7xl px-4 pb-24 pt-28 sm:px-6 sm:pt-36 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-3xl text-center"
        >
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-flex items-center rounded-full border border-border bg-muted px-3 py-1 text-xs text-muted-foreground">
              The free AI co-founder platform
            </span>
          </motion.div>
          <motion.h1
            variants={itemVariants}
            className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
          >
            Your{" "}
            <span className="gradient-text">AI Co-Founder</span>
            .
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl"
          >
            Go from idea → validated business → MVP → launch.
            <br />
            Your AI co-founder that helps you build, not just chat.
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <Link href="/signup">
              <Button size="lg" className="gap-2 text-base">
                Start Building Free
                <ArrowRight size={18} />
              </Button>
            </Link>
            <Link href="#preview">
              <Button variant="outline" size="lg" className="gap-2 text-base">
                <Play size={16} />
                See How It Works
              </Button>
            </Link>
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="mt-16 flex flex-col items-center gap-4"
          >
            <p className="text-xs text-muted-foreground">
              Trusted by founders at
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-medium text-muted-foreground">
              <span>Y Combinator</span>
              <span>Techstars</span>
              <span>500 Global</span>
              <span>Seedcamp</span>
              <span>Antler</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
      <div className="mx-auto max-w-5xl px-4 pb-24 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="relative overflow-hidden rounded-lg border border-border bg-card"
        >
          <div className="flex items-center gap-2 border-b border-border px-4 py-3">
            <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
            <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
            <span className="ml-2 text-xs text-muted-foreground">brofounder workspace</span>
          </div>
          <div className="grid grid-cols-[1fr_2fr] gap-0">
            <div className="border-r border-border p-4">
              <div className="space-y-3">
                {["Business Summary", "Problem", "Solution", "Market", "Competition"].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 rounded-md bg-accent/50 px-3 py-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span className="text-xs text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="h-3 w-3/4 rounded bg-muted" />
                <div className="h-3 w-1/2 rounded bg-muted" />
                <div className="mt-4 h-20 w-full rounded bg-muted" />
                <div className="grid grid-cols-3 gap-3">
                  <div className="h-16 rounded bg-muted" />
                  <div className="h-16 rounded bg-muted" />
                  <div className="h-16 rounded bg-muted" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
