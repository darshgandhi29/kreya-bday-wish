"use client"

import { motion } from "framer-motion"
import { Heart } from "lucide-react"
import { config } from "@/lib/config"

// "Why I Love You" — scroll-triggered staggered cards
export function Reasons() {
  return (
    <section className="relative z-10 min-h-svh snap-start px-4 py-20 md:px-8" aria-label="Why I love you">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mb-14 text-center font-serif text-3xl text-foreground md:text-5xl"
      >
        Why I Love You
      </motion.h2>

      <div className="mx-auto grid max-w-4xl gap-5 md:grid-cols-2">
        {config.reasons.map((reason, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.12, duration: 0.55 }}
            className="flex items-start gap-4 rounded-xl border border-accent/20 bg-card/60 p-5 backdrop-blur-sm transition-colors hover:border-primary/40"
          >
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/15">
              <Heart className="h-4 w-4 fill-primary text-primary" aria-hidden="true" />
            </span>
            <p className="leading-relaxed text-foreground/90">{reason}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
