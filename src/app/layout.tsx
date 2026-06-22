import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Athletic Mindset | Measure Your Mental Performance",
  description:
    "Psychologist-engineered mental performance assessments for athletes, parents, and coaches. Discover your Athletic Mindset across 22 dimensions.",
  keywords: [
    "sports psychology",
    "mental performance",
    "athlete assessment",
    "sports mindset",
    "mental toughness",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen bg-surface font-[family-name:var(--font-inter)]">
        {children}
      </body>
    </html>
  );
}
