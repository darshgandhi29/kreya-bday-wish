import { MusicProvider } from "@/components/music-provider"
import { MusicButton } from "@/components/music-button"
import { Loader } from "@/components/loader"
import { Hero } from "@/components/hero"
import { Gallery } from "@/components/gallery"
import { Reasons } from "@/components/reasons"
import { LoveLetter } from "@/components/love-letter"
import { Centerpiece } from "@/components/centerpiece"
import { Surprise } from "@/components/surprise"
import { SiteFooter } from "@/components/site-footer"
import { FloatingHearts } from "@/components/floating-hearts"
import { CursorTrail } from "@/components/cursor-trail"

export default function Page() {
  return (
    <MusicProvider>
      {/* Heart-shaped loading animation on first visit */}
      <Loader />

      {/* Lightweight ambient floating hearts and cursor */}
      <FloatingHearts />
      <CursorTrail />

      <main className="ambient-gradient relative z-10 w-full overflow-hidden">
        <Hero />
        <Gallery />
        <Reasons />
        <LoveLetter />
        <Centerpiece />
        <Surprise />
        <SiteFooter />
      </main>

      {/* Floating BGM toggle — always visible */}
      <MusicButton />
    </MusicProvider>
  )
}
