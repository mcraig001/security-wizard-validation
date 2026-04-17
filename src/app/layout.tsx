import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "SafeNest — Home Security Guidance for Older Adults",
  description:
    "Answer 3 questions and get a personalized home security recommendation. Designed for adults 65+ and their families. No sales calls. No pushy installers.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "SafeNest — Home Security Guidance for Older Adults",
    description:
      "Answer 3 questions and get a personalized home security recommendation. No sales calls. No pushy installers.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <header style={{ background: "#1e3a5f", padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ color: "white", fontWeight: 700, fontSize: "20px", textDecoration: "none", letterSpacing: "-0.5px" }}>
            🏠 SafeNest
          </Link>
          <nav style={{ display: "flex", gap: "24px", alignItems: "center" }}>
            <Link href="/blog" style={{ color: "#bfdbfe", fontSize: "15px", textDecoration: "none" }}>
              Security Tips
            </Link>
            <Link href="/premium" style={{ background: "#f97316", color: "white", padding: "6px 16px", borderRadius: "20px", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}>
              Premium
            </Link>
          </nav>
        </header>
        {children}
        <footer style={{ background: "#f9fafb", borderTop: "1px solid #e5e7eb", padding: "32px 24px", marginTop: "64px", textAlign: "center" }}>
          <div style={{ maxWidth: "600px", margin: "0 auto" }}>
            <p style={{ fontWeight: 700, color: "#1e3a5f", marginBottom: "8px" }}>🏠 SafeNest</p>
            <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "12px" }}>
              Home security recommendations for adults 65+ and their families.
            </p>
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap", marginBottom: "12px" }}>
              <Link href="/blog" style={{ fontSize: "13px", color: "#6b7280" }}>Security Tips</Link>
              <Link href="/premium" style={{ fontSize: "13px", color: "#6b7280" }}>Premium</Link>
              <Link href="/privacy" style={{ fontSize: "13px", color: "#6b7280" }}>Privacy</Link>
              <Link href="/terms" style={{ fontSize: "13px", color: "#6b7280" }}>Terms</Link>
            </div>
            <p style={{ fontSize: "12px", color: "#9ca3af" }}>
              SafeNest earns a commission on Amazon purchases at no extra cost to you. · Auriflow Digital LLC · Wyoming
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
