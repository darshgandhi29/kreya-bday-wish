"use client"

import { Suspense, lazy } from "react"
import { motion } from "framer-motion"
import { Heart } from "lucide-react"

// Lazy-load the second Three.js scene — it only loads when needed
const GiftBoxScene = lazy(() =>
  import("@/components/gift-box-scene").then((m) => ({ default: m.GiftBoxScene })),
)

export function Centerpiece() {
  return (
    <section className="relative z-10 min-h-svh snap-start px-4 py-20 md:px-8" aria-label="A gift for you">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mb-4 text-center font-serif text-3xl text-foreground md:text-5xl"
      >
        A Little Gift
      </motion.h2>
      <p className="mb-8 text-center text-sm text-muted-foreground">
        Something is waiting inside...
      </p>

      <div className="mx-auto max-w-3xl">
        <Suspense
          fallback={
            <div className="flex h-[420px] w-full items-center justify-center md:h-[520px]">
              <Heart className="h-10 w-10 animate-heartbeat fill-primary text-primary" />
            </div>
          }
        >
          <GiftBoxScene />
        </Suspense>
      </div>
    </section>
  )
}
