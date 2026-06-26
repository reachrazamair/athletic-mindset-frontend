"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-[100dvh] bg-surface flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Background ambient effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(37,99,235,0.06)_0%,_transparent_50%)]" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-primary/3 blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-accent/3 blur-[100px]" />

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <Link href="/">
          <Image
            src="/athletic-mindset-logo.png"
            alt="Athletic Mindset"
            width={160}
            height={40}
            className="h-9 w-auto"
            priority
            unoptimized
          />
        </Link>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 w-full flex flex-col items-center">
        {children}
      </div>

      {/* Corner accents */}
      {["top-4 left-4", "top-4 right-4", "bottom-4 left-4", "bottom-4 right-4"].map((pos, i) => (
        <motion.div
          key={i}
          className={`absolute ${pos} hidden md:block`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 0.8 + i * 0.1 }}
        >
          <div className={`w-5 h-[1px] bg-primary/30 ${i % 2 === 1 ? "ml-auto" : ""}`} />
          <div className={`w-[1px] h-5 bg-primary/30 ${i % 2 === 1 ? "ml-auto" : ""}`} />
        </motion.div>
      ))}
    </div>
  );
}
