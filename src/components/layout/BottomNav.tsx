"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, BarChart3, Trophy, User, LogOut } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { displayName, initials } from "@/lib/user-display";
import { LogoutConfirmModal } from "@/components/layout/LogoutConfirmModal";

const baseNavItems = [
  {
    icon: Home,
    label: "Home",
    href: "/",
    submenu: null as { label: string; href: string }[] | null,
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
    label: "For You",
    href: "#solutions",
    submenu: [
      { label: "Athletes", href: "/athletes" },
      { label: "Parents", href: "/parents" },
      { label: "Coaches", href: "/coaches" },
      { label: "Club & School", href: "/club" },
      { label: "Partner Program", href: "/partners" },
    ],
  },
];

export function BottomNav() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  const handleTap = (hasSubmenu: boolean, label: string) => {
    if (hasSubmenu) {
      setActiveMenu(activeMenu === label ? null : label);
    } else {
      setActiveMenu(null);
    }
  };

  const requestLogout = () => {
    setActiveMenu(null);
    setConfirmOpen(true);
  };

  const handleLogout = () => {
    setConfirmOpen(false);
    logout();
    // Full reload so the app boots fresh and replays the intro animation
    window.location.href = "/";
  };

  const handleHome = () => {
    setActiveMenu(null);
    // Full load to home so the intro animation plays, then lands on the page
    window.location.href = "/";
  };

  // The Account tab links depend on whether the user is logged in.
  const accountSubmenu = isAuthenticated
    ? [
        { label: "Account settings", href: "/settings" },
        { label: "Take Assessment", href: "#assessment" },
        { label: "Log out", href: "#", action: "logout" as const },
      ]
    : [
        { label: "Login", href: "/login" },
        { label: "Sign Up Free", href: "/signup" },
      ];

  const navItems = [
    ...baseNavItems,
    {
      icon: User,
      label: "Account",
      href: "#",
      submenu: accountSubmenu as {
        label: string;
        href: string;
        action?: "logout";
      }[],
    },
  ];

  const activeItem = navItems.find((item) => item.label === activeMenu);

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
          {activeMenu && activeItem?.submenu && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              className="mx-4 mb-2 rounded-2xl glass border border-border/50 overflow-hidden"
            >
              {/* Logged-in profile header on the Account tab */}
              {activeMenu === "Account" && isAuthenticated && user && (
                <div className="flex items-center gap-3 px-4 py-4 border-b border-border/40">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                    {initials(user)}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-text-primary">{displayName(user)}</p>
                    <p className="truncate text-xs text-text-muted">{user.email}</p>
                  </div>
                </div>
              )}

              <div className="p-3 space-y-1">
                {activeItem.submenu.map((sub) =>
                  "action" in sub && sub.action === "logout" ? (
                    <button
                      key={sub.label}
                      onClick={requestLogout}
                      className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 active:bg-red-500/15 transition-all"
                    >
                      <LogOut size={17} />
                      {sub.label}
                    </button>
                  ) : (
                    <Link
                      key={sub.label}
                      href={sub.href}
                      onClick={() => setActiveMenu(null)}
                      className="block px-4 py-3 rounded-xl text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-surface-card/80 active:bg-primary/10 transition-all"
                    >
                      {sub.label}
                    </Link>
                  )
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Nav bar */}
        <div
          className="glass border-t border-border/50 px-6 pb-[env(safe-area-inset-bottom)] pt-2"
          style={{ background: "rgba(10, 14, 20, 0.98)" }}
        >
          <div className="flex items-center justify-around">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeMenu === item.label;
              const showAvatar = item.label === "Account" && isAuthenticated && user;
              return (
                <button
                  key={item.label}
                  onClick={() => {
                    if (item.submenu) {
                      handleTap(true, item.label);
                    } else if (item.label === "Home") {
                      handleHome();
                    } else {
                      handleTap(false, item.label);
                    }
                  }}
                  className="flex flex-col items-center gap-1 py-2 px-3 min-w-[64px] active:scale-95 transition-transform"
                >
                  <div
                    className={`p-2 rounded-xl transition-all duration-200 ${
                      isActive ? "bg-primary/15 text-primary-light" : "text-text-muted"
                    }`}
                  >
                    {showAvatar ? (
                      <span
                        className={`flex h-[22px] w-[22px] items-center justify-center rounded-full text-[10px] font-semibold text-white ${
                          isActive ? "bg-primary-light" : "bg-primary"
                        }`}
                      >
                        {initials(user)}
                      </span>
                    ) : (
                      <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                    )}
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

      <LogoutConfirmModal
        open={confirmOpen}
        onConfirm={handleLogout}
        onCancel={() => setConfirmOpen(false)}
      />
    </>
  );
}
