"use client"

import { useMemo } from "react"
import { Heart } from "lucide-react"

// Gentle rain of soft hearts floating up with sway in the background of the whole page
export function FloatingHearts({ count = 18 }: { count?: number }) {
  const hearts = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${(i * 137.5) % 100}%`, // golden-angle spread for even distribution
        size: 12 + ((i * 11) % 24),    // varied sizes between 12px and 36px
        duration: 12 + ((i * 5) % 18),  // varied speed between 12s and 30s
        delay: (i * 2.3) % 16,
        opacity: 0.08 + ((i * 0.04) % 0.24), // varied opacity
      })),
    [count],
  )

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {hearts.map((h) => (
        <Heart
          key={h.id}
          className="animate-float-sway absolute fill-primary text-primary"
          style={{
            left: h.left,
            width: h.size,
            height: h.size,
            opacity: h.opacity,
            animationDuration: `${h.duration}s`,
            animationDelay: `-${h.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

