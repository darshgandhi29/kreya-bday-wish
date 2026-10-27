"use client"

import { useState } from "react"
import { Heart } from "lucide-react"
import { config } from "@/lib/config"

function ReasonCard({ reason, index }: { reason: string; index: number }) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div
      onClick={() => setIsFlipped((v) => !v)}
      className="group relative h-36 md:h-44 w-full cursor-pointer select-none"
    >
      <div className="relative h-full w-full overflow-hidden rounded-2xl border border-accent/25 bg-card/80 p-5 shadow-lg backdrop-blur-md transition-all duration-200 hover:border-primary/50">
        {/* Front content */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center p-5 text-center transition-opacity duration-200 ${
            isFlipped ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <span className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 shadow-inner">
            <Heart className="h-5 w-5 animate-heartbeat fill-primary text-primary" />
          </span>
          <h3 className="font-serif text-base font-medium text-foreground">Reason #{index + 1}</h3>
          <span className="mt-1 rounded-full bg-accent/10 px-2.5 py-0.5 text-[11px] text-accent">
            Tap to reveal 💗
          </span>
        </div>

        {/* Back content */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-card via-card to-primary/20 p-5 text-center transition-opacity duration-200 ${
            isFlipped ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <span className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-primary">
            Reason #{index + 1}
          </span>
          <p className="font-serif text-sm italic leading-relaxed text-foreground/95 md:text-base">
            "{reason}"
          </p>
        </div>
      </div>
    </div>
  )
}

export function Reasons() {
  return (
    <section className="relative z-10 px-4 py-16 md:py-28" aria-label="Why I love you">
      <div className="flex flex-col items-center text-center mb-8 md:mb-12">
        <span className="mb-2 rounded-full border border-primary/40 bg-primary/10 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary backdrop-blur-md">
          💖 Birthday Reflections 💖
        </span>
        <h2 className="font-serif text-2xl font-semibold text-foreground sm:text-4xl md:text-5xl">
          Reasons Why I Love You 🌸
        </h2>
        <p className="mt-2 text-xs font-medium text-muted-foreground sm:text-sm">
          Tap each card to reveal my heart
        </p>
      </div>

      <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2 md:gap-6">
        {config.reasons.map((reason, i) => (
          <ReasonCard key={i} reason={reason} index={i} />
        ))}
      </div>
    </section>
  )
}
