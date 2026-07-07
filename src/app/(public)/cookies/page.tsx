export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-6 py-24 sm:px-8">
        <h1 className="font-serif text-4xl font-medium tracking-tight sm:text-5xl">
          Cookie Policy
        </h1>
        <p className="mt-6 text-sm text-muted-foreground">
          Last updated: July 1, 2026
        </p>

        <div className="mt-12 space-y-8 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-xl font-medium text-foreground">1. What Are Cookies</h2>
            <p className="mt-3">
              Cookies are small text files stored on your device when you visit a
              website. They help us provide a better experience by remembering
              your preferences and session state.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-foreground">2. How We Use Cookies</h2>
            <p className="mt-3">We use cookies for the following purposes:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li>
                <strong>Authentication:</strong> To keep you signed in and maintain
                your session.
              </li>
              <li>
                <strong>Preferences:</strong> To remember your settings, theme
                preferences, and AI quality selections.
              </li>
              <li>
                <strong>Analytics:</strong> To understand how our platform is used
                and identify areas for improvement.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium text-foreground">3. Types of Cookies We Use</h2>
            <div className="mt-3 space-y-3">
              <div>
                <p className="font-medium text-foreground">Essential Cookies</p>
                <p className="mt-1">
                  Required for the platform to function. These handle
                  authentication and security. You cannot opt out of these as the
                  platform will not work without them.
                </p>
              </div>
              <div>
                <p className="font-medium text-foreground">Functional Cookies</p>
                <p className="mt-1">
                  Remember your preferences such as theme, AI quality settings,
                  and sidebar state. These enhance your experience but are not
                  strictly necessary.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-medium text-foreground">4. Third-Party Cookies</h2>
            <p className="mt-3">
              We use Supabase for authentication, which may set cookies for
              session management. We do not use third-party advertising or
              tracking cookies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-foreground">5. Managing Cookies</h2>
            <p className="mt-3">
              You can control cookies through your browser settings. Note that
              disabling essential cookies may prevent the platform from functioning
              correctly.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-foreground">6. Changes to This Policy</h2>
            <p className="mt-3">
              We may update this Cookie Policy from time to time. Changes will be
              posted on this page with an updated revision date.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
