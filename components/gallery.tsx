"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X, ZoomIn } from "lucide-react"
import { config } from "@/lib/config"

function PolaroidCard({
  src,
  caption,
  index,
  onSelect,
}: {
  src: string
  caption: string
  index: number
  onSelect: () => void
}) {
  const baseRotation = index % 2 === 0 ? -1.5 : 1.5

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="shrink-0 snap-center"
    >
      <div
        onClick={onSelect}
        className="group relative w-56 cursor-pointer rounded-2xl border border-white/10 bg-[#1c112b] p-3 pb-4 shadow-xl transition-transform duration-300 hover:scale-105 hover:border-primary/50 md:w-68"
        style={{ transform: `rotate(${baseRotation}deg)` }}
      >
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-black/40">
          <Image
            src={src || "/placeholder.svg"}
            alt={caption}
            fill
            className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 224px, 272px"
            loading="lazy"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <span className="flex items-center gap-1 rounded-full bg-black/70 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
              <ZoomIn className="h-3 w-3" /> View
            </span>
          </div>
        </div>
        <p className="mt-3 text-center font-serif text-xs italic font-medium leading-tight text-foreground/90 md:text-sm">
          {caption}
        </p>
      </div>
    </motion.div>
  )
}

export function Gallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<{ src: string; caption: string } | null>(null)

  return (
    <section className="relative z-10 px-4 py-16 md:py-28" aria-label="Photo gallery">
      <div className="flex flex-col items-center text-center mb-8 md:mb-12">
        <span className="mb-2 rounded-full border border-accent/40 bg-accent/10 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent backdrop-blur-md">
          ✨ Birthday Memories ✨
        </span>
        <h2 className="font-serif text-2xl font-semibold text-foreground sm:text-4xl md:text-5xl">
          Happy Birthday Gallery 📸
        </h2>
        <p className="mt-2 text-xs font-medium text-muted-foreground sm:text-sm">
          Swipe through the photos · Tap to expand 💗
        </p>
      </div>

      {/* Horizontal touch scroll carousel — fast & lightweight */}
      <div className="no-scrollbar mx-auto flex max-w-6xl snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-6 pt-2">
        {config.photos.map((photo, i) => (
          <PolaroidCard
            key={photo.src}
            src={photo.src}
            caption={photo.caption}
            index={i}
            onSelect={() => setSelectedPhoto(photo)}
          />
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <div
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-md w-full rounded-2xl border border-accent/40 bg-[#1c112b] p-4 shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full border border-accent/40 bg-[#1c112b] text-foreground shadow-lg transition-transform hover:scale-110"
                aria-label="Close photo"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl">
                <Image
                  src={selectedPhoto.src || "/placeholder.svg"}
                  alt={selectedPhoto.caption}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 90vw, 450px"
                  priority
                />
              </div>
              <p className="mt-3 text-center font-serif text-sm italic text-foreground md:text-base">
                {selectedPhoto.caption}
              </p>
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
