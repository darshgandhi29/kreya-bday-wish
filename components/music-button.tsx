"use client"

import { Music, Pause, AlertCircle } from "lucide-react"
import { useMusic } from "@/components/music-provider"
import { config } from "@/lib/config"

// Floating circular BGM toggle — always visible in the bottom-right corner
export function MusicButton() {
  const { isPlaying, loadError, toggle } = useMusic()

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3">
      {loadError && (
        <div className="flex items-center gap-2 rounded-full border border-accent/40 bg-card/90 px-4 py-2 text-xs text-accent backdrop-blur-md shadow-lg animate-in fade-in slide-in-from-right-3 duration-300">
          <AlertCircle className="h-4 w-4 shrink-0 text-primary" />
          <span>Add your song to <code className="rounded bg-background/60 px-1 py-0.5 text-primary">{config.songPath}</code></span>
        </div>
      )}
      <button
        type="button"
        onClick={toggle}
        aria-label={isPlaying ? "Pause music" : "Play music"}
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-card/80 text-primary backdrop-blur-md transition-transform hover:scale-110 ${
          isPlaying ? "animate-pulse-glow" : ""
        }`}
      >
        {isPlaying ? <Pause className="h-5 w-5" /> : <Music className="h-5 w-5" />}
      </button>
    </div>
  )
}

