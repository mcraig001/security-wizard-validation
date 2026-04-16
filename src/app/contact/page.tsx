export default function Contact() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-16">
      <a
        href="/"
        className="text-[#1e3a5f] text-sm mb-8 block hover:underline"
      >
        ← Back to SafeNest
      </a>
      <h1 className="text-3xl font-bold text-[#1e3a5f] mb-6">Contact</h1>
      <p className="text-gray-700 text-[18px] mb-4">
        Have a question? We&apos;d love to hear from you.
      </p>
      <p className="text-gray-700 text-[18px]">
        Email us at:{" "}
        <a
          href="mailto:hello@safenestguide.com"
          className="text-[#1e3a5f] underline"
        >
          hello@safenestguide.com
        </a>
      </p>
    </main>
  );
}
