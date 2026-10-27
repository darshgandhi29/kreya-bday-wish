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
      colors: ["#ff3875", "#ffd166", "#f7aef8"],
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
    <section className="relative z-10 snap-start px-4 py-24 text-center md:px-8 md:py-32" aria-label="A surprise">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <button
          type="button"
          onClick={fireConfetti}
          className="group inline-flex items-center gap-3 rounded-full bg-primary px-10 py-4.5 text-base font-semibold text-primary-foreground shadow-xl shadow-primary/30 transition-transform hover:scale-105 active:scale-95 animate-pulse-glow"
        >
          <Sparkles className="h-5 w-5 transition-transform group-hover:rotate-12" aria-hidden="true" />
          🎉 Click for Your Birthday Surprise! 🎉
        </button>
        {clicked && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="mt-8 flex flex-col items-center gap-2"
          >
            <p className="font-serif text-2xl font-semibold italic text-primary md:text-3xl">
              🎂 Happy Birthday Kreya! 🎂
            </p>
            <p className="max-w-lg font-serif text-base italic text-accent md:text-lg">
              You deserve all the love, happiness & celebrations in the world today and every day 💗
            </p>
            <p className="font-serif text-sm font-semibold tracking-wider text-muted-foreground uppercase mt-1">
              — Forever Yours, Darsh ✨
            </p>
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}
