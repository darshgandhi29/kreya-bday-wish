"use client"

import { useMemo, useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Html, OrbitControls, Sparkles } from "@react-three/drei"
import * as THREE from "three"
import { createHeartGeometry } from "@/lib/heart-geometry"
import { config } from "@/lib/config"

function ParticleHeartBurst({ active, count }: { active: boolean; count: number }) {
  const groupRef = useRef<THREE.Group>(null)
  const heartGeo = useMemo(() => createHeartGeometry(0.1), [])

  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      position: new THREE.Vector3(0, 0.4, 0),
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 2,
        Math.random() * 2 + 1,
        (Math.random() - 0.5) * 2,
      ),
      scale: Math.random() * 0.5 + 0.4,
    }))
  }, [count])

  const meshRefs = useRef<(THREE.Mesh | null)[]>([])

  useEffect(() => {
    if (active) {
      particles.forEach((p, i) => {
        p.position.set(0, 0.5, 0)
        if (meshRefs.current[i]) {
          meshRefs.current[i]!.position.copy(p.position)
        }
      })
    }
  }, [active, particles])

  useFrame((_, delta) => {
    if (!active) return
    meshRefs.current.forEach((ref, i) => {
      if (!ref) return
      const p = particles[i]
      ref.position.x += p.velocity.x * delta
      ref.position.y += p.velocity.y * delta
      ref.position.z += p.velocity.z * delta
      p.velocity.y -= 2 * delta
      ref.scale.multiplyScalar(0.98)
    })
  })

  if (!active) return null

  return (
    <group ref={groupRef}>
      {particles.map((p, i) => (
        <mesh
          key={i}
          ref={(el) => {
            meshRefs.current[i] = el
          }}
          geometry={heartGeo}
          position={[p.position.x, p.position.y, p.position.z]}
          scale={p.scale}
        >
          <meshStandardMaterial
            color={i % 2 === 0 ? "#ff6b9d" : "#ffd166"}
            emissive={i % 2 === 0 ? "#ff2d78" : "#ffd166"}
            emissiveIntensity={0.6}
          />
        </mesh>
      ))}
    </group>
  )
}

function RevealHeart({ visible, isMobile }: { visible: boolean; isMobile: boolean }) {
  const groupRef = useRef<THREE.Group>(null)
  const geometry = useMemo(() => createHeartGeometry(isMobile ? 0.48 : 0.55), [isMobile])

  useFrame((_, delta) => {
    if (!groupRef.current) return
    const targetY = visible ? (isMobile ? 1.45 : 1.6) : 0.2
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, delta * 2.5)
    groupRef.current.rotation.y = Math.sin(Date.now() * 0.0015) * 0.18
    const targetScale = visible ? 1 : 0.01
    const s = THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, delta * 3)
    groupRef.current.scale.setScalar(s)
  })

  return (
    <group ref={groupRef} position={[0, 0.2, 0]}>
      <mesh geometry={geometry}>
        <meshStandardMaterial
          color="#ff3875"
          emissive="#ff2d78"
          emissiveIntensity={0.65}
          roughness={0.2}
          metalness={0.3}
        />
      </mesh>

      {/* Kreya's 2 photos cropped cleanly in the middle of the 3D heart */}
      {visible && (
        <Html position={[0, 0, 0.4]} center distanceFactor={4.2} className="pointer-events-none">
          <div className="flex items-center justify-center gap-2 select-none">
            <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-accent bg-background/90 shadow-[0_0_15px_rgba(255,209,102,0.85)] ring-1 ring-primary/40 md:h-18 md:w-18">
              <img
                src="/images/kreya-1.jpeg"
                alt="Kreya 1"
                className="h-full w-full object-cover object-top"
              />
            </div>
            <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-accent bg-background/90 shadow-[0_0_15px_rgba(255,209,102,0.85)] ring-1 ring-primary/40 md:h-18 md:w-18">
              <img
                src="/images/kreya-7.jpeg"
                alt="Kreya 2"
                className="h-full w-full object-cover object-top"
              />
            </div>
          </div>
        </Html>
      )}
    </group>
  )
}

