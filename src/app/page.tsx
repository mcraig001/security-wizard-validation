"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

type Step = "hero" | "step1" | "step2" | "step3" | "email" | "thanks";

interface Answers {
  home_size: string;
  tech_comfort: string;
  budget: string;
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M12 2L3 6v6c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V6L12 2z" />
    </svg>
  );
}

function Logo() {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex items-center gap-2">
        <ShieldIcon className="w-8 h-8 text-white" />
        <span className="text-2xl font-bold tracking-tight text-white">
          SafeNest
        </span>
      </div>
      <p className="text-blue-200 text-sm text-center">
        Home security guidance for older adults and their families
      </p>
    </div>
  );
}

function TrustBar() {
  return (
    <div className="mt-8 border-t border-blue-400 pt-8">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
        {[
          { icon: "🔒", text: "Your email is never sold or shared" },
          { icon: "✓", text: "Works with Ring, Nest, SimpliSafe & ADT" },
          { icon: "★", text: "Designed for adults 65+ and their families" },
        ].map((item) => (
          <div
            key={item.text}
            className="flex items-center gap-2 text-blue-100 text-sm"
          >
            <span className="text-lg shrink-0">{item.icon}</span>
            <span>{item.text}</span>
          </div>
        ))}
      </div>
      <p className="text-blue-300 text-xs mt-4 text-center">
        Ring, Nest, SimpliSafe, and ADT are trademarks of their respective
        owners. SafeNest is not affiliated with, endorsed by, or sponsored by
        any security brand.
      </p>
    </div>
  );
}

function TestimonialSection() {
  const testimonials = [
    {
      quote:
        "I spent weeks confused by all the options. This pointed me in the right direction in minutes.",
      name: "Barbara K., 68 — Phoenix, AZ",
    },
    {
      quote:
        "Set this up for my parents. Finally feel like they are protected without them having to figure out complicated tech.",
      name: "Michael T. — son of a 74-year-old",
    },
    {
      quote: "Simple. Clear. Exactly what I needed.",
      name: "Dorothy M., 71 — Atlanta, GA",
    },
  ];

  return (
    <section className="bg-gray-50 py-14 px-6">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-[#1e3a5f] mb-8 text-center">
          Why families trust us
        </h2>
        <div className="space-y-4">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
            >
              <p className="text-gray-300 text-5xl leading-none mb-2 font-serif select-none">
                &ldquo;
              </p>
              <p className="text-gray-700 text-[18px] mb-4">{t.quote}</p>
              <p className="text-gray-500 text-sm font-medium">{t.name}</p>
            </div>
          ))}
        </div>
        <p className="text-gray-400 text-xs mt-6 text-center">
          Testimonials are illustrative examples. Individual results may vary.
        </p>
      </div>
    </section>
  );
}

