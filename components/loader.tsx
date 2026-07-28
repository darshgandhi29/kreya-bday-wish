"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Heart } from "lucide-react"

// Full-screen loader with a heart-shaped progress animation
export function Loader() {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval)
          setTimeout(() => setDone(true), 400)
          return 100
        }
        return p + 4
      })
    }, 45)
    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-background"
          role="status"
          aria-label="Loading"
        >
          <div className="relative">
            {/* Empty heart outline */}
            <Heart className="h-20 w-20 text-primary/25" strokeWidth={1.5} />
            {/* Filling heart clipped from the bottom by progress */}
            <div
              className="absolute inset-0 overflow-hidden transition-[clip-path] duration-100"
              style={{ clipPath: `inset(${100 - progress}% 0 0 0)` }}
            >
              <Heart className="h-20 w-20 animate-heartbeat fill-primary text-primary" strokeWidth={1.5} />
            </div>
          </div>
          <p className="font-serif text-sm tracking-widest text-muted-foreground">
            Loading something special...
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
