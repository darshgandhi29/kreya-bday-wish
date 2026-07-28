"use client"

import { useMemo, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Sparkles, Stars } from "@react-three/drei"
import * as THREE from "three"
import { createHeartGeometry } from "@/lib/heart-geometry"

// The floating, glowing 3D heart in the hero section
function GlowingHeart() {
  const meshRef = useRef<THREE.Mesh>(null)
  const geometry = useMemo(() => createHeartGeometry(0.65), [])

  useFrame((state) => {
    if (!meshRef.current) return
    // Gentle sway + a soft "breathing" pulse like a heartbeat
    meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.6
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 2.2) * 0.04
    meshRef.current.scale.setScalar(pulse)
  })

  return (
    <Float speed={2} rotationIntensity={0.15} floatIntensity={0.6} position={[0, 1.35, 0]}>
      <mesh ref={meshRef} geometry={geometry}>
        <meshStandardMaterial
          color="#ff6b9d"
          emissive="#ff2d78"
          emissiveIntensity={0.55}
          roughness={0.25}
          metalness={0.35}
        />
      </mesh>
    </Float>
  )
}

export function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      dpr={[1, 1.75]}
      className="touch-none"
    >
      <color attach="background" args={["#1a1a2e"]} />
      <ambientLight intensity={0.4} />
      <pointLight position={[4, 4, 4]} intensity={40} color="#e8b4b8" />
      <pointLight position={[-4, -2, 3]} intensity={25} color="#ff6b9d" />

      <GlowingHeart />

      {/* Soft particle stars + pink sparkle bokeh */}
      <Stars radius={60} depth={40} count={1800} factor={3} fade speed={0.6} />
      <Sparkles count={70} scale={8} size={4} speed={0.35} color="#e8b4b8" opacity={0.7} />
    </Canvas>
  )
}
