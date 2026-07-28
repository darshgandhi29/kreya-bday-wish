"use client"

import { Suspense, lazy } from "react"
import { motion } from "framer-motion"
import { Heart } from "lucide-react"
import { useMusic } from "@/components/music-provider"
import { config } from "@/lib/config"

// Lazy-load the Three.js scene so the page shell paints instantly
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
  const title = `For ${config.herName}`

  return (
    <section className="relative h-svh w-full snap-start overflow-hidden" aria-label="Welcome">
      {/* Full-screen 3D scene */}
      <div className="absolute inset-0">
        <Suspense fallback={<SceneFallback />}>
          <HeroScene />
        </Suspense>
      </div>

      {/* Overlay content */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-8 px-6 pt-[26vh]">
        {/* Letter-by-letter title reveal */}
        <h1 className="flex flex-wrap items-center justify-center font-serif text-5xl font-medium text-foreground md:text-7xl">
          {title.split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.09, duration: 0.5 }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 + title.length * 0.09, duration: 0.5, type: "spring" }}
            className="ml-3 text-primary"
          >
            <Heart className="inline h-10 w-10 animate-heartbeat fill-primary md:h-14 md:w-14" aria-hidden="true" />
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4, duration: 1 }}
          className="text-balance text-center text-sm text-muted-foreground md:text-base"
        >
          A little universe, made just for you
        </motion.p>

        {/* Tap to Begin — user gesture unlocks BGM autoplay */}
        {!hasStarted && (
          <motion.button
            type="button"
            onClick={start}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3, duration: 0.8 }}
            className="pointer-events-auto rounded-full border border-primary/50 bg-primary/10 px-8 py-3 text-sm font-medium text-primary backdrop-blur-sm transition-all hover:bg-primary hover:text-primary-foreground"
          >
            Tap to Begin
          </motion.button>
        )}
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4, duration: 1 }}
        className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-accent/40 p-1">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.6 }}
            className="h-2 w-1.5 rounded-full bg-accent"
          />
        </div>
      </motion.div>
    </section>
  )
}
