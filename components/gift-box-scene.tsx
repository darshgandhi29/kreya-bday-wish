"use client"

import { useMemo, useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Html, OrbitControls, Sparkles } from "@react-three/drei"
import * as THREE from "three"
import { createHeartGeometry } from "@/lib/heart-geometry"
import { config } from "@/lib/config"

// Small glowing heart that rises out of the opened box
function RevealHeart({ visible }: { visible: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const geometry = useMemo(() => createHeartGeometry(0.4), [])

  useFrame((state, delta) => {
    if (!meshRef.current) return
    const target = visible ? 1.4 : 0.2
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, target, delta * 2.5)
    meshRef.current.rotation.y += delta * 1.2
    const targetScale = visible ? 1 : 0.01
    const s = THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, delta * 3)
    meshRef.current.scale.setScalar(s)
  })

  return (
    <mesh ref={meshRef} geometry={geometry} position={[0, 0.2, 0]}>
      <meshStandardMaterial color="#ff6b9d" emissive="#ff2d78" emissiveIntensity={0.8} roughness={0.2} metalness={0.3} />
    </mesh>
  )
}

function GiftBox({ isOpen, onToggle }: { isOpen: boolean; onToggle: () => void }) {
  const lidRef = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    if (!lidRef.current) return
    // Animate the lid swinging open / closed
    const targetRot = isOpen ? -Math.PI * 0.75 : 0
    const targetY = isOpen ? 0.85 : 0.65
    lidRef.current.rotation.x = THREE.MathUtils.lerp(lidRef.current.rotation.x, targetRot, delta * 3)
    lidRef.current.position.y = THREE.MathUtils.lerp(lidRef.current.position.y, targetY, delta * 3)
  })

  return (
    <group onClick={onToggle} onPointerOver={() => (document.body.style.cursor = "pointer")} onPointerOut={() => (document.body.style.cursor = "auto")}>
      {/* Box base */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.4, 1.1, 1.4]} />
        <meshStandardMaterial color="#4a4a8a" roughness={0.35} metalness={0.2} />
      </mesh>
      {/* Vertical ribbon */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.22, 1.12, 1.42]} />
        <meshStandardMaterial color="#e8b4b8" roughness={0.3} metalness={0.4} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.42, 1.12, 0.22]} />
        <meshStandardMaterial color="#e8b4b8" roughness={0.3} metalness={0.4} />
      </mesh>
      {/* Lid — pivots at its back edge */}
      <group ref={lidRef} position={[0, 0.65, -0.75]}>
        <mesh position={[0, 0.1, 0.75]}>
          <boxGeometry args={[1.55, 0.25, 1.55]} />
          <meshStandardMaterial color="#5d4a7a" roughness={0.35} metalness={0.2} />
        </mesh>
        {/* Bow */}
        <mesh position={[0, 0.3, 0.75]}>
          <torusKnotGeometry args={[0.16, 0.06, 64, 8]} />
          <meshStandardMaterial color="#ff6b9d" roughness={0.3} metalness={0.3} />
        </mesh>
      </group>
      <RevealHeart visible={isOpen} />
    </group>
  )
}

export function GiftBoxScene() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative h-[420px] w-full md:h-[520px]">
      <Canvas camera={{ position: [2.6, 2, 3.2], fov: 45 }} dpr={[1, 1.75]}>
        <ambientLight intensity={0.9} />
        <pointLight position={[4, 5, 4]} intensity={70} color="#e8b4b8" />
        <pointLight position={[-3, 2, -3]} intensity={35} color="#ff6b9d" />
        <pointLight position={[0, -2, 4]} intensity={20} color="#ffffff" />

        <Float speed={1.5} rotationIntensity={0} floatIntensity={0.4}>
          <GiftBox isOpen={isOpen} onToggle={() => setIsOpen((v) => !v)} />
        </Float>

        <Sparkles count={40} scale={6} size={3} speed={0.3} color="#ff6b9d" opacity={0.6} />

        {/* Hidden message revealed when the box opens */}
        {isOpen && (
          <Html position={[0, 2.4, 0]} center>
            <div className="w-64 rounded-xl border border-accent/30 bg-card/90 p-4 text-center backdrop-blur-md md:w-80">
              <p className="font-serif text-sm leading-relaxed text-foreground md:text-base">{config.hiddenMessage}</p>
            </div>
          </Html>
        )}

        {/* Drag to rotate — zoom disabled to keep page scroll smooth */}
        <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI / 1.8} />
      </Canvas>
      <p className="pointer-events-none absolute bottom-3 left-0 right-0 text-center text-xs text-muted-foreground">
        Drag to rotate · Tap the box to open it
      </p>
    </div>
  )
}
