"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { config } from "@/lib/config"

interface Elapsed {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function getElapsed(from: Date): Elapsed {
  const diff = Math.max(0, Date.now() - from.getTime())
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor(diff / 3600000) % 24,
    minutes: Math.floor(diff / 60000) % 60,
    seconds: Math.floor(diff / 1000) % 60,
  }
}

// A single flip-clock style digit block
function FlipUnit({ value, label }: { value: number; label: string }) {
  const display = String(value).padStart(2, "0")
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative h-20 w-16 overflow-hidden rounded-lg border border-accent/25 bg-card shadow-lg shadow-primary/10 md:h-28 md:w-24">
        {/* Flip seam */}
        <div className="absolute left-0 right-0 top-1/2 z-10 h-px bg-background/60" />
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={display}
            initial={{ rotateX: -90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            exit={{ rotateX: 90, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 flex items-center justify-center font-serif text-3xl font-semibold text-primary md:text-5xl"
          >
            {display}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="text-xs uppercase tracking-widest text-muted-foreground">{label}</span>
    </div>
  )
}

// Live counter — "Together for X days..." Set the start date in lib/config.ts
export function LoveCounter() {
  const [elapsed, setElapsed] = useState<Elapsed | null>(null)

  useEffect(() => {
    // Only tick on the client to avoid hydration mismatch
    setElapsed(getElapsed(config.relationshipStart))
    const interval = setInterval(() => setElapsed(getElapsed(config.relationshipStart)), 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative z-10 snap-start px-4 py-20 md:px-8" aria-label="Time together">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mb-12 text-center font-serif text-3xl text-foreground md:text-5xl"
      >
        Together For
      </motion.h2>

      <div className="flex items-start justify-center gap-3 md:gap-6">
        {elapsed ? (
          <>
            <FlipUnit value={elapsed.days} label="Days" />
            <FlipUnit value={elapsed.hours} label="Hours" />
            <FlipUnit value={elapsed.minutes} label="Minutes" />
            <FlipUnit value={elapsed.seconds} label="Seconds" />
          </>
        ) : (
          <p className="text-muted-foreground">Counting every second...</p>
        )}
      </div>

      <p className="mt-10 text-center font-serif text-lg italic text-accent">
        ...and every second has been worth it.
      </p>
    </section>
  )
}
