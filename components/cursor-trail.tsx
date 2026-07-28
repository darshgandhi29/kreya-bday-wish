"use client"

import { useEffect, useRef } from "react"

// Small hearts trailing the mouse — desktop only (no effect on touch devices)
export function CursorTrail() {
  const lastSpawn = useRef(0)

  useEffect(() => {
    // Skip on touch-primary devices
    if (window.matchMedia("(pointer: coarse)").matches) return

    const handleMove = (e: MouseEvent) => {
      const now = Date.now()
      if (now - lastSpawn.current < 90) return // throttle spawn rate
      lastSpawn.current = now

      const heart = document.createElement("div")
      heart.textContent = "\u2665"
      heart.setAttribute("aria-hidden", "true")
      Object.assign(heart.style, {
        position: "fixed",
        left: `${e.clientX}px`,
        top: `${e.clientY}px`,
        pointerEvents: "none",
        zIndex: "90",
        color: Math.random() > 0.5 ? "#ff6b9d" : "#e8b4b8",
        fontSize: `${8 + Math.random() * 8}px`,
        transform: "translate(-50%, -50%)",
        transition: "all 1s ease-out",
        opacity: "0.9",
      })
      document.body.appendChild(heart)

      requestAnimationFrame(() => {
        heart.style.opacity = "0"
        heart.style.transform = `translate(${(Math.random() - 0.5) * 40}px, -${30 + Math.random() * 30}px) scale(0.4)`
      })
      setTimeout(() => heart.remove(), 1000)
    }

    window.addEventListener("mousemove", handleMove)
    return () => window.removeEventListener("mousemove", handleMove)
  }, [])

  return null
}
