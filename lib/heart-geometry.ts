import * as THREE from "three"

// Builds a classic heart shape and extrudes it into a 3D geometry.
// Shared by the hero heart and the gift box reveal.
export function createHeartGeometry(scale = 1): THREE.ExtrudeGeometry {
  const shape = new THREE.Shape()
  const x = 0
  const y = 0

  shape.moveTo(x, y + 0.5)
  shape.bezierCurveTo(x, y + 0.5, x - 0.05, y + 0.9, x - 0.5, y + 0.9)
  shape.bezierCurveTo(x - 1.1, y + 0.9, x - 1.1, y + 0.2, x - 1.1, y + 0.2)
  shape.bezierCurveTo(x - 1.1, y - 0.2, x - 0.7, y - 0.7, x, y - 1.2)
  shape.bezierCurveTo(x + 0.7, y - 0.7, x + 1.1, y - 0.2, x + 1.1, y + 0.2)
  shape.bezierCurveTo(x + 1.1, y + 0.2, x + 1.1, y + 0.9, x + 0.5, y + 0.9)
  shape.bezierCurveTo(x + 0.05, y + 0.9, x, y + 0.5, x, y + 0.5)

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 0.35,
    bevelEnabled: true,
    bevelSegments: 8,
    bevelSize: 0.1,
    bevelThickness: 0.1,
    curveSegments: 24,
  })

  geometry.center()
  geometry.scale(scale, scale, scale)
  return geometry
}
