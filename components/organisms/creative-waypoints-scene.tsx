'use client'

import { useEffect, useRef } from 'react'
import {
  AdditiveBlending,
  CatmullRomCurve3,
  Color,
  FogExp2,
  Group,
  IcosahedronGeometry,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  Scene,
  SphereGeometry,
  TubeGeometry,
  Vector3,
  WebGLRenderer,
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
    name: 'Work',
    accent: '#73ff87',
    camera: new Vector3(-2.9, 0.55, 7.6),
    lookAt: new Vector3(-0.2, -0.15, 0),
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
    name: 'Skills',
    accent: '#c8ff45',
    camera: new Vector3(-0.9, 1.35, 7.9),
    lookAt: new Vector3(0, 0.45, 0),
  },
  {
    name: 'Contact',
    accent: '#73ff87',
    camera: new Vector3(0.15, -1.45, 6.15),
    lookAt: new Vector3(0, -0.95, 0),
  },
]

export function CreativeWaypointsScene() {
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const desktop = window.matchMedia('(min-width: 1024px)').matches
    if (reduced || !desktop) return

    let disposed = false
    let rafId = 0
    let progressTrigger: { kill: () => void } | undefined
    let resizeObserver: ResizeObserver | undefined
    let currentProgress = 0
    let targetProgress = 0

    const renderer = new WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.domElement.className = 'creative-waypoints__canvas'
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

    const ribbonGeometry = new TubeGeometry(ribbonPath, 96, 0.065, 10, false)
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

    const coreGeometry = new IcosahedronGeometry(0.82, 2)
    const coreMaterial = new MeshStandardMaterial({
      color: '#0f130d',
      metalness: 1,
      roughness: 0.16,
      emissive: new Color('#c8ff45'),
      emissiveIntensity: 0.18,
      flatShading: false,
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

    const particleGeometry = new SphereGeometry(0.045, 10, 10)
    const particleMaterial = new MeshBasicMaterial({
      color: '#f3f0df',
      transparent: true,
      opacity: 0.5,
      blending: AdditiveBlending,
      depthWrite: false,
    })
    const particles = Array.from({ length: 22 }, (_, index) => {
      const particle = new Mesh(particleGeometry, particleMaterial.clone())
      const t = (index + 1) / 23
      const position = ribbonPath.getPointAt((t + index * 0.031) % 1)
      particle.position.copy(position)
      particle.position.x += Math.sin(index * 1.7) * 0.48
      particle.position.y += Math.cos(index * 1.3) * 0.36
      particle.position.z += Math.sin(index * 0.9) * 0.42
      root.add(particle)
      return particle
    })

    const ambient = new MeshBasicMaterial()
    void ambient

    const tempPosition = new Vector3()
    const tempLookAt = new Vector3()
    const tempRibbonColor = new Color()

    const renderFrame = () => {
      if (disposed) return

      currentProgress += (targetProgress - currentProgress) * 0.08
      const progress = Math.min(1, Math.max(0, currentProgress))
      const scaled = progress * (WAYPOINTS.length - 1)
      const lowerIndex = Math.floor(scaled)
      const upperIndex = Math.min(WAYPOINTS.length - 1, lowerIndex + 1)
      const segmentProgress = scaled - lowerIndex
      const elapsed = performance.now() * 0.001

      cameraPath.getPointAt(progress, tempPosition)
      camera.position.lerp(tempPosition, 0.08)

      lookPath.getPointAt(progress, tempLookAt)
      camera.lookAt(tempLookAt)

      root.rotation.y = progress * Math.PI * 1.35
      root.rotation.x = -0.18 + Math.sin(elapsed * 0.16) * 0.06
      root.position.y = Math.sin(elapsed * 0.42) * 0.08

      const accentColor = new Color(WAYPOINTS[lowerIndex].accent).lerp(
        new Color(WAYPOINTS[upperIndex].accent),
        segmentProgress
      )
      tempRibbonColor.copy(accentColor)
      ribbonMaterial.color.lerpColors(
        new Color('#11160f'),
        tempRibbonColor,
        0.45 + progress * 0.2
      )
      ribbonMaterial.emissive.copy(tempRibbonColor)
      ribbonMaterial.emissiveIntensity = 0.12 + progress * 0.24
      coreMaterial.emissive.copy(tempRibbonColor)
      coreMaterial.emissiveIntensity = 0.14 + Math.sin(elapsed * 1.2) * 0.04
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

      particles.forEach((particle, index) => {
        particle.position.x += Math.sin(elapsed * 0.3 + index) * 0.0009
        particle.position.y += Math.cos(elapsed * 0.24 + index) * 0.0007
        particle.rotation.y += 0.01
      })

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

      const rootElement = document.querySelector<HTMLElement>('[data-creative-root]')
      if (!rootElement) return

      const sections = Array.from(
        rootElement.querySelectorAll<HTMLElement>('[data-waypoint]')
      )

      progressTrigger = ScrollTrigger.create({
        id: 'creative-waypoints-progress',
        trigger: rootElement,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.85,
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
      particles.forEach((particle) => {
        const material = particle.material as MeshBasicMaterial
        material.dispose()
      })

      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return <div className='creative-waypoints' aria-hidden='true' ref={hostRef} />
}
