"use client";

import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl px-6 py-24 sm:px-8">
        <h1 className="font-serif text-4xl font-medium tracking-tight sm:text-5xl">
          Contact
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">
          Have a question, feedback, or want to partner? We&apos;d love to hear
          from you.
        </p>

        {submitted ? (
          <div className="mt-16 rounded-xl border border-white/10 bg-white/[0.02] p-12 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
              <svg
                className="h-6 w-6 text-green-400"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </div>
            <h2 className="mt-6 text-xl font-medium">Message sent</h2>
            <p className="mt-2 text-muted-foreground">
              We&apos;ll get back to you within 24 hours.
            </p>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="mt-12 space-y-6"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  className="w-full rounded-lg border border-white/15 bg-white/[0.05] px-4 py-2.5 text-sm outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/25"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  className="w-full rounded-lg border border-white/15 bg-white/[0.05] px-4 py-2.5 text-sm outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/25"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium mb-2"
              >
                Subject
              </label>
              <input
                id="subject"
                type="text"
                required
                className="w-full rounded-lg border border-white/15 bg-white/[0.05] px-4 py-2.5 text-sm outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/25"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                required
                className="w-full rounded-lg border border-white/15 bg-white/[0.05] px-4 py-2.5 text-sm outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/25 resize-none"
              />
            </div>
            <button
              type="submit"
              className="inline-flex h-11 items-center justify-center rounded-lg bg-white px-8 text-sm font-medium text-black transition-all hover:bg-white/90"
            >
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
