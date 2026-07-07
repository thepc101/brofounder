export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-6 py-24 sm:px-8">
        <h1 className="font-serif text-4xl font-medium tracking-tight sm:text-5xl">
          Terms of Service
        </h1>
        <p className="mt-6 text-sm text-muted-foreground">
          Last updated: July 1, 2026
        </p>

        <div className="mt-12 space-y-8 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-xl font-medium text-foreground">1. Acceptance of Terms</h2>
            <p className="mt-3">
              By accessing or using Brofounder, you agree to be bound by these
              Terms of Service. If you do not agree, do not use our platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-foreground">2. Description of Service</h2>
            <p className="mt-3">
              Brofounder provides AI-powered tools for startup planning,
              research, validation, and content generation. Our services include
              market research, competitor analysis, idea validation, MVP planning,
              document generation, and code generation.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-foreground">3. User Responsibilities</h2>
            <p className="mt-3">
              You are responsible for maintaining the confidentiality of your
              account credentials and for all activities under your account. You
              agree to use the platform only for lawful purposes and in accordance
              with these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-foreground">4. AI-Generated Content</h2>
            <p className="mt-3">
              All AI-generated outputs are provided for informational purposes
              only. You are solely responsible for evaluating and verifying any
              AI-generated content before relying on it for business decisions.
              Brofounder does not guarantee the accuracy or completeness of
              AI-generated outputs.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-foreground">5. Intellectual Property</h2>
            <p className="mt-3">
              You retain full ownership of all content you create using
              Brofounder. We do not claim any rights over your startup ideas,
              business plans, or generated materials.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-foreground">6. Limitation of Liability</h2>
            <p className="mt-3">
              Brofounder is provided &quot;as is&quot; without warranties of any kind.
              We shall not be liable for any indirect, incidental, special,
              consequential, or punitive damages resulting from your use of the
              platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-foreground">7. Termination</h2>
            <p className="mt-3">
              We may terminate or suspend your account at any time for violation
              of these Terms. You may delete your account at any time from
              Settings.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-foreground">8. Changes to Terms</h2>
            <p className="mt-3">
              We reserve the right to modify these Terms at any time. Continued
              use of the platform after changes constitutes acceptance of the
              updated Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-foreground">9. Contact</h2>
            <p className="mt-3">
              For questions about these Terms, contact us at
              legal@brofounder.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
