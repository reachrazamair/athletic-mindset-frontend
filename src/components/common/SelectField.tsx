"use client";

import { useMemo, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Check, Search, X } from "lucide-react";

interface SelectFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  disabled?: boolean;
}

/**
 * A custom select that renders an identical, scrollable option list on every
 * device (native <select> renders inconsistently on mobile). Opens as a
 * bottom sheet on phones and a centered card on larger screens, with a fixed
 * max height and internal scrolling. Long lists get a search box.
 */
export function SelectField({
  id,
  label,
  value,
  onChange,
  options,
  placeholder = "Select one",
  disabled,
}: SelectFieldProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchable = options.length > 10;

  // Escape to close + lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter((o) => o.toLowerCase().includes(q));
  }, [query, options]);

  const openMenu = () => {
    if (disabled) return;
    setQuery("");
    setOpen(true);
  };

  const select = (opt: string) => {
    onChange(opt);
    setOpen(false);
  };

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-text-secondary mb-2">
        {label}
      </label>
      <button
        id={id}
        type="button"
        onClick={openMenu}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`flex w-full items-center justify-between gap-2 rounded-xl border border-border/50 bg-surface-card/60 px-4 py-3 text-sm text-left transition-all focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 disabled:opacity-50 disabled:cursor-not-allowed ${
          value ? "text-text-primary" : "text-text-muted"
        }`}
      >
        <span className="truncate">{value || placeholder}</span>
        <ChevronDown size={16} className="shrink-0 text-text-muted" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[110] flex items-end justify-center sm:items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />

            {/* Panel */}
            <motion.div
              role="listbox"
              aria-label={label}
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
              className="relative flex w-full max-h-[80vh] flex-col rounded-t-3xl border border-border/50 shadow-[0_8px_50px_rgba(0,0,0,0.5)] sm:max-h-[70vh] sm:max-w-sm sm:rounded-3xl"
              style={{ background: "rgba(13, 17, 23, 0.98)" }}
            >
              {/* Mobile grab handle */}
              <div className="mx-auto mt-3 h-1 w-10 rounded-full bg-border/70 sm:hidden" />

              {/* Header */}
              <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-border/40">
                <p className="text-sm font-semibold text-text-primary">{label}</p>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="text-text-muted hover:text-text-primary transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Search (long lists only) */}
              {searchable && (
                <div className="px-4 py-3 border-b border-border/40">
                  <div className="relative">
                    <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search..."
                      className="w-full rounded-xl border border-border/50 bg-surface-card/60 pl-9 pr-3 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30"
                    />
                  </div>
                </div>
              )}

              {/* Options — the only scrollable region */}
              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))]">
                {filtered.length === 0 ? (
                  <p className="px-4 py-6 text-center text-sm text-text-muted">No matches</p>
                ) : (
                  filtered.map((opt) => {
                    const selected = opt === value;
                    return (
                      <button
                        key={opt}
                        type="button"
                        role="option"
                        aria-selected={selected}
                        onClick={() => select(opt)}
                        className={`flex w-full items-center justify-between gap-2 rounded-xl px-4 py-3 text-left text-sm transition-all ${
                          selected
                            ? "bg-primary/10 text-primary-light"
                            : "text-text-secondary hover:text-text-primary hover:bg-surface-card/80 active:bg-primary/10"
                        }`}
                      >
                        <span>{opt}</span>
                        {selected && <Check size={16} className="shrink-0 text-primary-light" />}
                      </button>
                    );
                  })
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
