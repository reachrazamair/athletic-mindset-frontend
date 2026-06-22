"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { label: "Athletes", href: "#solutions" },
  { label: "Coaches", href: "#solutions" },
  { label: "Parents", href: "#solutions" },
  { label: "Pricing", href: "#pricing" },
];

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50 hidden md:block"
    >
      <nav className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/athletic-mindset-logo.png"
              alt="Athletic Mindset"
              width={150}
              height={38}
              className="h-8 w-auto"
              priority
              unoptimized
            />
          </Link>

          {/* Desktop Nav */}
          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              Login
            </Link>
            <Link
              href="#assessment"
              className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-white hover:bg-primary-light transition-all duration-200 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)]"
            >
              Take Assessment
            </Link>
          </div>
        </div>
      </nav>
    </motion.header>
  );
}