function GiftBox({ isOpen, onToggle, isMobile }: { isOpen: boolean; onToggle: () => void; isMobile: boolean }) {
  const mainGroupRef = useRef<THREE.Group>(null)
  const lidRef = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    if (mainGroupRef.current) {
      mainGroupRef.current.rotation.y += delta * 0.15
    }

    if (!lidRef.current) return
    const targetRot = isOpen ? -Math.PI * 0.75 : 0
    const targetY = isOpen ? 0.85 : 0.65
    lidRef.current.rotation.x = THREE.MathUtils.lerp(lidRef.current.rotation.x, targetRot, delta * 3)
    lidRef.current.position.y = THREE.MathUtils.lerp(lidRef.current.position.y, targetY, delta * 3)
  })

  return (
    <group
      ref={mainGroupRef}
      onClick={onToggle}
      onPointerOver={() => (document.body.style.cursor = "pointer")}
      onPointerOut={() => (document.body.style.cursor = "auto")}
    >
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.35, 1.05, 1.35]} />
        <meshStandardMaterial
          color="#27163d"
          emissive="#1c112b"
          emissiveIntensity={0.25}
          roughness={0.3}
          metalness={0.3}
        />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.2, 1.07, 1.37]} />
        <meshStandardMaterial color="#ffd166" emissive="#ffd166" emissiveIntensity={0.25} roughness={0.2} metalness={0.4} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.37, 1.07, 0.2]} />
        <meshStandardMaterial color="#ffd166" emissive="#ffd166" emissiveIntensity={0.25} roughness={0.2} metalness={0.4} />
      </mesh>

      <group ref={lidRef} position={[0, 0.65, -0.72]}>
        <mesh position={[0, 0.1, 0.72]}>
          <boxGeometry args={[1.48, 0.22, 1.48]} />
          <meshStandardMaterial
            color="#341b52"
            emissive="#1c112b"
            emissiveIntensity={0.25}
            roughness={0.3}
            metalness={0.3}
          />
        </mesh>
        <mesh position={[0, 0.28, 0.72]}>
          <torusKnotGeometry args={[0.15, 0.05, 48, 6]} />
          <meshStandardMaterial color="#ff3875" emissive="#ff3875" emissiveIntensity={0.4} roughness={0.2} metalness={0.3} />
        </mesh>
      </group>

      <RevealHeart visible={isOpen} isMobile={isMobile} />
      <ParticleHeartBurst active={isOpen} count={isMobile ? 12 : 24} />
    </group>
  )
}

export function GiftBoxScene() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return (
    <div className="relative h-[380px] w-full md:h-[480px]">
      <Canvas
        camera={{ position: [2.5, 1.8, 3], fov: 45 }}
        dpr={1}
        gl={{ antialias: false, powerPreference: "low-power" }}
      >
        <ambientLight intensity={0.8} />
        <pointLight position={[3, 4, 3]} intensity={40} color="#ffd166" />
        <pointLight position={[-3, 2, -2]} intensity={25} color="#ff3875" />

        <Float speed={1.2} rotationIntensity={0.08} floatIntensity={0.3}>
          <GiftBox isOpen={isOpen} onToggle={() => setIsOpen((v) => !v)} isMobile={isMobile} />
        </Float>

        <Sparkles count={isMobile ? 10 : 25} scale={5} size={isMobile ? 2 : 3} speed={0.25} color="#ffd166" opacity={0.65} />

        {/* Hidden message popup */}
        {isOpen && (
          <Html position={[0, isMobile ? 2.3 : 2.5, 0]} center>
            <div className="w-[88vw] max-w-sm rounded-2xl border border-accent/40 bg-[#1c112b]/95 p-4 text-center shadow-2xl backdrop-blur-md">
              <div className="mb-3 flex justify-center gap-2.5">
                <div className="relative h-13 w-13 overflow-hidden rounded-full border-2 border-accent shadow-md md:h-15 md:w-15">
                  <img src="/images/kreya-1.jpeg" alt="Kreya 1" className="h-full w-full object-cover object-top" />
                </div>
                <div className="relative h-13 w-13 overflow-hidden rounded-full border-2 border-accent shadow-md md:h-15 md:w-15">
                  <img src="/images/kreya-7.jpeg" alt="Kreya 2" className="h-full w-full object-cover object-top" />
                </div>
              </div>
              <p className="font-serif text-xs font-medium leading-relaxed text-foreground md:text-sm">{config.hiddenMessage}</p>
            </div>
          </Html>
        )}

        <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI / 1.8} />
      </Canvas>
      <p className="pointer-events-none absolute bottom-1 left-0 right-0 text-center text-[11px] text-muted-foreground">
        Drag to rotate · Tap the box to open it 🎁
      </p>
    </div>
  )
}
