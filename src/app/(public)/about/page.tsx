import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-6 py-24 sm:px-8">
        <h1 className="font-serif text-4xl font-medium tracking-tight sm:text-5xl">
          About Brofounder
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">
          We&apos;re building the AI co-founder that every solo founder deserves.
        </p>

        <div className="mt-16 space-y-16">
          <section>
            <h2 className="text-2xl font-medium">Our Mission</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Starting a company shouldn&apos;t require a co-founder, a consultants, or a
              seed round just to figure out if your idea is viable. Brofounder gives
              you the strategic thinking of a seasoned co-founder — powered by AI —
              so you can go from napkin sketch to launched product in days, not months.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium">Why We Built This</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              We watched thousands of founders get stuck in the same loops: endless
              market research, analysis paralysis on positioning, writing pitch decks
              that never get read, building MVPs that nobody wants. The information
              is all out there — it just takes a team of experts to synthesize it
              into actionable strategy. Now that team is an AI that works 24/7 and
              costs less than a single consulting hour.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium">How It Works</h2>
            <div className="mt-6 space-y-6">
              <div className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-sm font-medium text-blue-400">
                  1
                </div>
                <div>
                  <h3 className="font-medium">Tell us about your idea</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Answer a few questions about your startup idea, target market, and
                    goals. Takes about 2 minutes.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-sm font-medium text-blue-400">
                  2
                </div>
                <div>
                  <h3 className="font-medium">Your AI co-founder gets to work</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Brofounder researches your market, analyzes competitors, validates
                    demand, and builds a strategic plan — all autonomously.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-sm font-medium text-blue-400">
                  3
                </div>
                <div>
                  <h3 className="font-medium">Launch with confidence</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Get a validated MVP plan, investor-ready pitch materials, and a
                    clear roadmap — everything you need to launch.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-medium">Our Principles</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
                <h3 className="font-medium">Speed over perfection</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  A good plan executed today beats a perfect plan next week. We
                  optimize for fast, actionable output.
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
                <h3 className="font-medium">Evidence over opinion</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Every recommendation is backed by real market data, competitor
                  analysis, and validated frameworks.
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
                <h3 className="font-medium">Founders first</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  We build for the solo founder working at 2am, not for enterprise
                  procurement teams. Simple, powerful, fast.
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
                <h3 className="font-medium">Transparent by default</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  No black boxes. You see every tool call, every data source, every
                  reasoning step. It&apos;s your company — you should see the work.
                </p>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-24 rounded-xl border border-white/10 bg-white/[0.02] p-8 text-center">
          <h2 className="text-2xl font-medium">Ready to build?</h2>
          <p className="mt-2 text-muted-foreground">
            Start free. No credit card required.
          </p>
          <Link
            href="/signup"
            className="mt-6 inline-flex h-10 items-center justify-center rounded-lg bg-white px-6 text-sm font-medium text-black transition-all hover:bg-white/90"
          >
            Get Started Free
          </Link>
        </div>
      </div>
    </div>
  );
}
