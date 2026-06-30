"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, UserCog } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { AccountTab } from "@/components/settings/AccountTab";
import { useAuth } from "@/lib/auth-context";

// Settings tabs. Just one for now — structured so more can be added later
// (e.g. Notifications, Billing, Privacy) without touching the layout.
const TABS = [{ id: "account", label: "Account", icon: UserCog }] as const;

type TabId = (typeof TABS)[number]["id"];

export default function SettingsPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<TabId>("account");

  // Guard: only logged-in users can see settings.
  useEffect(() => {
    if (!isLoading && !user) router.replace("/login");
  }, [isLoading, user, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-[100dvh] bg-surface flex items-center justify-center">
        <Loader2 size={24} className="animate-spin text-text-muted" />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-[100dvh] bg-surface pt-10 md:pt-28 pb-24 md:pb-16">
        <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <h1 className="text-2xl md:text-3xl font-bold text-text-primary">Settings</h1>
            <p className="mt-1 text-sm text-text-muted">Manage your account and preferences.</p>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-6 md:gap-10">
            {/* Tab nav — sidebar on desktop, pills on mobile */}
            <nav className="md:w-48 shrink-0">
              <div className="flex md:flex-col gap-1.5">
                {TABS.map((tab) => {
                  const Icon = tab.icon;
                  const active = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                        active
                          ? "bg-primary/10 text-primary-light"
                          : "text-text-secondary hover:text-text-primary hover:bg-surface-card/60"
                      }`}
                    >
                      <Icon size={17} />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </nav>

            {/* Tab content */}
            <div className="flex-1 min-w-0">
              {activeTab === "account" && <AccountTab />}
            </div>
          </div>
        </div>
      </main>
      <BottomNav />
    </>
  );
}
