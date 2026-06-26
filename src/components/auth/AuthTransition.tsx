"use client";

import { motion, AnimatePresence } from "framer-motion";

interface AuthTransitionProps {
  show: boolean;
  message?: string;
}

export function AuthTransition({ show, message = "Building your experience..." }: AuthTransitionProps) {
  const bars = [
    { width: 14, height: 70, delay: 0, x: -24 },
    { width: 12, height: 44, delay: 0.15, x: 0 },
    { width: 14, height: 70, delay: 0.3, x: 24 },
  ];

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Ambient pulse */}
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                "radial-gradient(circle at 50% 50%, rgba(37,99,235,0) 0%, transparent 60%)",
                "radial-gradient(circle at 50% 50%, rgba(37,99,235,0.1) 0%, transparent 60%)",
                "radial-gradient(circle at 50% 50%, rgba(37,99,235,0.05) 0%, transparent 60%)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          />

          {/* Floating particles */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${2 + (i % 3)}px`,
                height: `${2 + (i % 3)}px`,
                left: `${15 + ((i * 6) % 70)}%`,
                top: `${15 + ((i * 8) % 70)}%`,
                background: i % 2 === 0 ? "rgba(37,99,235,0.5)" : "rgba(96,165,250,0.4)",
              }}
              animate={{
                opacity: [0, 0.6, 0],
                y: [0, -20, 0],
              }}
              transition={{
                duration: 2.5 + (i % 2),
                delay: i * 0.15,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Logo bars with glow */}
          <motion.div className="relative flex flex-col items-center">
            <div className="relative flex items-center justify-center mb-6 h-[80px]">
              {bars.map((bar, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-[3px]"
                  style={{
                    width: `${bar.width}px`,
                    x: bar.x,
                    background: "linear-gradient(180deg, #3b82f6 0%, #2563eb 60%, #1d4ed8 100%)",
                  }}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: [bar.height, bar.height + 6, bar.height - 3, bar.height],
                    opacity: 1,
                    boxShadow: [
                      "0 0 15px rgba(37,99,235,0.3), 0 0 30px rgba(37,99,235,0.15)",
                      "0 0 25px rgba(37,99,235,0.5), 0 0 50px rgba(37,99,235,0.25)",
                      "0 0 15px rgba(37,99,235,0.3), 0 0 30px rgba(37,99,235,0.15)",
                    ],
                  }}
                  transition={{
                    height: { duration: 1.6, repeat: Infinity, repeatType: "reverse", delay: bar.delay },
                    opacity: { duration: 0.4, delay: bar.delay },
                    boxShadow: { duration: 1.8, repeat: Infinity, repeatType: "reverse" },
                  }}
                />
              ))}
            </div>

            {/* Message */}
            <motion.p
              className="text-sm text-text-secondary tracking-wide"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              {message}
            </motion.p>

            {/* Progress bar */}
            <motion.div
              className="mt-4 w-32 h-[2px] bg-white/5 rounded-full overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ delay: 0.7 }}
            >
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-primary/80 to-primary-light"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.5, ease: [0.4, 0, 0.2, 1] }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
