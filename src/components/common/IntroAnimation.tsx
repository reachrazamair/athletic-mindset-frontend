"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"build" | "glow" | "text" | "zoom">(
    "build"
  );

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("glow"), 1600);
    const t2 = setTimeout(() => setPhase("text"), 2800);
    const t3 = setTimeout(() => setPhase("zoom"), 4200);
    const t4 = setTimeout(() => onComplete(), 5000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  // Logo bars: 3 bars — tall, short (center), tall — matching the AM logo icon
  const bars = [
    { width: 14, height: 90, delay: 0, x: -24 },      // left tall bar
    { width: 12, height: 56, delay: 0.2, x: 0 },      // center short bar
    { width: 14, height: 90, delay: 0.4, x: 24 },     // right tall bar
  ];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
        animate={
          phase === "zoom"
            ? { opacity: 0 }
            : { opacity: 1 }
        }
        transition={
          phase === "zoom"
            ? { duration: 0.7, delay: 0.1 }
            : {}
        }
      >
        {/* Deep ambient pulse */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background:
              phase === "glow" || phase === "text"
                ? [
                    "radial-gradient(circle at 50% 50%, rgba(37,99,235,0) 0%, transparent 60%)",
                    "radial-gradient(circle at 50% 50%, rgba(37,99,235,0.12) 0%, transparent 60%)",
                    "radial-gradient(circle at 50% 50%, rgba(37,99,235,0.06) 0%, transparent 60%)",
                  ]
                : "radial-gradient(circle at 50% 50%, rgba(37,99,235,0) 0%, transparent 60%)",
          }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        />

        {/* Expanding ring waves on zoom */}
        {phase === "zoom" && (
          <>
            {/* Vertical bar shockwaves — matching the logo shape bursting outward */}
            {[-1, 0, 1].map((dir, i) => (
              <motion.div
                key={`bar-burst-${i}`}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[4px]"
                style={{
                  width: i === 1 ? "12px" : "14px",
                  background: "linear-gradient(180deg, #3b82f6, #2563eb)",
                }}
                initial={{
                  height: i === 1 ? 56 : 90,
                  x: dir * 24,
                  opacity: 1,
                  scaleY: 1,
                }}
                animate={{
                  height: "120vh",
                  x: dir * 200,
                  opacity: [1, 0.8, 0],
                  scaleX: [1, 3, 8],
                }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            ))}

            {/* Horizontal streaks — energy lines shooting left and right */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`streak-${i}`}
                className="absolute top-1/2 left-1/2 h-[2px] rounded-full"
                style={{
                  width: "60px",
                  background:
                    "linear-gradient(90deg, transparent, #3b82f6, transparent)",
                  rotate: `${i * 45}deg`,
                }}
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scaleX: [0, 15, 30],
                  scaleY: [1, 1.5, 0.5],
                }}
                transition={{
                  duration: 0.7,
                  delay: 0.05 + i * 0.03,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            ))}

            {/* Diamond-shaped shockwave expanding */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={`diamond-${i}`}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-primary/50"
                style={{ rotate: "45deg" }}
                initial={{ width: 20, height: 20, opacity: 1 }}
                animate={{
                  width: [20, 600, 1200],
                  height: [20, 600, 1200],
                  opacity: [1, 0.5, 0],
                  borderWidth: [2, 1, 0],
                }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            ))}

            {/* Full-screen white/blue flash — the IMPACT moment */}
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.9, 0.6, 0] }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, rgba(59,130,246,0.9) 0%, rgba(37,99,235,0.5) 30%, rgba(0,0,0,0.8) 70%)",
              }}
            />

            {/* Secondary softer pulse after the flash */}
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0, 0.4, 0] }}
              transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, rgba(96,165,250,0.4) 0%, transparent 50%)",
              }}
            />

            {/* Particle explosion — debris shooting outward */}
            {[...Array(16)].map((_, i) => {
              const angle = (i / 16) * 360;
              const rad = (angle * Math.PI) / 180;
              const tx = Math.cos(rad) * 600;
              const ty = Math.sin(rad) * 600;
              return (
                <motion.div
                  key={`explode-${i}`}
                  className="absolute top-1/2 left-1/2 rounded-full"
                  style={{
                    width: `${3 + (i % 3)}px`,
                    height: `${3 + (i % 3)}px`,
                    background: i % 2 === 0 ? "#3b82f6" : "#60a5fa",
                  }}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{
                    x: tx,
                    y: ty,
                    opacity: [1, 0.8, 0],
                    scale: [1, 1.5, 0],
                  }}
                  transition={{
                    duration: 0.6,
                    delay: 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              );
            })}
          </>
        )}

        {/* Floating particles — dreamy atmosphere */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`p-${i}`}
            className="absolute rounded-full"
            style={{
              width: `${2 + (i % 3)}px`,
              height: `${2 + (i % 3)}px`,
              left: `${10 + ((i * 4.7) % 80)}%`,
              top: `${10 + ((i * 7.3) % 80)}%`,
              background:
                i % 2 === 0
                  ? "rgba(37,99,235,0.5)"
                  : "rgba(96,165,250,0.4)",
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: phase === "zoom" ? 0 : [0, 0.7, 0],
              scale: phase === "zoom" ? 3 : [0, 1, 0],
              y: phase === "zoom" ? [0, -200] : [0, -30, 0],
              x: phase === "zoom" ? [0, (i % 2 === 0 ? 100 : -100)] : 0,
            }}
            transition={{
              duration: phase === "zoom" ? 0.4 : 3 + (i % 2),
              delay: phase === "zoom" ? i * 0.015 : 0.3 + i * 0.12,
              repeat: phase === "zoom" ? 0 : Infinity,
              ease: phase === "zoom" ? [0.22, 1, 0.36, 1] : "easeInOut",
            }}
          />
        ))}

        {/* Main content */}
        <motion.div
          className="relative flex flex-col items-center"
          animate={
            phase === "zoom"
              ? { scale: 3.5, y: -40, opacity: 0, filter: "blur(10px)" }
              : { scale: 1, y: 0, opacity: 1, filter: "blur(0px)" }
          }
          transition={
            phase === "zoom"
              ? { duration: 0.45, ease: [0.76, 0, 0.24, 1] }
              : {}
          }
        >
          {/* Logo Bars — 3 bars matching AM logo: tall | short | tall */}
          <div className="relative flex items-center justify-center mb-8 h-[100px] md:h-[120px]">
            {bars.map((bar, i) => (
              <motion.div
                key={i}
                className="absolute rounded-[3px] md:rounded-[4px]"
                style={{
                  width: `${bar.width}px`,
                  x: bar.x,
                  background:
                    "linear-gradient(180deg, #3b82f6 0%, #2563eb 60%, #1d4ed8 100%)",
                }}
                initial={{
                  height: 0,
                  opacity: 0,
                  rotateX: -40,
                  y: 30,
                }}
                animate={{
                  height:
                    phase === "glow"
                      ? [bar.height, bar.height + 8, bar.height - 4, bar.height]
                      : bar.height,
                  opacity: 1,
                  rotateX: 0,
                  y: 0,
                  boxShadow:
                    phase === "glow" || phase === "text"
                      ? [
                          "0 0 20px rgba(37,99,235,0.4), 0 0 40px rgba(37,99,235,0.2)",
                          "0 0 30px rgba(37,99,235,0.6), 0 0 60px rgba(37,99,235,0.3)",
                          "0 0 20px rgba(37,99,235,0.4), 0 0 40px rgba(37,99,235,0.2)",
                        ]
                      : "0 0 0px rgba(37,99,235,0)",
                }}
                transition={{
                  height: {
                    delay: bar.delay,
                    duration: phase === "glow" ? 1.8 : 0.9,
                    ease: phase === "glow" ? "easeInOut" : [0.34, 1.56, 0.64, 1],
                    repeat: phase === "glow" ? Infinity : 0,
                    repeatType: "reverse",
                  },
                  opacity: { delay: bar.delay, duration: 0.4 },
                  rotateX: {
                    delay: bar.delay,
                    duration: 0.8,
                    ease: [0.34, 1.56, 0.64, 1],
                  },
                  y: { delay: bar.delay, duration: 0.8, ease: "easeOut" },
                  boxShadow: {
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  },
                }}
              />
            ))}

            {/* Reflection / mirror effect below bars */}
            <motion.div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-16 h-8 opacity-30 blur-sm"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(37,99,235,0.3), transparent)",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === "glow" || phase === "text" ? 0.3 : 0 }}
              transition={{ duration: 1 }}
            />
          </div>

          {/* Tagline text */}
          <motion.p
            className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-text-muted mb-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity:
                phase === "glow" || phase === "text" ? 1 : phase === "zoom" ? 0 : 0,
              y: phase === "glow" || phase === "text" ? 0 : 10,
            }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Measure. Train. Perform.
          </motion.p>

          {/* Brand name */}
          <motion.p
            className="font-display text-xl md:text-3xl font-black uppercase tracking-wider text-white"
            initial={{ opacity: 0, y: 8, letterSpacing: "0.05em" }}
            animate={{
              opacity: phase === "text" ? 1 : 0,
              y: phase === "text" ? 0 : 8,
              letterSpacing: phase === "text" ? "0.15em" : "0.05em",
            }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            Athletic Mindset
          </motion.p>

          {/* Subtle loading indicator */}
          <motion.div
            className="mt-6 w-24 md:w-32 h-[2px] bg-white/5 rounded-full overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === "zoom" ? 0 : 0.8 }}
            transition={{ delay: 1.2, duration: 0.3 }}
          >
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-primary/80 to-primary-light"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 4.2, ease: [0.4, 0, 0.2, 1] }}
            />
          </motion.div>
        </motion.div>

        {/* Corner frame accents */}
        {[
          "top-5 left-5",
          "top-5 right-5",
          "bottom-5 left-5",
          "bottom-5 right-5",
        ].map((pos, i) => (
          <motion.div
            key={`corner-${i}`}
            className={`absolute ${pos}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === "zoom" ? 0 : 0.4 }}
            transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
          >
            <div
              className={`w-6 h-[1px] bg-primary/30 ${
                i % 2 === 1 ? "ml-auto" : ""
              }`}
            />
            <div
              className={`w-[1px] h-6 bg-primary/30 ${
                i % 2 === 1 ? "ml-auto" : ""
              }`}
            />
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
