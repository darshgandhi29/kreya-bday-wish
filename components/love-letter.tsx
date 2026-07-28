"use client"

import { motion } from "framer-motion"
import { Flame } from "lucide-react"
import { config } from "@/lib/config"

// Love letter revealed line-by-line as the user scrolls, with a glowing candle
export function LoveLetter() {
  return (
    <section className="relative z-10 min-h-svh snap-start px-4 py-20 md:px-8" aria-label="A letter for you">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mb-14 text-center font-serif text-3xl text-foreground md:text-5xl"
      >
        A Letter, Just For You
      </motion.h2>

      <div className="mx-auto flex max-w-3xl items-start gap-6 md:gap-10">
        {/* Glowing candle beside the letter */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="hidden shrink-0 flex-col items-center pt-2 md:flex"
          aria-hidden="true"
        >
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
            className="rounded-full bg-primary/20 p-3"
            style={{ boxShadow: "0 0 40px 12px rgba(255, 107, 157, 0.25)" }}
          >
            <Flame className="h-6 w-6 fill-accent text-accent" />
          </motion.div>
          <div className="mt-1 h-24 w-2.5 rounded-b-sm bg-accent/70" />
        </motion.div>

        {/* The letter — each line fades in as it scrolls into view */}
        <div className="rounded-2xl border border-accent/20 bg-card/50 p-8 backdrop-blur-sm md:p-12">
          {config.loveLetter.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.15, duration: 0.7 }}
              className={`font-serif text-lg italic leading-relaxed text-foreground/90 md:text-xl ${
                i === 0 ? "mb-6 text-primary" : "mb-4"
              }`}
            >
              {line}
            </motion.p>
          ))}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: config.loveLetter.length * 0.15, duration: 0.8 }}
            className="mt-2 font-serif text-2xl italic text-accent"
          >
            {config.yourName}
          </motion.p>
        </div>
      </div>
    </section>
  )
}
