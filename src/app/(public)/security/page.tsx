import Link from "next/link";

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-6 py-24 sm:px-8">
        <h1 className="font-serif text-4xl font-medium tracking-tight sm:text-5xl">
          Security
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">
          How we protect your data and your startup ideas.
        </p>

        <div className="mt-12 space-y-8 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-xl font-medium text-foreground">Infrastructure</h2>
            <p className="mt-3">
              Brofounder is built on industry-leading infrastructure:
            </p>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li>
                <strong>Vercel:</strong> Edge network with DDoS protection and
                automatic SSL
              </li>
              <li>
                <strong>Supabase:</strong> PostgreSQL database with row-level
                security and encryption at rest
              </li>
              <li>
                <strong>GitHub:</strong> Private repository with encrypted secrets
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium text-foreground">Authentication</h2>
            <p className="mt-3">
              We use Supabase Auth with secure session management. Passwords are
              hashed using bcrypt. Sessions are managed via HTTP-only cookies
              that cannot be accessed by JavaScript.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-foreground">Encryption</h2>
            <div className="mt-4 space-y-3">
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
                <h3 className="font-medium">In Transit</h3>
                <p className="mt-1 text-sm">
                  All data is encrypted using TLS 1.3. All connections are
                  enforced HTTPS.
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
                <h3 className="font-medium">At Rest</h3>
                <p className="mt-1 text-sm">
                  Database encryption at rest via Supabase. File storage
                  encrypted with AES-256.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-medium text-foreground">API Security</h2>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li>API keys are never exposed to the client</li>
              <li>All API routes require authentication</li>
              <li>Input validation on all endpoints</li>
              <li>Rate limiting on AI endpoints</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium text-foreground">Data Isolation</h2>
            <p className="mt-3">
              Your data is isolated at the database level using Supabase Row
              Level Security. Each user can only access their own projects,
              conversations, and research data. No cross-tenant data access is
              possible.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-foreground">Incident Response</h2>
            <p className="mt-3">
              In the event of a security incident, we will notify affected users
              within 72 hours via email and provide details of the incident,
              impact, and remediation steps.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-foreground">Reporting Vulnerabilities</h2>
            <p className="mt-3">
              If you discover a security vulnerability, please report it
              responsibly to{" "}
              <Link
                href="mailto:security@brofounder.com"
                className="text-blue-400 hover:text-blue-300"
              >
                security@brofounder.com
              </Link>
              . We will acknowledge receipt within 24 hours and work with you to
              address the issue.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
