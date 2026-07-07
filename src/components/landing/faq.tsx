"use client";

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
    <section id="faq" className="border-b border-border py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Everything you need to know about brofounder.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left text-sm font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
