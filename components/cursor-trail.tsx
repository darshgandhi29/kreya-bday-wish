"use client"

import { useEffect, useRef } from "react"

// Small hearts trailing the mouse with multi-color variety & smooth physics
export function CursorTrail() {
  const lastSpawn = useRef(0)

  useEffect(() => {
    // Skip on touch-primary devices
    if (window.matchMedia("(pointer: coarse)").matches) return

    const colors = ["#ff6b9d", "#e8b4b8", "#ffd1dc", "#ff85a2"]

    const handleMove = (e: MouseEvent) => {
      const now = Date.now()
      if (now - lastSpawn.current < 120) return // throttle spawn rate to 120ms for smooth 60fps
      lastSpawn.current = now

      const heart = document.createElement("div")
      heart.textContent = "\u2665"
      heart.setAttribute("aria-hidden", "true")

      const color = colors[Math.floor(Math.random() * colors.length)]
      const size = 8 + Math.random() * 12
      const rotation = (Math.random() - 0.5) * 50

      Object.assign(heart.style, {
        position: "fixed",
        left: `${e.clientX}px`,
        top: `${e.clientY}px`,
        pointerEvents: "none",
        zIndex: "90",
        color: color,
        fontSize: `${size}px`,
        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
        transition: "transform 0.9s ease-out, opacity 0.9s ease-out",
        willChange: "transform, opacity",
        opacity: "0.85",
      })
      document.body.appendChild(heart)

      requestAnimationFrame(() => {
        const deltaX = (Math.random() - 0.5) * 40
        const deltaY = -(30 + Math.random() * 30)
        heart.style.opacity = "0"
        heart.style.transform = `translate(calc(-50% + ${deltaX}px), calc(-50% + ${deltaY}px)) scale(0.3) rotate(${rotation}deg)`
      })
      setTimeout(() => heart.remove(), 900)
    }

    window.addEventListener("mousemove", handleMove)
    return () => window.removeEventListener("mousemove", handleMove)
  }, [])

  return null
}

