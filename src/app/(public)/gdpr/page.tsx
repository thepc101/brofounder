export default function GdprPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-6 py-24 sm:px-8">
        <h1 className="font-serif text-4xl font-medium tracking-tight sm:text-5xl">
          GDPR
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">
          Your data rights under the General Data Protection Regulation.
        </p>

        <div className="mt-12 space-y-8 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-xl font-medium text-foreground">Overview</h2>
            <p className="mt-3">
              Brofounder is committed to compliance with the GDPR. This page
              outlines your rights and how we handle personal data for users in
              the European Economic Area (EEA), United Kingdom, and Switzerland.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-foreground">Your Rights</h2>
            <div className="mt-4 space-y-4">
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
                <h3 className="font-medium">Right of Access</h3>
                <p className="mt-1 text-sm">
                  You can request a copy of all personal data we hold about you.
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
                <h3 className="font-medium">Right to Rectification</h3>
                <p className="mt-1 text-sm">
                  You can request correction of inaccurate personal data.
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
                <h3 className="font-medium">Right to Erasure</h3>
                <p className="mt-1 text-sm">
                  You can request deletion of your personal data. You can also
                  delete your account and all data directly from Settings.
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
                <h3 className="font-medium">Right to Data Portability</h3>
                <p className="mt-1 text-sm">
                  You can export your data in a machine-readable format from
                  Settings &gt; Data &amp; Privacy.
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
                <h3 className="font-medium">Right to Object</h3>
                <p className="mt-1 text-sm">
                  You can object to processing of your personal data for specific
                  purposes.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-medium text-foreground">Data Processing</h2>
            <p className="mt-3">
              We process personal data based on the following legal grounds:
            </p>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li>Performance of a contract (providing our services to you)</li>
              <li>Legitimate interests (improving our platform)</li>
              <li>Consent (where you have given explicit consent)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium text-foreground">International Transfers</h2>
            <p className="mt-3">
              Your data may be processed in countries outside the EEA. We ensure
              appropriate safeguards are in place, including Standard Contractual
              Clauses where required.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-foreground">Contact</h2>
            <p className="mt-3">
              To exercise your GDPR rights, contact our Data Protection Officer
              at dpo@brofounder.com. We will respond within 30 days.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
