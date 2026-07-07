const entries = [
  {
    version: "0.1.0",
    date: "2026-07-01",
    title: "Initial Launch",
    changes: [
      "Agentic AI workspace with 13 autonomous tools",
      "Market research with TAM/SAM/SOM analysis",
      "Idea validation with 8-dimension scoring",
      "Competitor intelligence with URL analysis",
      "MVP planning with MoSCoW prioritization",
      "Document generation (pitch deck, business plan, PRD)",
      "Code generation (landing page, API, DB schema)",
      "Marketing engine with positioning and messaging",
      "Dark mode first design",
      "Supabase authentication",
      "Chat history with persistence",
      "AI quality settings (High / Medium / Fast)",
    ],
  },
];

export default function ChangelogPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-6 py-24 sm:px-8">
        <h1 className="font-serif text-4xl font-medium tracking-tight sm:text-5xl">
          Changelog
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">
          What&apos;s new in Brofounder.
        </p>

        <div className="mt-16 space-y-12">
          {entries.map((entry) => (
            <div key={entry.version}>
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">
                  v{entry.version}
                </span>
                <time className="text-sm text-muted-foreground">
                  {new Date(entry.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
              </div>
              <h2 className="mt-4 text-xl font-medium">{entry.title}</h2>
              <ul className="mt-4 space-y-2">
                {entry.changes.map((change) => (
                  <li
                    key={change}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                    {change}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
