import { Suspense, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { ContactShadows, Environment, OrbitControls, RoundedBox, useGLTF } from '@react-three/drei'
import { useReducedMotion } from 'framer-motion'
import * as THREE from 'three'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import { scene as sceneConfig } from '../config'
import { Boundary } from './Boundary'

useGLTF.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/')

const MODEL_CANDIDATES = ['/models/flux-one.glb', '/models/flux-one.gltf']

/** Phone keeps the previous framing. Desktop fit is larger, so it uses its own camera. */
const phoneCameraPosition = [6.6, 2.15, 6.05] as [number, number, number]
const phoneCameraTarget = [2.2, 0.08, 1.35] as [number, number, number]

type SceneProps = {
  onInteract?: () => void
  onReady?: () => void
}

function EnvIntensity() {
  const scene = useThree((state) => state.scene)
  useLayoutEffect(() => {
    scene.environmentIntensity = sceneConfig.envIntensity
  }, [scene])
  return null
}

function useCompactStage() {
  const query = '(max-width: 980px)'
  const [compact, setCompact] = useState(() => window.matchMedia(query).matches)

  useEffect(() => {
    const media = window.matchMedia(query)
    const onChange = () => setCompact(media.matches)
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  return compact
}

function FittedModel({ url, fit }: { url: string; fit: number }) {
  const { scene } = useGLTF(url)
  const clone = useMemo(() => scene.clone(true), [scene])
  const wrapper = useRef<THREE.Group>(null)

  useLayoutEffect(() => {
    const root = wrapper.current
    if (!root) return

    clone.position.set(0, 0, 0)
    clone.scale.setScalar(1)
    clone.rotation.set(...sceneConfig.rotation)
    clone.updateMatrixWorld(true)

    const box = new THREE.Box3().setFromObject(clone)
    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())
    const maxDim = Math.max(size.x, size.y, size.z, 0.0001)
    const scale = fit / maxDim

    clone.position.set(-center.x, -box.min.y, -center.z)
    root.scale.setScalar(scale)

    clone.traverse((obj) => {
      const mesh = obj as THREE.Mesh
      if (!mesh.isMesh) return
      mesh.castShadow = true
      mesh.receiveShadow = true
    })
  }, [clone, fit])

  return (
    <group ref={wrapper}>
      <primitive object={clone} />
    </group>
  )
}

function StatusLight() {
  const material = useRef<THREE.MeshStandardMaterial>(null)
  useFrame(({ clock }) => {
    if (!material.current) return
    material.current.emissiveIntensity = 1.15 + Math.sin(clock.elapsedTime * 2.1) * 0.4
  })

  const y = 0.012 + 0.09 + 0.02
  return (
    <group position={[0.95, y, 0.86]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.004, 0]}>
        <circleGeometry args={[0.038, 28]} />
        <meshStandardMaterial color="#1c1c1e" metalness={0.4} roughness={0.45} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.026, 24, 24]} />
        <meshStandardMaterial
          ref={material}
          color="#e9f8ff"
          emissive="#8fd8ff"
          emissiveIntensity={1.3}
          toneMapped={false}
        />
      </mesh>
    </group>
  )
}

function ProceduralMat() {
  const width = 3.12
  const depth = 2.2
  const height = 0.09
  const feet: [number, number, number][] = [
    [width * 0.38, 0.006, depth * 0.36],
    [-width * 0.38, 0.006, depth * 0.36],
    [width * 0.38, 0.006, -depth * 0.36],
    [-width * 0.38, 0.006, -depth * 0.36],
  ]

  return (
    <group>
      {feet.map((position) => (
        <mesh key={position.join(',')} position={position} castShadow>
          <cylinderGeometry args={[0.046, 0.05, 0.012, 24]} />
          <meshStandardMaterial color="#161617" roughness={0.7} metalness={0.1} />
        </mesh>
      ))}
      <RoundedBox
        args={[width, height, depth]}
        radius={0.11}
        smoothness={8}
        position={[0, 0.012 + height / 2, 0]}
        castShadow
        receiveShadow
      >
        <meshPhysicalMaterial
          color="#c7c7cd"
          metalness={0.94}
          roughness={0.28}
          clearcoat={0.4}
          clearcoatRoughness={0.35}
        />
      </RoundedBox>
      <mesh position={[0, 0.012 + height - 0.001, 0]}>
        <boxGeometry args={[width - 0.12, 0.004, depth - 0.12]} />
        <meshStandardMaterial color="#2a2a2e" metalness={0.5} roughness={0.4} />
      </mesh>
      <RoundedBox
        args={[width - 0.14, 0.018, depth - 0.14]}
        radius={0.09}
        smoothness={8}
        position={[0, 0.012 + height + 0.009, 0]}
        castShadow
      >
        <meshPhysicalMaterial
          color="#f4f4f6"
          metalness={0.08}
          roughness={0.34}
          clearcoat={0.85}
          clearcoatRoughness={0.16}
        />
      </RoundedBox>
      <StatusLight />
    </group>
  )
}

