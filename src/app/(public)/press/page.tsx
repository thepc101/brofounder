import Link from "next/link";

export default function PressPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-6 py-24 sm:px-8">
        <h1 className="font-serif text-4xl font-medium tracking-tight sm:text-5xl">
          Press Kit
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">
          Resources for media and press coverage.
        </p>

        <div className="mt-16 space-y-12">
          <section>
            <h2 className="text-2xl font-medium">About Brofounder</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Brofounder is an AI-powered startup co-founder platform that helps
              solo founders go from idea to launch. It combines deep market
              research, competitor analysis, idea validation, MVP planning, and
              content generation into a single agentic workspace. Founded in 2026,
              Brofounder is on a mission to make startup success accessible to
              everyone.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium">Key Facts</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
                <p className="text-2xl font-medium">13</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  AI-powered tools
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
                <p className="text-2xl font-medium">2 min</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Idea to strategy
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
                <p className="text-2xl font-medium">100%</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Free to start
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-medium">Contact</h2>
            <p className="mt-4 text-muted-foreground">
              For press inquiries, reach out at{" "}
              <Link
                href="mailto:press@brofounder.com"
                className="text-blue-400 hover:text-blue-300"
              >
                press@brofounder.com
              </Link>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
