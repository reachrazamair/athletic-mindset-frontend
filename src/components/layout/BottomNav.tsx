"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, BarChart3, Trophy, User } from "lucide-react";
import Link from "next/link";

const navItems = [
  {
    icon: Home,
    label: "Home",
    href: "#",
    submenu: null,
  },
  {
    icon: BarChart3,
    label: "Assessment",
    href: "#assessment",
    submenu: [
      { label: "Take Assessment", href: "#assessment" },
      { label: "How It Works", href: "#how-it-works" },
      { label: "What We Measure", href: "#what-we-measure" },
    ],
  },
  {
    icon: Trophy,
    label: "Solutions",
    href: "#solutions",
    submenu: [
      { label: "For Athletes", href: "#solutions" },
      { label: "For Parents", href: "#solutions" },
      { label: "For Coaches", href: "#solutions" },
      { label: "Pricing", href: "#pricing" },
    ],
  },
  {
    icon: User,
    label: "Account",
    href: "#",
    submenu: [
      { label: "Login", href: "#" },
      { label: "Sign Up Free", href: "#assessment" },
    ],
  },
];

export function BottomNav() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const handleTap = (item: (typeof navItems)[0]) => {
    if (item.submenu) {
      setActiveMenu(activeMenu === item.label ? null : item.label);
    } else {
      setActiveMenu(null);
    }
  };

  return (
    <>
      {/* Backdrop overlay when submenu is open */}
      <AnimatePresence>
        {activeMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={() => setActiveMenu(null)}
          />
        )}
      </AnimatePresence>

      {/* Bottom Navigation - mobile only */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        {/* Submenu panel */}
        <AnimatePresence>
          {activeMenu && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              className="mx-4 mb-2 rounded-2xl glass border border-border/50 overflow-hidden"
            >
              <div className="p-3 space-y-1">
                {navItems
                  .find((item) => item.label === activeMenu)
                  ?.submenu?.map((sub) => (
                    <Link
                      key={sub.label}
                      href={sub.href}
                      onClick={() => setActiveMenu(null)}
                      className="block px-4 py-3 rounded-xl text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-surface-card/80 active:bg-primary/10 transition-all"
                    >
                      {sub.label}
                    </Link>
                  ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Nav bar */}
        <div className="glass border-t border-border/50 px-6 pb-[env(safe-area-inset-bottom)] pt-2">
          <div className="flex items-center justify-around">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeMenu === item.label;
              return (
                <button
                  key={item.label}
                  onClick={() => handleTap(item)}
                  className="flex flex-col items-center gap-1 py-2 px-3 min-w-[64px] active:scale-95 transition-transform"
                >
                  <div
                    className={`p-2 rounded-xl transition-all duration-200 ${
                      isActive
                        ? "bg-primary/15 text-primary-light"
                        : "text-text-muted"
                    }`}
                  >
                    <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                  </div>
                  <span
                    className={`text-[10px] font-medium transition-colors ${
                      isActive ? "text-primary-light" : "text-text-muted"
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
}
