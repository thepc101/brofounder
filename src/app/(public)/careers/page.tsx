import Link from "next/link";

const openings = [
  {
    title: "Founding Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
  },
  {
    title: "AI/ML Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
  },
  {
    title: "Product Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
  },
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-6 py-24 sm:px-8">
        <h1 className="font-serif text-4xl font-medium tracking-tight sm:text-5xl">
          Careers
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">
          Help us build the future of startup acceleration.
        </p>

        <div className="mt-16 space-y-12">
          <section>
            <h2 className="text-2xl font-medium">Why Brofounder</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              We&apos;re a small team solving a massive problem: making startup
              success accessible to everyone, not just those with networks and
              capital. If you want your work to directly impact thousands of
              founders, this is the place.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
                <h3 className="text-sm font-medium">Ship fast</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Small team, high impact. Every feature you build reaches users
                  within days.
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
                <h3 className="text-sm font-medium">Remote-first</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Work from anywhere. We care about output, not hours logged.
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
                <h3 className="text-sm font-medium">Early equity</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Meaningful equity packages for founding team members.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-medium">Open Positions</h2>
            <div className="mt-6 space-y-4">
              {openings.map((job) => (
                <div
                  key={job.title}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:bg-white/[0.04]"
                >
                  <div>
                    <h3 className="font-medium">{job.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {job.department} · {job.location} · {job.type}
                    </p>
                  </div>
                  <Link
                    href="/contact"
                    className="inline-flex h-9 items-center justify-center rounded-lg border border-white/15 px-5 text-sm font-medium transition-colors hover:bg-white/[0.05]"
                  >
                    Apply
                  </Link>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              Don&apos;t see a role that fits?{" "}
              <Link href="/contact" className="text-blue-400 hover:text-blue-300">
                Send us a note
              </Link>{" "}
              — we&apos;re always looking for exceptional people.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
