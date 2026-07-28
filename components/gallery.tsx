"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { config } from "@/lib/config"

// Polaroid card with 3D parallax tilt (mouse on desktop, static tilt on mobile)
function PolaroidCard({ src, caption, index }: { src: string; caption: string; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: py * -14, y: px * 14 })
  }

  // Alternate a slight base rotation for a scattered polaroid look
  const baseRotation = index % 2 === 0 ? -2.5 : 2.5

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.12, duration: 0.6 }}
      className="shrink-0 snap-center"
      style={{ perspective: 800 }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        className="w-60 rounded-md bg-foreground p-3 pb-5 shadow-2xl shadow-primary/20 transition-transform duration-200 hover:scale-105 md:w-72"
        style={{
          transform: `rotate(${baseRotation}deg) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        <div className="relative aspect-square w-full overflow-hidden rounded-sm">
          <Image src={src || "/placeholder.svg"} alt={caption} fill className="object-cover" sizes="(max-width: 768px) 240px, 288px" />
        </div>
        <p className="mt-3 text-center font-serif text-sm italic text-background">{caption}</p>
      </div>
    </motion.div>
  )
}

export function Gallery() {
  return (
    <section className="relative z-10 min-h-svh snap-start px-4 py-20 md:px-8" aria-label="Photo gallery">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mb-3 text-center font-serif text-3xl text-foreground md:text-5xl"
      >
        Our Little Moments
      </motion.h2>
      <p className="mb-12 text-center text-sm text-muted-foreground">
        Swipe through the memories
      </p>

      {/* Horizontal swipe carousel — snap scrolling for touch */}
      <div className="mx-auto flex max-w-6xl snap-x snap-mandatory gap-8 overflow-x-auto px-6 pb-8 pt-4 md:justify-center md:overflow-visible">
        {config.photos.map((photo, i) => (
          <PolaroidCard key={photo.src} src={photo.src} caption={photo.caption} index={i} />
        ))}
      </div>
    </section>
  )
}
