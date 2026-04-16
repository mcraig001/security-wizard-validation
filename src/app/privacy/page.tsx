export default function Privacy() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-16">
      <a href="/" className="text-[#1e3a5f] text-sm mb-8 block hover:underline">
        ← Back to SafeNest
      </a>

      <h1 className="text-3xl font-bold text-[#1e3a5f] mb-2">Privacy Policy</h1>
      <p className="text-gray-500 text-sm mb-10">Last updated: April 15, 2026</p>

      <p className="text-gray-700 mb-8">
        SafeNest is operated by Auriflow Digital LLC, a Wyoming limited liability
        company.
      </p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-[#1e3a5f] mb-3">
          Information We Collect
        </h2>
        <p className="text-gray-700 mb-3">
          When you use our recommendation wizard, we collect:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>
            Your answers to our 3 assessment questions (home size, technology
            comfort, budget)
          </li>
          <li>Your email address, if you choose to provide it</li>
          <li>
            The source of your visit (e.g. Reddit, Facebook) via URL parameter
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-[#1e3a5f] mb-3">
          How We Use Your Information
        </h2>
        <p className="text-gray-700 mb-3">
          We use the information you provide solely to:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Send you your personalized home security recommendation</li>
          <li>
            Improve our recommendation tool based on aggregated, anonymized
            response patterns
          </li>
        </ul>
        <p className="text-gray-700 mt-3">
          We do not sell, rent, or share your personal information with any
          third party for marketing purposes.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-[#1e3a5f] mb-3">
          Email Communications
        </h2>
        <p className="text-gray-700">
          If you provide your email address, you will receive one email
          containing your personalized recommendation. You may receive
          occasional product updates from SafeNest. You can unsubscribe at any
          time by clicking the unsubscribe link in any email.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-[#1e3a5f] mb-3">
          Data Storage
        </h2>
        <p className="text-gray-700">
          Your information is stored securely using Supabase, a SOC 2 compliant
          database provider. We retain your data for up to 12 months.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-[#1e3a5f] mb-3">Cookies</h2>
        <p className="text-gray-700">
          This site does not use tracking cookies or third-party advertising
          pixels.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-[#1e3a5f] mb-3">
          Your Rights
        </h2>
        <p className="text-gray-700">
          You may request deletion of your data at any time by emailing{" "}
          <a
            href="mailto:hello@safenestguide.com"
            className="text-[#1e3a5f] underline"
          >
            hello@safenestguide.com
          </a>
          . We will respond within 30 days.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-[#1e3a5f] mb-3">Contact</h2>
        <p className="text-gray-700">
          Auriflow Digital LLC
          <br />
          Wyoming, United States
          <br />
          <a
            href="mailto:hello@safenestguide.com"
            className="text-[#1e3a5f] underline"
          >
            hello@safenestguide.com
          </a>
        </p>
      </section>

      <p className="text-gray-400 text-xs border-t border-gray-100 pt-6">
        SafeNest is operated by Auriflow Digital LLC. Shield icon drawn from
        scratch — no third-party icon library used.
      </p>
    </main>
  );
}
