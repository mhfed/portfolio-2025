'use client'

import { useEffect, useRef } from 'react'
import {
  AdditiveBlending,
  CatmullRomCurve3,
  Color,
  FogExp2,
  Group,
  IcosahedronGeometry,
  InstancedMesh,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  Object3D,
  PerspectiveCamera,
  Scene,
  SphereGeometry,
  TubeGeometry,
  Vector3,
  Vector2,
  WebGLRenderer,
  ShaderMaterial,
  BufferGeometry,
  BufferAttribute,
  LineSegments,
  LineBasicMaterial,
  type ColorRepresentation,
} from 'three'
import { loadGSAP } from '@/lib/gsap-utils'

type Waypoint = {
  name: string
  accent: ColorRepresentation
  camera: Vector3
  lookAt: Vector3
}

const WAYPOINTS: Waypoint[] = [
  {
    name: 'Hero',
    accent: '#c8ff45',
    camera: new Vector3(0.2, 0.8, 8.3),
    lookAt: new Vector3(0, 0.1, 0),
  },
  {
    name: 'About',
    accent: '#ff8a3d',
    camera: new Vector3(2.35, 0.05, 7.1),
    lookAt: new Vector3(0.15, -0.2, 0),
  },
  {
    name: 'Experience',
    accent: '#ff5ebc',
    camera: new Vector3(0.55, -1.05, 6.7),
    lookAt: new Vector3(0, -0.55, 0),
  },
  {
    name: 'Work',
    accent: '#73ff87',
    camera: new Vector3(-2.9, 0.55, 7.6),
    lookAt: new Vector3(-0.2, -0.15, 0),
  },
  {
    name: 'Contact',
    accent: '#73ff87',
    camera: new Vector3(0.15, -1.45, 6.15),
    lookAt: new Vector3(0, -0.95, 0),
  },
]

// Shaders for the morphing liquid core
const vertexShader = `
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vPosition;

  // Classic 3D Simplex Noise by Ashima Arts
  vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

  float snoise(vec3 v){
    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy) );
    vec3 x0 =   v - i + dot(i, C.xxx) ;

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );

    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;

    i = mod(i, 289.0 );
    vec4 p = permute( permute( permute(
               i.z + vec4(0.0, i1.z, i2.z, 1.0) )
             + i.y + vec4(0.0, i1.y, i2.y, 1.0) )
             + i.x + vec4(0.0, i1.x, i2.x, 1.0) );

    float n_ = 0.142857142857;
    vec3  ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z *ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ );

    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                  dot(p2,x2), dot(p3,x3) ) );
  }

  void main() {
    vNormal = normal;
    vPosition = position;
    float displacement = snoise(position * 2.2 + uTime * 0.7) * 0.16;
    vec3 newPosition = position + normal * displacement;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`

const fragmentShader = `
  uniform vec3 uColor;
  uniform vec3 uEmissiveColor;
  uniform float uEmissiveIntensity;
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vPosition;

  void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDir = vec3(0.0, 0.0, 1.0);
    float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 3.0);
    vec3 base = mix(uColor, uEmissiveColor, fresnel * 0.65);
    float glow = 0.5 + 0.5 * sin(uTime * 1.5);
    vec3 finalColor = base + uEmissiveColor * fresnel * uEmissiveIntensity * (0.8 + 0.45 * glow);
    gl_FragColor = vec4(finalColor, 0.9);
  }
`

