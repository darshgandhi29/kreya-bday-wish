"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import confetti from "canvas-confetti"
import { Sparkles } from "lucide-react"

// "Click for a Surprise" — heart-shaped confetti burst
export function Surprise() {
  const [clicked, setClicked] = useState(false)

  const fireConfetti = () => {
    setClicked(true)

    // Heart-shaped confetti in the theme colors
    const heart = confetti.shapeFromText({ text: "💗", scalar: 2 })
    const defaults = {
      colors: ["#ff6b9d", "#e8b4b8", "#ffd1dc"],
      shapes: [heart, "circle" as const],
      scalar: 1.4,
    }

    confetti({ ...defaults, particleCount: 60, spread: 80, origin: { x: 0.3, y: 0.6 } })
    confetti({ ...defaults, particleCount: 60, spread: 80, origin: { x: 0.7, y: 0.6 } })
    setTimeout(() => {
      confetti({ ...defaults, particleCount: 90, spread: 120, origin: { x: 0.5, y: 0.5 } })
    }, 300)
  }

  return (
    <section className="relative z-10 snap-start px-4 py-20 text-center md:px-8" aria-label="A surprise">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <button
          type="button"
          onClick={fireConfetti}
          className="group inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 font-medium text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:scale-105 active:scale-95"
        >
          <Sparkles className="h-5 w-5 transition-transform group-hover:rotate-12" aria-hidden="true" />
          Click for a Surprise
        </button>
        {clicked && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 font-serif text-lg italic text-accent"
          >
            You deserve all the celebrations in the world 💗
          </motion.p>
        )}
      </motion.div>
    </section>
  )
}
