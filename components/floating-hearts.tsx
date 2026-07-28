"use client"

import { useMemo } from "react"
import { Heart } from "lucide-react"

// Gentle rain of soft hearts floating up in the background of the whole page
export function FloatingHearts({ count = 14 }: { count?: number }) {
  const hearts = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${(i * 137.5) % 100}%`, // golden-angle spread for even distribution
        size: 10 + ((i * 7) % 16),
        duration: 14 + ((i * 3) % 12),
        delay: (i * 1.7) % 14,
        opacity: 0.12 + ((i * 0.03) % 0.15),
      })),
    [count],
  )

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {hearts.map((h) => (
        <Heart
          key={h.id}
          className="animate-float-up absolute fill-primary text-primary"
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