export function CreativeWaypointsScene() {
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    const desktop = window.matchMedia('(min-width: 1024px)').matches

    // Mobile fallback: gradient instead of 3D scene
    if (reduced || !desktop) {
      host.style.background = `
        radial-gradient(circle at 80% 5%, rgba(200, 255, 69, 0.12), transparent 26rem),
        radial-gradient(circle at 10% 20%, rgba(255, 138, 61, 0.08), transparent 22rem),
        radial-gradient(circle at 50% 100%, rgba(115, 255, 135, 0.06), transparent 38rem)
      `
      return
    }

    let disposed = false
    let rafId = 0
    let lastTime = performance.now()
    let progressTrigger: { kill: () => void } | undefined
    let resizeObserver: ResizeObserver | undefined
    let currentProgress = 0
    let targetProgress = 0

    // Interactive pointer offset for 3D parallax
    const mouse3D = new Vector2(0, 0)
    const targetCameraOffset = new Vector3(0, 0, 0)
    const currentCameraOffset = new Vector3(0, 0, 0)

    const handlePointerMove = (event: PointerEvent) => {
      mouse3D.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse3D.y = -(event.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('pointermove', handlePointerMove, { passive: true })

    const renderer = new WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.domElement.className = 'creative-waypoints__canvas w-full h-full block filter drop-shadow-[0_0_42px_rgba(200,255,69,0.14)]'
    renderer.domElement.setAttribute('aria-hidden', 'true')
    host.appendChild(renderer.domElement)

    const scene = new Scene()
    scene.fog = new FogExp2(0x050704, 0.085)

    const camera = new PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    )
    camera.position.copy(WAYPOINTS[0].camera)

    const root = new Group()
    scene.add(root)

    const ribbonPath = new CatmullRomCurve3([
      new Vector3(-3.5, 1.9, 1.8),
      new Vector3(-1.7, 0.75, -1.1),
      new Vector3(0.15, -1.25, -0.55),
      new Vector3(2.35, -0.35, 1.15),
      new Vector3(3.75, 1.2, -0.05),
    ])

    const cameraPath = new CatmullRomCurve3(
      WAYPOINTS.map((waypoint) => waypoint.camera.clone())
    )

    const lookPath = new CatmullRomCurve3(
      WAYPOINTS.map((waypoint) => waypoint.lookAt.clone())
    )

    const ribbonGeometry = new TubeGeometry(ribbonPath, 64, 0.065, 8, false)
    const ribbonMaterial = new MeshStandardMaterial({
      color: '#11160f',
      metalness: 0.92,
      roughness: 0.22,
      emissive: new Color('#9ccf2b'),
      emissiveIntensity: 0.16,
    })
    const ribbon = new Mesh(ribbonGeometry, ribbonMaterial)
    ribbon.rotation.x = 0.08
    root.add(ribbon)

    // Morphing core geometry (needs higher density for smooth deformation)
    const coreGeometry = new IcosahedronGeometry(0.82, 8)
    const coreMaterial = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new Color('#0f130d') },
        uEmissiveColor: { value: new Color('#c8ff45') },
        uEmissiveIntensity: { value: 0.65 },
      },
      transparent: true,
    })
    const core = new Mesh(coreGeometry, coreMaterial)
    core.position.set(-0.2, 0.15, 0.1)
    root.add(core)

    const auraGeometry = new SphereGeometry(1.8, 32, 32)
    const auraMaterial = new MeshBasicMaterial({
      color: '#c8ff45',
      transparent: true,
      opacity: 0.06,
      blending: AdditiveBlending,
      depthWrite: false,
    })
    const aura = new Mesh(auraGeometry, auraMaterial)
    root.add(aura)

    const nodeGeometry = new SphereGeometry(0.16, 28, 28)
    const nodeMeshes = WAYPOINTS.map((waypoint, index) => {
      const nodeMaterial = new MeshStandardMaterial({
        color: '#0f120d',
        emissive: new Color(waypoint.accent),
        emissiveIntensity: 0.75,
        metalness: 0.7,
        roughness: 0.25,
      })
      const node = new Mesh(nodeGeometry, nodeMaterial)
      const point = ribbonPath.getPointAt(index / (WAYPOINTS.length - 1))
      node.position.copy(point)
      root.add(node)
      return node
    })

    const particleGeometry = new SphereGeometry(0.045, 8, 8)
    const particleMaterial = new MeshBasicMaterial({
      color: '#f3f0df',
      transparent: true,
      opacity: 0.5,
      blending: AdditiveBlending,
      depthWrite: false,
    })

    const particleCount = 22
    const particles = new InstancedMesh(
      particleGeometry,
      particleMaterial,
      particleCount
    )
    const particleData: { position: Vector3; basePosition: Vector3 }[] = []
    const tempObject = new Object3D()

    for (let index = 0; index < particleCount; index++) {
      const t = (index + 1) / 23
      const position = ribbonPath.getPointAt((t + index * 0.031) % 1)
      const offsetPosition = position.clone()
      offsetPosition.x += Math.sin(index * 1.7) * 0.48
      offsetPosition.y += Math.cos(index * 1.3) * 0.36
      offsetPosition.z += Math.sin(index * 0.9) * 0.42

      tempObject.position.copy(offsetPosition)
      tempObject.updateMatrix()
      particles.setMatrixAt(index, tempObject.matrix)

      particleData.push({
        position: offsetPosition.clone(),
        basePosition: offsetPosition.clone(),
      })
    }
    particles.instanceMatrix.needsUpdate = true
    root.add(particles)

    // Construct 3D Constellations helper
    const maxLineSegments = 120
    const linePositions = new Float32Array(maxLineSegments * 2 * 3)
    const lineGeometry = new BufferGeometry()
    lineGeometry.setAttribute('position', new BufferAttribute(linePositions, 3))
    const lineMaterial = new LineBasicMaterial({
      color: '#c8ff45',
      transparent: true,
      opacity: 0.16,
      blending: AdditiveBlending,
      depthWrite: false,
    })
    const constellations = new LineSegments(lineGeometry, lineMaterial)
    root.add(constellations)

    const tempPosition = new Vector3()
    const tempLookAt = new Vector3()
    const tempRibbonColor = new Color()

    const renderFrame = () => {
      if (disposed) return

      const now = performance.now()
      const delta = (now - lastTime) / 16.67
      lastTime = now

      const lerpFactor = 1 - Math.pow(0.92, delta)
      currentProgress += (targetProgress - currentProgress) * lerpFactor

      const progress = Math.min(1, Math.max(0, currentProgress))
      const scaled = progress * (WAYPOINTS.length - 1)
      const lowerIndex = Math.floor(scaled)
      const upperIndex = Math.min(WAYPOINTS.length - 1, lowerIndex + 1)
      const segmentProgress = scaled - lowerIndex
      const elapsed = now * 0.001

      // Update shader uniform time
      coreMaterial.uniforms.uTime.value = elapsed

      // Camera base path calculations
      cameraPath.getPointAt(progress, tempPosition)
      lookPath.getPointAt(progress, tempLookAt)

      // Dynamic mouse parallax on camera
      targetCameraOffset.set(mouse3D.x * 0.85, mouse3D.y * 0.85, 0)
      currentCameraOffset.lerp(targetCameraOffset, lerpFactor)

      camera.position.copy(tempPosition).add(currentCameraOffset)
      camera.lookAt(tempLookAt)

      root.rotation.y = progress * Math.PI * 1.35
      root.rotation.x = -0.18 + Math.sin(elapsed * 0.16) * 0.06
      root.position.y = Math.sin(elapsed * 0.42) * 0.08

      const accentColor = new Color(WAYPOINTS[lowerIndex].accent).lerp(
        new Color(WAYPOINTS[upperIndex].accent),
        segmentProgress
      )
      tempRibbonColor.copy(accentColor)

      // Update core shader uniforms with smooth colors
      coreMaterial.uniforms.uEmissiveColor.value.copy(tempRibbonColor)
      lineMaterial.color.copy(tempRibbonColor)

      ribbonMaterial.color.lerpColors(
        new Color('#11160f'),
        tempRibbonColor,
        0.45 + progress * 0.2
      )
      ribbonMaterial.emissive.copy(tempRibbonColor)
      ribbonMaterial.emissiveIntensity = 0.12 + progress * 0.24
      auraMaterial.color.copy(tempRibbonColor)
      auraMaterial.opacity = 0.04 + progress * 0.035

      const activeIndex = Math.round(scaled)
      nodeMeshes.forEach((node, index) => {
        const distance = Math.abs(scaled - index)
        const scale = 1 + Math.max(0, 1.25 - distance) * 0.42
        node.scale.setScalar(scale)
        const material = node.material as MeshStandardMaterial
        material.emissiveIntensity = index === activeIndex ? 1.35 : 0.7
      })

      // Update particles
      for (let index = 0; index < particleCount; index++) {
        const data = particleData[index]
        data.position.x =
          data.basePosition.x + Math.sin(elapsed * 0.3 + index) * 0.0012 * delta
        data.position.y =
          data.basePosition.y +
          Math.cos(elapsed * 0.24 + index) * 0.0009 * delta

        tempObject.position.copy(data.position)
        tempObject.rotation.y += 0.01 * delta
        tempObject.updateMatrix()
        particles.setMatrixAt(index, tempObject.matrix)
      }
      particles.instanceMatrix.needsUpdate = true

      // Dynamic 3D constellations lines builder
      let lineIdx = 0
      const posAttr = constellations.geometry.getAttribute('position') as BufferAttribute
      const positionsArray = posAttr.array as Float32Array

      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          if (lineIdx >= maxLineSegments) break

          const pA = particleData[i].position
          const pB = particleData[j].position
          const distance = pA.distanceTo(pB)

          if (distance < 1.35) {
            const arrIdx = lineIdx * 6
            positionsArray[arrIdx] = pA.x
            positionsArray[arrIdx + 1] = pA.y
            positionsArray[arrIdx + 2] = pA.z

            positionsArray[arrIdx + 3] = pB.x
            positionsArray[arrIdx + 4] = pB.y
            positionsArray[arrIdx + 5] = pB.z
            lineIdx++
          }
        }
      }

      // Zero out unused elements in the buffer
      for (let k = lineIdx; k < maxLineSegments; k++) {
        const arrIdx = k * 6
        for (let idx = 0; idx < 6; idx++) {
          positionsArray[arrIdx + idx] = 0
        }
      }
      posAttr.needsUpdate = true

      renderer.render(scene, camera)
      rafId = window.requestAnimationFrame(renderFrame)
    }

    const resize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight)
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
    }

    loadGSAP().then(({ ScrollTrigger }) => {
      if (disposed) return

      const rootElement = document.querySelector<HTMLElement>(
        '[data-creative-root]'
      )
      if (!rootElement) return

      const sections = Array.from(
        rootElement.querySelectorAll<HTMLElement>('[data-waypoint]')
      )

      progressTrigger = ScrollTrigger.create({
        id: 'creative-waypoints-progress',
        trigger: rootElement,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.6,
        onUpdate(self: { progress: number }) {
          targetProgress = self.progress
        },
      })

      ScrollTrigger.batch(sections, {
        start: 'top 68%',
        interval: 0.12,
        onEnter: (elements: Element[]) => {
          const active = elements[0] as HTMLElement | undefined
          if (!active) return
          active.dataset.waypointActive = 'true'
        },
        onEnterBack: (elements: Element[]) => {
          const active = elements[0] as HTMLElement | undefined
          if (!active) return
          active.dataset.waypointActive = 'true'
        },
        onLeave: (elements: Element[]) => {
          elements.forEach((element) => {
            delete (element as HTMLElement).dataset.waypointActive
          })
        },
        onLeaveBack: (elements: Element[]) => {
          elements.forEach((element) => {
            delete (element as HTMLElement).dataset.waypointActive
          })
        },
      })
    })

    resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(document.documentElement)
    window.addEventListener('resize', resize)
    resize()
    rafId = window.requestAnimationFrame(renderFrame)

    return () => {
      disposed = true
      window.cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', handlePointerMove)
      resizeObserver?.disconnect()
      progressTrigger?.kill()

      ribbonGeometry.dispose()
      ribbonMaterial.dispose()
      coreGeometry.dispose()
      coreMaterial.dispose()
      auraGeometry.dispose()
      auraMaterial.dispose()
      nodeGeometry.dispose()
      particleGeometry.dispose()
      particleMaterial.dispose()
      nodeMeshes.forEach((node) => {
        const material = node.material as MeshStandardMaterial
        material.dispose()
      })
      particles.dispose()
      constellations.geometry.dispose()
      lineMaterial.dispose()

      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return <div className='creative-waypoints fixed inset-0 z-0 pointer-events-none overflow-hidden opacity-[0.98] mix-blend-screen max-lg:mix-blend-normal max-lg:[animation:mobile-gradient-pulse_12s_ease-in-out_infinite]' aria-hidden='true' ref={hostRef} />
}
