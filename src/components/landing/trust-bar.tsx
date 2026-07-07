"use client";

const logos = [
  { name: "Y Combinator", abbr: "YC" },
  { name: "Techstars", abbr: "TS" },
  { name: "500 Global", abbr: "500" },
  { name: "Seedcamp", abbr: "SC" },
  { name: "Antler", abbr: "AN" },
  { name: "a16z", abbr: "a16z" },
  { name: "Sequoia", abbr: "SQ" },
  { name: "First Round", abbr: "FR" },
];

export function TrustBar() {
  return (
    <section className="relative z-10 border-b border-border/50 py-12 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <p className="mb-8 text-center text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Trusted by founders at
        </p>
      </div>

      <div className="relative">
        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-background to-transparent" />

        {/* Scrolling logos */}
        <div className="animate-scroll-left flex w-max items-center gap-16">
          {[...logos, ...logos, ...logos].map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              className="flex items-center gap-2 text-muted-foreground/40 transition-colors hover:text-muted-foreground/70"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-md border border-border/40 text-xs font-semibold">
                {logo.abbr}
              </div>
              <span className="text-sm font-medium whitespace-nowrap">{logo.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
