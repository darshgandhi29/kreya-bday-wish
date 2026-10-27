"use client"

import { Flame } from "lucide-react"
import { config } from "@/lib/config"

export function LoveLetter() {
  return (
    <section className="relative z-10 px-4 py-16 md:py-28" aria-label="A letter for you">
      <div className="flex flex-col items-center text-center mb-8 md:mb-12">
        <span className="mb-2 rounded-full border border-accent/40 bg-accent/10 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent backdrop-blur-md">
          💌 From Darsh With Love 💌
        </span>
        <h2 className="font-serif text-2xl font-semibold text-foreground sm:text-4xl md:text-5xl">
          Happy Birthday Letter 📜
        </h2>
      </div>

      <div className="mx-auto flex max-w-3xl items-start gap-4 md:gap-8">
        <div className="hidden shrink-0 flex-col items-center pt-2 sm:flex" aria-hidden="true">
          <div className="relative flex items-center justify-center">
            <div className="relative z-10 rounded-full bg-primary/20 p-2.5">
              <Flame className="h-6 w-6 fill-accent text-accent" />
            </div>
          </div>
          <div className="mt-1 h-28 w-2 rounded-b-md bg-gradient-to-b from-accent/80 via-accent/40 to-transparent" />
        </div>

        <div className="w-full rounded-2xl border border-accent/25 bg-card/60 p-6 shadow-xl backdrop-blur-md md:p-10">
          {config.loveLetter.map((line, i) => (
            <p
              key={i}
              className={`font-serif text-base italic leading-relaxed text-foreground/90 md:text-lg ${
                i === 0 ? "mb-4 font-semibold text-primary" : "mb-3"
              }`}
            >
              {line}
            </p>
          ))}
          <p className="mt-5 font-serif text-xl italic font-semibold text-accent md:text-2xl">
            {config.yourName}
          </p>
        </div>
      </div>
    </section>
  )
}
