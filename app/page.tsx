import { MusicProvider } from "@/components/music-provider"
import { MusicButton } from "@/components/music-button"
import { Loader } from "@/components/loader"
import { Hero } from "@/components/hero"
import { Gallery } from "@/components/gallery"
import { Reasons } from "@/components/reasons"
import { LoveLetter } from "@/components/love-letter"
import { Centerpiece } from "@/components/centerpiece"
import { LoveCounter } from "@/components/love-counter"
import { Surprise } from "@/components/surprise"
import { SiteFooter } from "@/components/site-footer"
import { FloatingHearts } from "@/components/floating-hearts"
import { CursorTrail } from "@/components/cursor-trail"

export default function Page() {
  return (
    <MusicProvider>
      {/* Heart-shaped loading animation on first visit */}
      <Loader />

      {/* Ambient effects across the whole page */}
      <FloatingHearts />
      <CursorTrail />

      <main className="ambient-gradient relative">
        <Hero />
        <Gallery />
        <Reasons />
        <LoveLetter />
        <Centerpiece />
        <LoveCounter />
        <Surprise />
        <SiteFooter />
      </main>

      {/* Floating BGM toggle — always visible */}
      <MusicButton />
    </MusicProvider>
  )
}
