import type { Metadata } from "next";
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
      <body className="antialiased">{children}</body>
    </html>
  );
}
