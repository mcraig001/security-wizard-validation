import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Find the Right Home Security Setup in 5 Minutes",
  description:
    "Built for seniors and their families. No technical knowledge required. Get a personalized home security recommendation instantly.",
  openGraph: {
    title: "Find the Right Home Security Setup in 5 Minutes",
    description:
      "Built for seniors and their families. No technical knowledge required.",
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
      <body className="antialiased">{children}</body>
    </html>
  );
}
