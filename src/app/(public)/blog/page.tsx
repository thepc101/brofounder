import Link from "next/link";

const posts = [
  {
    date: "2026-07-01",
    title: "Why Most Startups Fail Before They Start",
    excerpt:
      "The #1 reason isn't bad ideas — it's bad process. Here's how AI changes the game.",
    tag: "Strategy",
  },
  {
    date: "2026-06-24",
    title: "Validating Your Startup Idea in 48 Hours",
    excerpt:
      "Forget months of market research. Here's the compressed framework we use.",
    tag: "Validation",
  },
  {
    date: "2026-06-17",
    title: "Building an MVP That Actually Ships",
    excerpt:
      "Scope creep kills more MVPs than bad code. How to ship fast and learn faster.",
    tag: "MVP",
  },
  {
    date: "2026-06-10",
    title: "The Solo Founder's Guide to Competitive Analysis",
    excerpt:
      "You don't need a strategy team. You need a systematic approach to understanding your market.",
    tag: "Research",
  },
  {
    date: "2026-06-03",
    title: "From Idea to Pitch Deck in One Weekend",
    excerpt:
      "How to compress weeks of work into a single focused sprint with AI assistance.",
    tag: "Pitching",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-6 py-24 sm:px-8">
        <h1 className="font-serif text-4xl font-medium tracking-tight sm:text-5xl">
          Blog
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">
          Insights on building, validating, and launching startups with AI.
        </p>

        <div className="mt-16 space-y-8">
          {posts.map((post) => (
            <article
              key={post.title}
              className="group rounded-xl border border-white/10 bg-white/[0.02] p-8 transition-colors hover:bg-white/[0.04]"
            >
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">
                  {post.tag}
                </span>
                <time className="text-xs text-muted-foreground">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
              </div>
              <h2 className="mt-4 text-xl font-medium group-hover:text-blue-400 transition-colors">
                {post.title}
              </h2>
              <p className="mt-2 text-muted-foreground">{post.excerpt}</p>
              <Link
                href="#"
                className="mt-4 inline-flex items-center text-sm text-blue-400 hover:text-blue-300"
              >
                Read more →
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-16 rounded-xl border border-white/10 bg-white/[0.02] p-8 text-center">
          <p className="text-muted-foreground">
            More articles coming soon. Subscribe to get notified.
          </p>
        </div>
      </div>
    </div>
  );
}
