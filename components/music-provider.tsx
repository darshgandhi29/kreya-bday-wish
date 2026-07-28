"use client"

import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react"
import { Howl } from "howler"
import { config } from "@/lib/config"

interface MusicContextValue {
  isPlaying: boolean
  hasStarted: boolean
  toggle: () => void
  start: () => void
}

const MusicContext = createContext<MusicContextValue | null>(null)

export function useMusic() {
  const ctx = useContext(MusicContext)
  if (!ctx) throw new Error("useMusic must be used within MusicProvider")
  return ctx
}

export function MusicProvider({ children }: { children: ReactNode }) {
  const howlRef = useRef<Howl | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)

  const getHowl = useCallback(() => {
    if (!howlRef.current) {
      howlRef.current = new Howl({
        src: [config.songPath], // <-- replace /public/audio/song.mp3 with your song
        loop: true,
        volume: 0,
        html5: true,
        onloaderror: () => {
          // Song file missing — site still works, music simply stays off
          console.log("[v0] BGM file not found at", config.songPath)
        },
      })
    }
    return howlRef.current
  }, [])

  const start = useCallback(() => {
    setHasStarted(true)
    const howl = getHowl()
    if (howl.state() === "loaded" || howl.state() === "loading") {
      howl.play()
      howl.fade(0, 0.6, 2000) // gentle 2s volume fade-in
      setIsPlaying(true)
    }
  }, [getHowl])

  const toggle = useCallback(() => {
    const howl = getHowl()
    if (isPlaying) {
      howl.fade(0.6, 0, 600)
      setTimeout(() => howl.pause(), 600)
      setIsPlaying(false)
    } else {
      setHasStarted(true)
      howl.play()
      howl.fade(0, 0.6, 1500)
      setIsPlaying(true)
    }
  }, [getHowl, isPlaying])

  return (
    <MusicContext.Provider value={{ isPlaying, hasStarted, toggle, start }}>
      {children}
    </MusicContext.Provider>
  )
}
