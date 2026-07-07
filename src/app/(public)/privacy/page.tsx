export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-6 py-24 sm:px-8">
        <h1 className="font-serif text-4xl font-medium tracking-tight sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-6 text-sm text-muted-foreground">
          Last updated: July 1, 2026
        </p>

        <div className="mt-12 space-y-8 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-xl font-medium text-foreground">1. Introduction</h2>
            <p className="mt-3">
              Brofounder (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your
              privacy. This Privacy Policy explains how we collect, use, disclose,
              and safeguard your information when you use our platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-foreground">2. Information We Collect</h2>
            <p className="mt-3">
              <strong>Account Information:</strong> When you create an account, we
              collect your email address and any optional profile information you
              provide.
            </p>
            <p className="mt-3">
              <strong>Usage Data:</strong> We collect information about how you
              interact with our platform, including chat conversations, tool usage,
              and feature interactions.
            </p>
            <p className="mt-3">
              <strong>Project Data:</strong> Information you provide about your
              startup ideas, business plans, and research queries is stored to
              provide and improve our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-foreground">3. How We Use Your Information</h2>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li>To provide and maintain our services</li>
              <li>To personalize your experience and deliver relevant AI outputs</li>
              <li>To improve our platform and develop new features</li>
              <li>To communicate with you about updates and support</li>
              <li>To ensure the security and integrity of our platform</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium text-foreground">4. Data Sharing</h2>
            <p className="mt-3">
              We do not sell your personal information. We may share data with
              third-party service providers (e.g., Supabase for authentication,
              Groq for AI processing) solely to operate our platform. These
              providers are bound by contractual obligations to protect your data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-foreground">5. Data Retention</h2>
            <p className="mt-3">
              We retain your data for as long as your account is active. You can
              delete your account and all associated data at any time from Settings.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-foreground">6. Security</h2>
            <p className="mt-3">
              We implement industry-standard security measures including encryption
              in transit (TLS) and at rest. However, no method of transmission
              over the Internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-foreground">7. Changes to This Policy</h2>
            <p className="mt-3">
              We may update this policy from time to time. We will notify you of
              any material changes by posting the new policy on this page and
              updating the &quot;Last updated&quot; date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-foreground">8. Contact</h2>
            <p className="mt-3">
              If you have questions about this Privacy Policy, please contact us
              at privacy@brofounder.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