function FAQSection() {
  const faqs = [
    {
      q: "Do I need to buy anything to get started?",
      a: "No. The recommendation is completely free. We'll tell you exactly what to buy and where to get it at the best price.",
    },
    {
      q: "Is this affiliated with Ring, Nest, or ADT?",
      a: "No. We're independent. SafeNest is not affiliated with, endorsed by, or sponsored by any security brand. Our only goal is to match you with the right setup for your specific situation.",
    },
    {
      q: "What happens after I enter my email?",
      a: "You'll receive one email with your personalized recommendation. That's it. No follow-up sales emails unless you ask.",
    },
  ];

  return (
    <section className="max-w-2xl mx-auto px-6 py-14">
      <h2 className="text-2xl font-bold text-[#1e3a5f] mb-6">
        Common questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq) => (
          <details key={faq.q} className="border border-gray-200 rounded-xl p-5">
            <summary className="font-semibold text-[18px] cursor-pointer">
              {faq.q}
            </summary>
            <p className="mt-3 text-gray-700">{faq.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-gray-200 py-8 px-6 text-center text-gray-500 text-sm">
      <p className="mb-1">
        &copy; 2026 SafeNest &middot; Operated by Auriflow Digital LLC (Wyoming)
      </p>
      <p className="mb-3 text-xs text-gray-400">
        SafeNest may earn commissions on recommended products. We are not
        affiliated with any security brand. Brand names are trademarks of their
        respective owners.
      </p>
      <div className="flex justify-center gap-6">
        <a href="/privacy" className="underline hover:text-gray-700">
          Privacy Policy
        </a>
        <a href="/terms" className="underline hover:text-gray-700">
          Terms of Use
        </a>
        <a href="/contact" className="underline hover:text-gray-700">
          Contact
        </a>
      </div>
    </footer>
  );
}

function WizardContent() {
  const searchParams = useSearchParams();
  const utmSource = searchParams.get("utm_source") || "direct";
  const source = ["reddit", "facebook", "x"].includes(utmSource)
    ? utmSource
    : "direct";

  const [step, setStep] = useState<Step>("hero");
  const [answers, setAnswers] = useState<Answers>({
    home_size: "",
    tech_comfort: "",
    budget: "",
  });
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [emailError, setEmailError] = useState("");

  function choose(field: keyof Answers, value: string, next: Step) {
    setAnswers((prev) => ({ ...prev, [field]: value }));
    setStep(next);
  }

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    setEmailError("");

    if (!email || !email.includes("@")) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);

    try {
      await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, ...answers, source }),
      });
    } catch {
      // fail silently — still show thanks screen
    }

    setSubmitting(false);
    setStep("thanks");
  }

  // --- HERO ---
  if (step === "hero") {
    return (
      <main>
        <header className="bg-[#1e3a5f] text-white px-6 py-12 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="mb-8">
              <Logo />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-4">
              The right home security setup — without the confusion
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Answer 3 questions and get a personalized recommendation for your
              exact situation. No sales calls. No pushy installers.
            </p>
            <button
              onClick={() => setStep("step1")}
              className="bg-[#f97316] hover:bg-orange-500 text-white font-bold text-xl px-10 py-4 rounded-xl transition-colors w-full sm:w-auto"
            >
              Find My Setup →
            </button>
            <TrustBar />
          </div>
        </header>

        <TestimonialSection />

        <FAQSection />

        <Footer />
      </main>
    );
  }

  // --- STEP 1 ---
  if (step === "step1") {
    return (
      <main className="min-h-screen bg-gray-50">
        <WizardHeader step={1} />
        <div className="max-w-xl mx-auto px-6 py-10">
          <h2 className="text-2xl font-bold text-[#1e3a5f] mb-1">
            Tell us about the home
          </h2>
          <p className="text-gray-500 mb-8">Step 1 of 3</p>
          <div className="space-y-4">
            {[
              { label: "Apartment", value: "apartment" },
              { label: "Small house (1–2 bedrooms)", value: "small_house" },
              { label: "Large house (3+ bedrooms)", value: "large_house" },
            ].map((opt) => (
              <OptionButton
                key={opt.value}
                label={opt.label}
                onClick={() => choose("home_size", opt.value, "step2")}
              />
            ))}
          </div>
        </div>
      </main>
    );
  }

  // --- STEP 2 ---
  if (step === "step2") {
    return (
      <main className="min-h-screen bg-gray-50">
        <WizardHeader step={2} />
        <div className="max-w-xl mx-auto px-6 py-10">
          <h2 className="text-2xl font-bold text-[#1e3a5f] mb-1">
            Tech comfort level
          </h2>
          <p className="text-gray-500 mb-8">Step 2 of 3</p>
          <div className="space-y-4">
            {[
              { label: "I prefer simple and easy", value: "not_comfortable" },
              {
                label: "I can follow instructions",
                value: "somewhat_comfortable",
              },
              { label: "I'm pretty tech-savvy", value: "very_comfortable" },
            ].map((opt) => (
              <OptionButton
                key={opt.value}
                label={opt.label}
                onClick={() => choose("tech_comfort", opt.value, "step3")}
              />
            ))}
          </div>
        </div>
      </main>
    );
  }

  // --- STEP 3 ---
  if (step === "step3") {
    return (
      <main className="min-h-screen bg-gray-50">
        <WizardHeader step={3} />
        <div className="max-w-xl mx-auto px-6 py-10">
          <h2 className="text-2xl font-bold text-[#1e3a5f] mb-1">
            Monthly monitoring budget
          </h2>
          <p className="text-gray-500 mb-8">Step 3 of 3</p>
          <div className="space-y-4">
            {[
              { label: "$0 (no monitoring)", value: "none" },
              { label: "Under $20/month", value: "under_20" },
              { label: "$20–50/month", value: "20_to_50" },
            ].map((opt) => (
              <OptionButton
                key={opt.value}
                label={opt.label}
                onClick={() => choose("budget", opt.value, "email")}
              />
            ))}
          </div>
        </div>
      </main>
    );
  }

  // --- EMAIL CAPTURE ---
  if (step === "email") {
    return (
      <main className="min-h-screen bg-gray-50">
        <WizardHeader step={4} />
        <div className="max-w-xl mx-auto px-6 py-10">
          <h2 className="text-2xl font-bold text-[#1e3a5f] mb-2">
            Your personalized recommendation is ready
          </h2>
          <p className="text-[18px] text-gray-600 mb-8">
            Based on your answers, we&apos;ve matched you with 2 recommended
            setups.
          </p>
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full border-2 border-gray-300 focus:border-[#1e3a5f] outline-none rounded-xl px-5 py-4 text-[18px]"
              autoComplete="email"
              inputMode="email"
            />
            {emailError && (
              <p className="text-red-600 text-[16px]">{emailError}</p>
            )}
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#f97316] hover:bg-orange-500 disabled:bg-orange-300 text-white font-bold text-xl px-8 py-4 rounded-xl transition-colors"
            >
              {submitting ? "Sending…" : "Show Me My Recommendations →"}
            </button>
            <p className="text-center text-gray-500 text-[15px]">
              Trusted by families across the US. We respect your inbox.
            </p>
            <p className="text-center text-gray-400 leading-snug" style={{ fontSize: "11px" }}>
              By submitting your email you agree to our{" "}
              <a href="/privacy" className="underline">
                Privacy Policy
              </a>
              . US residents: we do not sell your data. Unsubscribe anytime.
            </p>
          </form>
        </div>
      </main>
    );
  }

  // --- THANK YOU ---
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="max-w-xl w-full text-center py-16">
        <h2 className="text-3xl font-bold text-[#1e3a5f] mb-4">
          You&apos;re all set.
        </h2>
        <p className="text-[18px] text-gray-600 mb-12">
          We&apos;re putting together your personalized recommendation now.
          Expect it within 24 hours — check your spam folder just in case.
        </p>
        <div className="grid grid-cols-3 gap-6 text-center">
          {[
            { num: "1", label: "You answered 3 questions" },
            { num: "2", label: "We match your situation to the right setup" },
            { num: "3", label: "You get a clear, simple recommendation" },
          ].map((s) => (
            <div key={s.num} className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#1e3a5f] text-white flex items-center justify-center font-bold text-xl shrink-0">
                {s.num}
              </div>
              <p className="text-gray-600 text-sm leading-snug">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

function WizardHeader({ step }: { step: number }) {
  const total = 3;
  const progress =
    step > total ? 100 : Math.round(((step - 1) / total) * 100);
  return (
    <div className="bg-[#1e3a5f] px-6 py-5">
      <div className="max-w-xl mx-auto">
        <div className="flex items-center gap-2 mb-3">
          <svg
            className="w-5 h-5 text-white"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 2L3 6v6c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V6L12 2z" />
          </svg>
          <span className="text-white font-bold text-lg">SafeNest</span>
        </div>
        <p className="text-blue-200 text-[16px] mb-2">
          {step <= total ? `Step ${step} of ${total}` : "Almost done"}
        </p>
        <div className="w-full bg-blue-900 rounded-full h-2">
          <div
            className="bg-[#f97316] h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function OptionButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left border-2 border-gray-200 hover:border-[#1e3a5f] hover:bg-blue-50 rounded-xl px-6 py-5 text-[18px] font-medium transition-colors min-h-[48px]"
    >
      {label}
    </button>
  );
}

export default function Home() {
  return (
    <Suspense>
      <WizardContent />
    </Suspense>
  );
}
