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

// A single flip-clock style card unit for Days, Hours, Minutes, Seconds
function FlipUnit({ value, label }: { value: number; label: string }) {
  const display = String(value).padStart(2, "0")
  return (
    <div className="flex flex-col items-center gap-2.5">
      <div className="relative flex h-20 min-w-16 items-center justify-center overflow-hidden rounded-xl border border-accent/30 bg-card/90 px-3.5 shadow-lg shadow-primary/10 backdrop-blur-md md:h-28 md:min-w-24 md:px-6">
        {/* Flip seam line */}
        <div className="absolute left-0 right-0 top-1/2 z-10 h-px bg-background/60" />
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={display}
            initial={{ rotateX: -90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            exit={{ rotateX: 90, opacity: 0 }}
            transition={{ duration: 0.45 }}
            className="font-serif text-3xl font-bold text-primary md:text-5xl"
          >
            {display}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground md:text-xs">
        {label}
      </span>
    </div>
  )
}

export function LoveCounter() {
  const [elapsed, setElapsed] = useState<Elapsed | null>(null)

  useEffect(() => {
    // Only tick on the client to avoid hydration mismatch
    setElapsed(getElapsed(config.relationshipStart))
    const interval = setInterval(() => setElapsed(getElapsed(config.relationshipStart)), 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative z-10 snap-start px-4 py-24 md:px-8 md:py-32" aria-label="Time together">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mb-12 text-center font-serif text-3xl text-foreground md:text-5xl"
      >
        Together For
      </motion.h2>

      <div className="flex items-start justify-center gap-3.5 md:gap-7">
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

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="mt-12 text-center font-serif text-lg italic text-accent md:text-xl"
      >
        ...and every second has been worth it.
      </motion.p>
    </section>
  )
}


