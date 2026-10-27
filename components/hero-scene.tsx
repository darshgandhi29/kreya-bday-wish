"use client"

import { useMemo, useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Sparkles, Stars } from "@react-three/drei"
import * as THREE from "three"
import { createHeartGeometry } from "@/lib/heart-geometry"

function GlowingHeart({ isMobile }: { isMobile: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const geometry = useMemo(() => createHeartGeometry(isMobile ? 0.55 : 0.65), [isMobile])

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.elapsedTime
    meshRef.current.rotation.y = Math.sin(time * 0.4) * 0.35
    meshRef.current.position.y = 1.35 + Math.sin(time * 1.2) * 0.08
    const pulse = 1 + Math.sin(time * 2) * 0.03
    meshRef.current.scale.setScalar(pulse)
  })

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.4} position={[0, 1.35, 0]}>
      <mesh ref={meshRef} geometry={geometry}>
        <meshStandardMaterial
          color="#ff3875"
          emissive="#ff2d78"
          emissiveIntensity={0.55}
          roughness={0.25}
          metalness={0.2}
        />
      </mesh>
    </Float>
  )
}

export function HeroScene() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      dpr={1}
      gl={{ antialias: false, powerPreference: "low-power" }}
      className="touch-none"
    >
      <color attach="background" args={["#0e0919"]} />
      <ambientLight intensity={0.6} />
      <pointLight position={[3, 3, 3]} intensity={35} color="#ffd166" />
      <pointLight position={[-3, -2, 2]} intensity={20} color="#ff3875" />

      <GlowingHeart isMobile={isMobile} />

      <Stars
        radius={45}
        depth={25}
        count={isMobile ? 120 : 500}
        factor={2.5}
        fade
        speed={0.4}
      />
      <Sparkles
        count={isMobile ? 12 : 35}
        scale={7}
        size={isMobile ? 2.5 : 3.5}
        speed={0.25}
        color="#ffd166"
        opacity={0.7}
      />
    </Canvas>
  )
}
