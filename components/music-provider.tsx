"use client"

import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react"
import { Howl } from "howler"
import { config } from "@/lib/config"

interface MusicContextValue {
  isPlaying: boolean
  hasStarted: boolean
  loadError: boolean
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
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const [loadError, setLoadError] = useState(false)

  const playAudio = useCallback(() => {
    setHasStarted(true)
    setLoadError(false)

    // First attempt: Howler.js
    if (!howlRef.current) {
      howlRef.current = new Howl({
        src: ["/audio/song.mp3", config.songPath, "/audio/song.webm"],
        loop: true,
        volume: 0.8,
        html5: false,
        onloaderror: (_id, err) => {
          console.warn("[BGM] Howler error, using native Audio fallback:", err)
          // Fallback to native HTML5 Audio element
          if (!audioRef.current) {
            const audio = new Audio("/audio/song.mp3")
            audio.loop = true
            audio.volume = 0.8
            audioRef.current = audio
          }
          audioRef.current
            .play()
            .then(() => {
              setIsPlaying(true)
              setLoadError(false)
            })
            .catch(() => {
              setLoadError(true)
              setIsPlaying(false)
            })
        },
        onload: () => {
          setLoadError(false)
        },
      })
    }

    try {
      const howl = howlRef.current
      howl.volume(0.8)
      howl.play()
      setIsPlaying(true)
    } catch {
      // Native audio fallback
      if (!audioRef.current) {
        const audio = new Audio("/audio/song.mp3")
        audio.loop = true
        audio.volume = 0.8
        audioRef.current = audio
      }
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true)
          setLoadError(false)
        })
        .catch(() => setLoadError(true))
    }
  }, [])

  const pauseAudio = useCallback(() => {
    if (howlRef.current) {
      howlRef.current.pause()
    }
    if (audioRef.current) {
      audioRef.current.pause()
    }
    setIsPlaying(false)
  }, [])

  const start = useCallback(() => {
    playAudio()
  }, [playAudio])

  const toggle = useCallback(() => {
    if (isPlaying) {
      pauseAudio()
    } else {
      playAudio()
    }
  }, [isPlaying, playAudio, pauseAudio])

  return (
    <MusicContext.Provider value={{ isPlaying, hasStarted, loadError, toggle, start }}>
      {children}
    </MusicContext.Provider>
  )
}


