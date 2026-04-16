"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

type Step = "hero" | "step1" | "step2" | "step3" | "email" | "thanks";

interface Answers {
  home_size: string;
  tech_comfort: string;
  budget: string;
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
            <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-4">
              Find the right home security setup in 5 minutes
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Built for seniors and their families. No technical knowledge
              required.
            </p>
            <button
              onClick={() => setStep("step1")}
              className="bg-[#f97316] hover:bg-orange-500 text-white font-bold text-xl px-10 py-4 rounded-xl transition-colors"
            >
              Find My Setup →
            </button>
          </div>
        </header>

        <section className="max-w-2xl mx-auto px-6 py-12">
          <ul className="space-y-5 mb-12">
            {[
              "No equipment to buy to get started",
              "Works with Ring, Nest, SimpliSafe, ADT and more",
              "Designed with seniors in mind — clear, simple, no jargon",
            ].map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span className="text-[#f97316] text-2xl leading-none mt-0.5">
                  ✓
                </span>
                <span className="text-[18px]">{point}</span>
              </li>
            ))}
          </ul>

          <div className="border-t border-gray-200 pt-10">
            <h2 className="text-2xl font-bold text-[#1e3a5f] mb-6">
              Common questions
            </h2>
            <div className="space-y-6">
              <details className="border border-gray-200 rounded-xl p-5">
                <summary className="font-semibold text-[18px] cursor-pointer">
                  Is this free?
                </summary>
                <p className="mt-3 text-gray-700">
                  Yes. The recommendation is completely free. We may suggest
                  products or services, but there is no cost to use this tool.
                </p>
              </details>
              <details className="border border-gray-200 rounded-xl p-5">
                <summary className="font-semibold text-[18px] cursor-pointer">
                  Do I need to buy any equipment?
                </summary>
                <p className="mt-3 text-gray-700">
                  No. We&apos;ll tell you what options exist and what would work
                  best for your situation — including options that require no
                  equipment at all.
                </p>
              </details>
              <details className="border border-gray-200 rounded-xl p-5">
                <summary className="font-semibold text-[18px] cursor-pointer">
                  Who is this for?
                </summary>
                <p className="mt-3 text-gray-700">
                  This is designed for adults 65+ and the family members who
                  help them. We use plain language and skip the technical jargon.
                </p>
              </details>
            </div>
          </div>
        </section>
      </main>
    );
  }

  // --- STEP 1 ---
  if (step === "step1") {
    return (
      <main className="min-h-screen bg-gray-50">
        <WizardHeader step={1} />
        <div className="max-w-xl mx-auto px-6 py-10">
          <h2 className="text-2xl font-bold text-[#1e3a5f] mb-2">
            How large is the home?
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
          <h2 className="text-2xl font-bold text-[#1e3a5f] mb-2">
            How comfortable is the user with technology?
          </h2>
          <p className="text-gray-500 mb-8">Step 2 of 3</p>
          <div className="space-y-4">
            {[
              { label: "Not comfortable", value: "not_comfortable" },
              { label: "Somewhat comfortable", value: "somewhat_comfortable" },
              { label: "Very comfortable", value: "very_comfortable" },
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
          <h2 className="text-2xl font-bold text-[#1e3a5f] mb-2">
            What&apos;s your monthly budget for monitoring?
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
            Enter your email and we&apos;ll send it to you instantly.
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
              {submitting ? "Sending…" : "Send My Recommendation"}
            </button>
            <p className="text-center text-gray-500 text-[16px]">
              No spam. Unsubscribe anytime.
            </p>
          </form>
        </div>
      </main>
    );
  }

  // --- THANK YOU ---
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="max-w-xl text-center">
        <div className="text-6xl mb-6">✅</div>
        <h2 className="text-3xl font-bold text-[#1e3a5f] mb-4">
          You&apos;re on the list.
        </h2>
        <p className="text-[18px] text-gray-600">
          Your recommendation is coming within 24 hours. Check your inbox —
          including your spam folder.
        </p>
      </div>
    </main>
  );
}

function WizardHeader({ step }: { step: number }) {
  const total = 3;
  const progress = step > total ? 100 : Math.round(((step - 1) / total) * 100);
  return (
    <div className="bg-[#1e3a5f] px-6 py-5">
      <div className="max-w-xl mx-auto">
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
      className="w-full text-left border-2 border-gray-200 hover:border-[#1e3a5f] hover:bg-blue-50 rounded-xl px-6 py-5 text-[18px] font-medium transition-colors"
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
