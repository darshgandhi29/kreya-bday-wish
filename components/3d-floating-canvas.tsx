"use client"

import { useMemo, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Sparkles } from "@react-three/drei"
import * as THREE from "three"
import { createHeartGeometry } from "@/lib/heart-geometry"

function FloatingBackgroundHeart({
  position,
  scale,
  color,
  rotationSpeed,
}: {
  position: [number, number, number]
  scale: number
  color: string
  rotationSpeed: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const geometry = useMemo(() => createHeartGeometry(scale), [scale])

  useFrame((_, delta) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y += delta * rotationSpeed
    meshRef.current.rotation.x += delta * (rotationSpeed * 0.5)
  })

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={1} position={position}>
      <mesh ref={meshRef} geometry={geometry}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.4}
        />
      </mesh>
    </Float>
  )
}

export function ThreeDBackgroundCanvas() {
  const hearts = useMemo(
    () => [
      { pos: [-4.2, 3.5, -4] as [number, number, number], scale: 0.35, color: "#ff3875", speed: 0.3 },
      { pos: [4.5, 2.2, -3.5] as [number, number, number], scale: 0.45, color: "#ffd166", speed: 0.25 },
      { pos: [-3.8, -1.8, -3] as [number, number, number], scale: 0.3, color: "#f7aef8", speed: 0.4 },
      { pos: [3.9, -3.2, -4] as [number, number, number], scale: 0.4, color: "#ff3875", speed: 0.35 },
      { pos: [0, 4.2, -5] as [number, number, number], scale: 0.28, color: "#ffd166", speed: 0.2 },
      { pos: [-2, -4.5, -4.5] as [number, number, number], scale: 0.32, color: "#ff3875", speed: 0.3 },
    ],
    [],
  )

  return (
    <div className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-60" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }} dpr={1} gl={{ antialias: false }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={35} color="#ffd166" />
        <pointLight position={[-5, -5, 3]} intensity={25} color="#ff3875" />

        {hearts.map((h, i) => (
          <FloatingBackgroundHeart
            key={i}
            position={h.pos}
            scale={h.scale}
            color={h.color}
            rotationSpeed={h.speed}
          />
        ))}

        <Sparkles count={45} scale={12} size={3.5} speed={0.3} color="#ffd166" opacity={0.65} />
      </Canvas>
    </div>
  )
}