function FloatRig({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null)
  const reduce = useReducedMotion()

  useFrame(({ clock }) => {
    if (!ref.current || reduce) return
    ref.current.position.y = Math.sin(clock.elapsedTime * 0.65) * 0.018
  })

  return <group ref={ref}>{children}</group>
}

function Controls({
  onInteract,
  target,
}: {
  onInteract?: () => void
  target: [number, number, number]
}) {
  const reduce = useReducedMotion()
  const ref = useRef<OrbitControlsImpl>(null)
  const timer = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current)
    }
  }, [])

  return (
    <OrbitControls
      ref={ref}
      makeDefault
      enablePan={false}
      enableZoom={false}
      enableDamping
      dampingFactor={0.08}
      rotateSpeed={0.55}
      autoRotate={!reduce}
      autoRotateSpeed={sceneConfig.autoRotateSpeed}
      minPolarAngle={0.28}
      maxPolarAngle={1.22}
      target={target}
      onStart={() => {
        onInteract?.()
        if (ref.current) ref.current.autoRotate = false
        if (timer.current) window.clearTimeout(timer.current)
      }}
      onEnd={() => {
        if (reduce) return
        timer.current = window.setTimeout(() => {
          if (ref.current) ref.current.autoRotate = true
        }, 2400)
      }}
    />
  )
}

function Product({ url }: { url: string | null }) {
  const compact = useCompactStage()
  const fit = compact ? 2.2 : sceneConfig.fit

  if (!url) {
    return (
      <group scale={fit / 3.12}>
        <ProceduralMat />
      </group>
    )
  }

  return (
    <Boundary
      fallback={<ProceduralMat />}
      onError={() => {
        console.warn('Model failed to load. Showing the stand-in mat.')
      }}
    >
      <Suspense fallback={null}>
        <FittedModel url={url} fit={fit} />
      </Suspense>
    </Boundary>
  )
}

function Stage({
  url,
  onInteract,
  target,
}: {
  url: string | null
  onInteract?: () => void
  target: [number, number, number]
}) {
  return (
    <>
      <ambientLight intensity={0.24} />
      <hemisphereLight args={['#f2f2f4', '#c4c4ca', 0.16]} />
      <directionalLight position={[4.2, 6.4, 3.2]} intensity={0.9} />
      <directionalLight position={[-4.5, 2.4, -2]} intensity={0.16} color="#f3f6ff" />
      <directionalLight position={[0.4, 1.6, -4.5]} intensity={0.08} />
      <Boundary fallback={null}>
        <Suspense fallback={null}>
          <Environment preset="studio" />
          <EnvIntensity />
        </Suspense>
      </Boundary>
      <FloatRig>
        <Product url={url} />
      </FloatRig>
      <ContactShadows
        position={[0, -0.001, 0]}
        opacity={0.38}
        scale={8}
        blur={2.6}
        far={3.2}
        color="#8d8d96"
        resolution={512}
      />
      <Controls onInteract={onInteract} target={target} />
    </>
  )
}

function CameraAim({
  position,
  target,
}: {
  position: [number, number, number]
  target: [number, number, number]
}) {
  const camera = useThree((state) => state.camera)
  useLayoutEffect(() => {
    camera.position.set(...position)
    camera.lookAt(...target)
    camera.updateProjectionMatrix()
  }, [camera, position, target])
  return null
}

export function Scene({ onInteract, onReady }: SceneProps) {
  const compact = useCompactStage()
  const cameraPosition = compact ? phoneCameraPosition : sceneConfig.cameraPosition
  const cameraTarget = compact ? phoneCameraTarget : sceneConfig.cameraTarget
  const [modelUrl, setModelUrl] = useState<string | null | undefined>(undefined)
  const reduce = useReducedMotion()

  useEffect(() => {
    let cancelled = false

    async function findModel() {
      for (const path of MODEL_CANDIDATES) {
        try {
          const res = await fetch(path, { method: 'HEAD' })
          if (!res.ok) continue
          const type = res.headers.get('content-type') || ''
          if (type.includes('text/html')) continue
          if (!cancelled) setModelUrl(path)
          return
        } catch {
          /* keep looking */
        }
      }
      if (!cancelled) setModelUrl(null)
    }

    void findModel()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 0.84,
      }}
      camera={{
        position: cameraPosition,
        fov: sceneConfig.cameraFov,
        near: 0.1,
        far: 40,
      }}
      onCreated={({ gl, camera }) => {
        gl.setClearColor(0x000000, 0)
        camera.lookAt(...cameraTarget)
        onReady?.()
      }}
    >
      {modelUrl !== undefined && (
        <>
          <CameraAim position={cameraPosition} target={cameraTarget} />
          <Stage url={modelUrl} onInteract={reduce ? undefined : onInteract} target={cameraTarget} />
        </>
      )}
    </Canvas>
  )
}
