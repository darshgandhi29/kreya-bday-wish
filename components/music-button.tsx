"use client"

import { Music, Pause } from "lucide-react"
import { useMusic } from "@/components/music-provider"

// Floating circular BGM toggle — always visible in the bottom-right corner
export function MusicButton() {
  const { isPlaying, toggle } = useMusic()

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isPlaying ? "Pause music" : "Play music"}
      className={`fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-accent/40 bg-card/80 text-primary backdrop-blur-md transition-transform hover:scale-110 ${
        isPlaying ? "animate-pulse-glow" : ""
      }`}
    >
      {isPlaying ? <Pause className="h-5 w-5" /> : <Music className="h-5 w-5" />}
    </button>
  )
}
