"use client"

import { Heart } from "lucide-react"
import { config } from "@/lib/config"

export function SiteFooter() {
  return (
    <footer className="relative z-10 flex flex-col items-center gap-3 px-4 pb-16 pt-8 text-center">
      <Heart className="h-6 w-6 animate-heartbeat fill-primary text-primary" aria-hidden="true" />
      <p className="text-sm text-muted-foreground">
        Made with <span className="text-primary">love</span> by{" "}
        <span className="font-serif italic text-accent">{config.yourName}</span>
      </p>
    </footer>
  )
}
