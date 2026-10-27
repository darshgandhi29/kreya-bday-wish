"use client"

import { Suspense, lazy } from "react"
import { Heart } from "lucide-react"

const GiftBoxScene = lazy(() =>
  import("@/components/gift-box-scene").then((m) => ({ default: m.GiftBoxScene })),
)

export function Centerpiece() {
  return (
    <section className="relative z-10 flex flex-col items-center justify-center px-4 py-16 md:py-28" aria-label="Interactive 3D Gift Box">
      <div className="flex flex-col items-center text-center mb-6">
        <span className="mb-2 rounded-full border border-primary/40 bg-primary/10 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary backdrop-blur-md">
          🎁 Special Birthday Gift 🎁
        </span>
        <h2 className="font-serif text-2xl font-semibold text-foreground sm:text-4xl md:text-5xl">
          Open Your Birthday Box 🎁
        </h2>
        <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
          Something special is waiting inside...
        </p>
      </div>

      <div className="w-full max-w-3xl">
        <Suspense
          fallback={
            <div className="flex h-[380px] w-full items-center justify-center md:h-[480px]">
              <Heart className="h-8 w-8 animate-heartbeat fill-primary text-primary" />
            </div>
          }
        >
          <GiftBoxScene />
        </Suspense>
      </div>
    </section>
  )
}
