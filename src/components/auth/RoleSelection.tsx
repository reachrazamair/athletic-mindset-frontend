"use client";

import { motion } from "framer-motion";
import { Trophy, Users, GraduationCap } from "lucide-react";

const roles = [
  {
    id: "athlete",
    icon: Trophy,
    title: "Athlete",
    description: "I compete in sports",
  },
  {
    id: "parent",
    icon: Users,
    title: "Parent",
    description: "My child competes",
  },
  {
    id: "coach",
    icon: GraduationCap,
    title: "Coach",
    description: "I coach athletes",
  },
];

interface RoleSelectionProps {
  onSelect: (role: string) => void;
  isLoading: boolean;
}

export function RoleSelection({ onSelect, isLoading }: RoleSelectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-md"
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-8"
      >
        {/* <h2 className="text-2xl font-bold text-text-primary mb-2">I am a...</h2> */}
        <p className="text-sm text-text-muted">Select your role in order to personalize your experience</p>
      </motion.div>

      <div className="grid grid-cols-1 gap-4">
        {roles.map((role, i) => {
          const Icon = role.icon;
          return (
            <motion.button
              key={role.id}
              onClick={() => !isLoading && onSelect(role.id)}
              disabled={isLoading}
              initial={{ opacity: 0, y: 40, rotateX: -15 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.3 + i * 0.15,
                type: "spring",
                stiffness: 200,
                damping: 20,
              }}
              whileHover={{ scale: 1.02, y: -2, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
              className="group relative rounded-2xl border border-border/50 bg-surface-card/50 p-6 text-left hover:border-primary/40 hover:shadow-[0_0_30px_rgba(37,99,235,0.1)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ perspective: "1000px" }}
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Icon size={22} className="text-primary-light" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-text-primary">{role.title}</h3>
                  <p className="text-sm text-text-muted">{role.description}</p>
                </div>
              </div>

              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
