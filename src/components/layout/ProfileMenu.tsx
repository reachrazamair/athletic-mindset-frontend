"use client";

/**
 * PROFILE MENU — Desktop avatar + dropdown shown when a user is logged in.
 *
 * Click the avatar to open a dropdown with the user's name/email and account
 * actions (Take Assessment, Log out). Closes on outside click or Escape.
 */

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, BarChart3, ChevronDown, Settings } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { displayName, initials } from "@/lib/user-display";
import { LogoutConfirmModal } from "@/components/layout/LogoutConfirmModal";

export function ProfileMenu() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on outside click or Escape
  useEffect(() => {
    if (!open) return;

    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  if (!user) return null;

  const requestLogout = () => {
    setOpen(false);
    setConfirmOpen(true);
  };

  const handleLogout = () => {
    setConfirmOpen(false);
    logout();
    // Full reload so the app boots fresh and replays the intro animation
    window.location.href = "/";
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Account menu"
        className="flex items-center gap-2 rounded-full border border-border/50 bg-surface-card/50 pl-1 pr-2.5 py-1 hover:border-primary/40 transition-all duration-200"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white">
          {initials(user)}
        </span>
        <ChevronDown
          size={15}
          className={`text-text-muted transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            role="menu"
            className="absolute right-0 mt-2 w-64 origin-top-right overflow-hidden rounded-2xl glass border border-border/50 shadow-[0_8px_40px_rgba(0,0,0,0.4)]"
          >
            {/* User info */}
            <div className="flex items-center gap-3 px-4 py-4 border-b border-border/40">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                {initials(user)}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-text-primary">{displayName(user)}</p>
                <p className="truncate text-xs text-text-muted">{user.email}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="p-2">
              <Link
                href="/settings"
                onClick={() => setOpen(false)}
                role="menuitem"
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-text-secondary hover:text-text-primary hover:bg-surface-card/80 transition-all"
              >
                <Settings size={17} className="text-text-muted" />
                Account settings
              </Link>
              <Link
                href="#assessment"
                onClick={() => setOpen(false)}
                role="menuitem"
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-text-secondary hover:text-text-primary hover:bg-surface-card/80 transition-all"
              >
                <BarChart3 size={17} className="text-text-muted" />
                Take Assessment
              </Link>
              <button
                onClick={requestLogout}
                role="menuitem"
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-all"
              >
                <LogOut size={17} />
                Log out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <LogoutConfirmModal
        open={confirmOpen}
        onConfirm={handleLogout}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
}
