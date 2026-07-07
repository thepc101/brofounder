export default function LicensePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-6 py-24 sm:px-8">
        <h1 className="font-serif text-4xl font-medium tracking-tight sm:text-5xl">
          License
        </h1>
        <p className="mt-6 text-sm text-muted-foreground">
          Last updated: July 1, 2026
        </p>

        <div className="mt-12 space-y-8 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-xl font-medium text-foreground">
              Software License
            </h2>
            <p className="mt-3">
              Brofounder is proprietary software. All rights not expressly
              granted are reserved.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-foreground">
              Your Content
            </h2>
            <p className="mt-3">
              You retain full ownership of all content you create using
              Brofounder, including:
            </p>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li>Startup ideas and business plans</li>
              <li>Research data and analysis</li>
              <li>Generated documents and code</li>
              <li>Marketing content and strategies</li>
            </ul>
            <p className="mt-3">
              We do not claim any intellectual property rights over your content.
              You are free to use, modify, and distribute your AI-generated
              outputs without restriction.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-foreground">
              Our IP
            </h2>
            <p className="mt-3">
              The Brofounder platform, including its design, code, AI models,
              prompts, and documentation, is owned by Brofounder and protected
              by copyright and trademark laws.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-foreground">
              AI-Generated Content Disclaimer
            </h2>
            <p className="mt-3">
              While you own the outputs generated through Brofounder, AI
             -generated content may not be eligible for copyright protection in
              all jurisdictions. Consult a legal professional for advice on
              intellectual property protection for AI-generated works.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-foreground">
              Open Source
            </h2>
            <p className="mt-3">
              Certain dependencies used by Brofounder are open source and subject
              to their respective licenses. A list of open source dependencies is
              available in the project&apos;s package.json file.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
