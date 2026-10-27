"use client"

import { Suspense, lazy } from "react"
import { motion } from "framer-motion"
import { Heart } from "lucide-react"
import { useMusic } from "@/components/music-provider"
import { config } from "@/lib/config"

const HeroScene = lazy(() => import("@/components/hero-scene").then((m) => ({ default: m.HeroScene })))

function SceneFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-background">
      <Heart className="h-10 w-10 animate-heartbeat fill-primary text-primary" />
    </div>
  )
}

export function Hero() {
  const { hasStarted, start } = useMusic()
  const title = `Happy Birthday ${config.herName}! 🎂`

  return (
    <section className="relative min-h-[92svh] w-full overflow-hidden flex flex-col items-center justify-center" aria-label="Welcome">
      {/* 3D Scene */}
      <div className="absolute inset-0">
        <Suspense fallback={<SceneFallback />}>
          <HeroScene />
        </Suspense>
      </div>

      {/* Soft vignette overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(14,9,25,0.85)_100%)]" />

      {/* Overlay content */}
      <div className="pointer-events-none relative z-10 flex flex-col items-center justify-center gap-5 px-4 pt-16 pb-12 text-center md:gap-7">
        {/* Festive Happy Birthday badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex items-center gap-1.5 rounded-full border border-primary/40 bg-card/85 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-primary backdrop-blur-md shadow-md shadow-primary/20 md:text-xs"
        >
          <span>🎉 Happy Birthday, My Queen! 🎉</span>
        </motion.div>

        {/* Letter-by-letter Happy Birthday title reveal */}
        <h1 className="flex flex-wrap items-center justify-center text-center font-serif text-3xl font-medium text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
          {Array.from(title).map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.05, duration: 0.35 }}
            >
              {char === " " ? " " : char}
            </motion.span>
          ))}
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + title.length * 0.05, duration: 0.4, type: "spring" }}
            className="ml-2 inline-flex items-center text-primary"
          >
            <Heart className="h-8 w-8 animate-heartbeat fill-primary md:h-12 md:w-12" aria-hidden="true" />
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="max-w-md text-balance text-center text-xs font-medium text-muted-foreground sm:text-sm md:text-base"
        >
          A magical universe created by <span className="font-serif italic text-accent font-semibold">Darsh</span>, just for your special day 💗
        </motion.p>

        {/* Tap to Begin button */}
        {!hasStarted && (
          <motion.button
            type="button"
            onClick={start}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            transition={{ delay: 2.2, duration: 0.6 }}
            className="animate-pulse-glow pointer-events-auto mt-2 rounded-full border border-primary/60 bg-primary/25 px-8 py-3 text-sm font-semibold text-primary backdrop-blur-md transition-all hover:bg-primary hover:text-primary-foreground shadow-[0_0_20px_rgba(255,56,117,0.4)]"
          >
            Tap to Begin 🎵
          </motion.button>
        )}
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 0.8 }}
        className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2"
      >
        <div className="flex h-8 w-4.5 items-start justify-center rounded-full border border-accent/40 p-1">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
            className="h-1.5 w-1 rounded-full bg-accent"
          />
        </div>
      </motion.div>
    </section>
  )
}
