"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is brofounder really free?",
    answer: "Yes, brofounder is completely free. No hidden costs, no credit card required, no usage limits. We believe every founder should have access to world-class AI tools to build their startup.",
  },
  {
    question: "How is brofounder different from ChatGPT?",
    answer: "brofounder is purpose-built for startup founders. Instead of generic conversations, you get structured outputs — business plans, market research, competitor analysis, roadmaps, and actionable strategies. It's not a chatbot; it's a product builder.",
  },
  {
    question: "Can I export my work?",
    answer: "Absolutely. Every document, plan, and analysis can be exported as PDF or markdown. You own everything you create on brofounder.",
  },
  {
    question: "How long does it take to get started?",
    answer: "About 5 minutes. Fill out a quick onboarding form, and your AI co-founder generates a complete workspace with business summary, market analysis, and next steps ready to go.",
  },
  {
    question: "What kind of startups can use brofounder?",
    answer: "All kinds. SaaS, marketplace, ecommerce, AI, agency, consumer — brofounder adapts to your business model and industry. Whether you're validating an idea or preparing for launch, we've got you covered.",
  },
  {
    question: "Do you offer API access?",
    answer: "Not yet, but it's on our roadmap. We're focused on making the core product exceptional before expanding to API access.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="relative z-10 py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            FAQ
          </p>
          <h2
            className="text-4xl font-normal tracking-tight sm:text-5xl"
            style={{ fontFamily: "var(--font-display-face)" }}
          >
            Frequently asked questions
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            Everything you need to know about brofounder.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto mt-16 max-w-2xl"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-white/[0.06]">
                <AccordionTrigger className="text-left text-sm font-medium hover:no-underline hover:text-foreground py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
