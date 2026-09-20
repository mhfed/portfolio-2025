'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface CameraWaypoint {
  pos: THREE.Vector3
  lookAt: THREE.Vector3
  moonIntensity: number
  lanternIntensity: number
  jadeIntensity: number
  fov: number
}

export function KageSanctuaryCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    let animationFrameId: number
    let renderer: THREE.WebGLRenderer

    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      })
    } catch {
      return
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2

    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x05070a, 0.036)

    const camera = new THREE.PerspectiveCamera(
      48,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )

    // =========================================================================
    // 1. LIGHTING (DUAL ACCENT: VERMILION + MASCOT JADE/CYAN)
    // =========================================================================
    const ambientLight = new THREE.AmbientLight(0x0a1218, 1.8)
    scene.add(ambientLight)

    // Vermilion moon primary light
    const moonLight = new THREE.DirectionalLight(0xe0231c, 2.5)
    moonLight.position.set(12, 18, -25)
    scene.add(moonLight)

    // Warm ember lanterns point light
    const lanternLight1 = new THREE.PointLight(0xff6a28, 4.5, 22, 1.6)
    lanternLight1.position.set(-2.6, 2.8, 0)
    scene.add(lanternLight1)

    const lanternLight2 = new THREE.PointLight(0xff7a36, 4.0, 20, 1.6)
    lanternLight2.position.set(2.8, 2.2, -6)
    scene.add(lanternLight2)

    // Mascot Lime Jade Accent Light (ground & moss glow)
    const jadeGlowLight = new THREE.PointLight(0x8ce019, 3.2, 18, 1.7)
    jadeGlowLight.position.set(-2.6, 1.0, -1)
    scene.add(jadeGlowLight)

    // Mascot Cyan Accent Light (water reflection & air lân tinh)
    const cyanWaterLight = new THREE.PointLight(0x0fe3c5, 2.8, 26, 1.9)
    cyanWaterLight.position.set(3.0, 0.6, -10)
    scene.add(cyanWaterLight)

    // Ground fill
    const groundFill = new THREE.PointLight(0x11221b, 1.8, 30)
    groundFill.position.set(0, -1, 5)
    scene.add(groundFill)

    // =========================================================================
    // 2. THE VERMILION MOON & HALO
    // =========================================================================
    const moonGroup = new THREE.Group()
    moonGroup.position.set(9, 14, -38)

    const moonGeo = new THREE.SphereGeometry(4.8, 36, 36)
    const moonMat = new THREE.MeshBasicMaterial({ color: 0xe0231c })
    const moonMesh = new THREE.Mesh(moonGeo, moonMat)
    moonGroup.add(moonMesh)

    const createGlowRing = (innerR: number, outerR: number, opacity: number) => {
      const ringGeo = new THREE.RingGeometry(innerR, outerR, 48)
      const ringMat = new THREE.ShaderMaterial({
        transparent: true,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        uniforms: {
          color: { value: new THREE.Color(0xe0231c) },
          uOpacity: { value: opacity },
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec2 vUv;
          uniform vec3 color;
          uniform float uOpacity;
          void main() {
            float dist = distance(vUv, vec2(0.5));
            float alpha = smoothstep(0.5, 0.08, dist) * uOpacity;
            gl_FragColor = vec4(color, alpha);
          }
        `,
      })
      return new THREE.Mesh(ringGeo, ringMat)
    }

    const halo1 = createGlowRing(4.82, 8.5, 0.45)
    halo1.position.z = -0.2
    moonGroup.add(halo1)

    const halo2 = createGlowRing(8.2, 14.0, 0.25)
    halo2.position.z = -0.3
    moonGroup.add(halo2)

    scene.add(moonGroup)

    // =========================================================================
    // 3. SANMON / TORII GATE & JADE MOSS PLINTHS
    // =========================================================================
    const sanctuaryGroup = new THREE.Group()

    const charredWoodMat = new THREE.MeshStandardMaterial({
      color: 0x0a0c0e,
      roughness: 0.88,
      metalness: 0.12,
    })

    const lacqueredVermilionMat = new THREE.MeshStandardMaterial({
      color: 0xaa1812,
      roughness: 0.45,
      metalness: 0.25,
    })

    // Moss-kissed ancient stone material with jade undertone
    const jadeMossStoneMat = new THREE.MeshStandardMaterial({
      color: 0x112117,
      roughness: 0.85,
      metalness: 0.08,
    })

    const toriiGroup = new THREE.Group()
    toriiGroup.position.set(0, 0, -2)

    // Pillars (Hashira)
    const pillarGeo = new THREE.CylinderGeometry(0.32, 0.38, 7.5, 20)
    const leftPillar = new THREE.Mesh(pillarGeo, charredWoodMat)
    leftPillar.position.set(-3.2, 3.5, 0)
    leftPillar.rotation.z = 0.02
    toriiGroup.add(leftPillar)

    const rightPillar = new THREE.Mesh(pillarGeo, charredWoodMat)
    rightPillar.position.set(3.2, 3.5, 0)
    rightPillar.rotation.z = -0.02
    toriiGroup.add(rightPillar)

    // Jade moss-covered plinths
    const plinthGeo = new THREE.CylinderGeometry(0.55, 0.65, 0.6, 16)
    const leftPlinth = new THREE.Mesh(plinthGeo, jadeMossStoneMat)
    leftPlinth.position.set(-3.2, 0.2, 0)
    toriiGroup.add(leftPlinth)

    const rightPlinth = new THREE.Mesh(plinthGeo, jadeMossStoneMat)
    rightPlinth.position.set(3.2, 0.2, 0)
    toriiGroup.add(rightPlinth)

    // Top beam (Kasagi)
    const topBeamGeo = new THREE.BoxGeometry(9.4, 0.55, 0.85)
    const topBeam = new THREE.Mesh(topBeamGeo, lacqueredVermilionMat)
    topBeam.position.set(0, 7.2, 0)
    toriiGroup.add(topBeam)

    const capBeamGeo = new THREE.BoxGeometry(9.8, 0.25, 1.05)
    const capBeam = new THREE.Mesh(capBeamGeo, charredWoodMat)
    capBeam.position.set(0, 7.55, 0)
    toriiGroup.add(capBeam)

    // Tie beam (Nuki)
    const tieBeamGeo = new THREE.BoxGeometry(8.2, 0.38, 0.45)
    const tieBeam = new THREE.Mesh(tieBeamGeo, charredWoodMat)
    tieBeam.position.set(0, 5.8, 0)
    toriiGroup.add(tieBeam)

    const strutGeo = new THREE.BoxGeometry(0.42, 1.1, 0.35)
    const strut = new THREE.Mesh(strutGeo, lacqueredVermilionMat)
    strut.position.set(0, 6.5, 0)
    toriiGroup.add(strut)

    sanctuaryGroup.add(toriiGroup)

    // =========================================================================
    // 4. BAMBOO GROVE (CHIKURIN) FLANKS
    // =========================================================================
    const bambooMat = new THREE.MeshStandardMaterial({
      color: 0x16301d,
      roughness: 0.6,
      metalness: 0.15,
    })

    const createBambooStalk = (x: number, z: number, height: number) => {
      const g = new THREE.Group()
      g.position.set(x, 0, z)

      const segments = 5
      const segH = height / segments
      for (let s = 0; s < segments; s++) {
        const stalkMesh = new THREE.Mesh(
          new THREE.CylinderGeometry(0.11, 0.13, segH * 0.95, 12),
          bambooMat
        )
        stalkMesh.position.y = s * segH + segH / 2
        g.add(stalkMesh)

        // Joint ring
        const ringMesh = new THREE.Mesh(
          new THREE.TorusGeometry(0.13, 0.025, 8, 16),
          lacqueredVermilionMat
        )
        ringMesh.rotation.x = Math.PI / 2
        ringMesh.position.y = (s + 1) * segH
        g.add(ringMesh)
      }
      return g
    }

    // Left bamboo grove
    sanctuaryGroup.add(createBambooStalk(-6.5, 2.0, 11))
    sanctuaryGroup.add(createBambooStalk(-7.8, -1.0, 12.5))
    sanctuaryGroup.add(createBambooStalk(-5.8, -5.5, 10))
    sanctuaryGroup.add(createBambooStalk(-8.2, -8.0, 13))

    // Right bamboo grove
    sanctuaryGroup.add(createBambooStalk(6.2, 1.5, 10.5))
    sanctuaryGroup.add(createBambooStalk(7.6, -2.0, 13))
    sanctuaryGroup.add(createBambooStalk(5.6, -6.5, 11))
    sanctuaryGroup.add(createBambooStalk(8.0, -9.5, 12))

    // =========================================================================
    // 5. STONE LANTERNS & HANGING LANTERNS
    // =========================================================================
    const createStoneLantern = (x: number, z: number, yRot: number) => {
      const g = new THREE.Group()
      g.position.set(x, 0, z)
      g.rotation.y = yRot

      const baseMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(0.7, 0.85, 0.4, 6),
        jadeMossStoneMat
      )
      baseMesh.position.y = 0.2
      g.add(baseMesh)

      const postMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(0.3, 0.35, 1.4, 6),
        jadeMossStoneMat
      )
      postMesh.position.y = 1.0
      g.add(postMesh)

      const midMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(0.75, 0.6, 0.3, 6),
        jadeMossStoneMat
      )
      midMesh.position.y = 1.8
      g.add(midMesh)

      const lightMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(0.45, 0.45, 0.65, 6),
        new THREE.MeshStandardMaterial({
          color: 0xff8833,
          emissive: 0xff6622,
          emissiveIntensity: 2.8,
          roughness: 0.3,
        })
      )
      lightMesh.position.y = 2.25
      g.add(lightMesh)

      const roofMesh = new THREE.Mesh(
        new THREE.ConeGeometry(1.0, 0.5, 6),
        charredWoodMat
      )
      roofMesh.position.y = 2.8
      g.add(roofMesh)

      const topJewel = new THREE.Mesh(
        new THREE.SphereGeometry(0.2, 12, 12),
        jadeMossStoneMat
      )
      topJewel.position.y = 3.15
      g.add(topJewel)

      return g
    }

    sanctuaryGroup.add(createStoneLantern(-2.8, 0, 0.4))
    sanctuaryGroup.add(createStoneLantern(2.9, -4.5, -0.3))
    sanctuaryGroup.add(createStoneLantern(-3.4, -9, 0.6))
    sanctuaryGroup.add(createStoneLantern(3.2, -14, -0.5))

    const paperLanternGeo = new THREE.CylinderGeometry(0.24, 0.28, 0.7, 16)
    const paperLanternMat = new THREE.MeshStandardMaterial({
      color: 0xffaa44,
      emissive: 0xff5511,
      emissiveIntensity: 3.5,
    })

    const hangLantern1 = new THREE.Mesh(paperLanternGeo, paperLanternMat)
    hangLantern1.position.set(-1.8, 5.0, 0)
    toriiGroup.add(hangLantern1)

    const hangLantern2 = new THREE.Mesh(paperLanternGeo, paperLanternMat)
    hangLantern2.position.set(1.8, 5.0, 0)
    toriiGroup.add(hangLantern2)

    // =========================================================================
    // 6. STEPS & MOONWATER BASIN (REFLECTING JADE & VERMILION)
    // =========================================================================
    for (let i = 0; i < 14; i++) {
      const stepWidth = 6.8 - i * 0.12
      const stepGeo = new THREE.BoxGeometry(stepWidth, 0.28, 1.4)
      const stepMesh = new THREE.Mesh(stepGeo, jadeMossStoneMat)
      stepMesh.position.set(0, i * 0.24, -i * 1.3 + 4)
      sanctuaryGroup.add(stepMesh)
    }

    const waterGeo = new THREE.PlaneGeometry(65, 85, 48, 48)
    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x050a0f,
      roughness: 0.12,
      metalness: 0.9,
    })
    const waterMesh = new THREE.Mesh(waterGeo, waterMat)
    waterMesh.rotation.x = -Math.PI / 2
    waterMesh.position.set(0, -0.1, -15)
    sanctuaryGroup.add(waterMesh)

    scene.add(sanctuaryGroup)

    // =========================================================================
    // 7. SWIRLING EMBER PARTICLES (VERMILION & GOLD)
    // =========================================================================
    const emberCount = prefersReducedMotion ? 40 : 200
    const emberPositions = new Float32Array(emberCount * 3)
    const emberVelocities: { x: number; y: number; z: number; freq: number }[] =
      []
    const emberColors = new Float32Array(emberCount * 3)

    const colVermilion = new THREE.Color(0xe0231c)
    const colEmber = new THREE.Color(0xff6a28)
    const colGold = new THREE.Color(0xe8b84b)

    for (let i = 0; i < emberCount; i++) {
      const idx = i * 3
      emberPositions[idx] = (Math.random() - 0.5) * 36
      emberPositions[idx + 1] = Math.random() * 22 - 2
      emberPositions[idx + 2] = (Math.random() - 0.5) * 45 - 5

      emberVelocities.push({
        x: (Math.random() - 0.5) * 0.012,
        y: 0.008 + Math.random() * 0.018,
        z: (Math.random() - 0.5) * 0.01,
        freq: 0.6 + Math.random() * 2.2,
      })

      const rand = Math.random()
      const c = rand < 0.55 ? colVermilion : rand < 0.85 ? colEmber : colGold
      emberColors[idx] = c.r
      emberColors[idx + 1] = c.g
      emberColors[idx + 2] = c.b
    }

    const emberGeo = new THREE.BufferGeometry()
    emberGeo.setAttribute(
      'position',
      new THREE.BufferAttribute(emberPositions, 3)
    )
    emberGeo.setAttribute('color', new THREE.BufferAttribute(emberColors, 3))

    const pCanvas = document.createElement('canvas')
    pCanvas.width = 64
    pCanvas.height = 64
    const pCtx = pCanvas.getContext('2d')
    if (pCtx) {
      const grad = pCtx.createRadialGradient(32, 32, 0, 32, 32, 32)
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)')
      grad.addColorStop(0.35, 'rgba(255, 160, 90, 0.9)')
      grad.addColorStop(0.7, 'rgba(224, 35, 28, 0.4)')
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)')
      pCtx.fillStyle = grad
      pCtx.fillRect(0, 0, 64, 64)
    }

    const pTex = new THREE.CanvasTexture(pCanvas)
    const emberMat = new THREE.PointsMaterial({
      size: 0.46,
      map: pTex,
      vertexColors: true,
      transparent: true,
      opacity: 0.82,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const embers = new THREE.Points(emberGeo, emberMat)
    scene.add(embers)

    // =========================================================================
    // 8. MASCOT JADE FIREFLIES (LUMINOUS HOTARU)
    // =========================================================================
    const fireflyCount = prefersReducedMotion ? 25 : 110
    const fireflyPositions = new Float32Array(fireflyCount * 3)
    const fireflyOrigins: THREE.Vector3[] = []
    const fireflySpeeds: {
      speedX: number
      speedY: number
      speedZ: number
      phase: number
      radius: number
    }[] = []
    const fireflyColors = new Float32Array(fireflyCount * 3)

    const colJade = new THREE.Color(0x8ce019)
    const colCyan = new THREE.Color(0x0fe3c5)
    const colLimeLight = new THREE.Color(0xbefc52)

    for (let i = 0; i < fireflyCount; i++) {
      const idx = i * 3
      const origX = (Math.random() - 0.5) * 26
      const origY = 0.5 + Math.random() * 6.5
      const origZ = (Math.random() - 0.5) * 32 - 4

      fireflyPositions[idx] = origX
      fireflyPositions[idx + 1] = origY
      fireflyPositions[idx + 2] = origZ

      fireflyOrigins.push(new THREE.Vector3(origX, origY, origZ))
      fireflySpeeds.push({
        speedX: 0.6 + Math.random() * 1.4,
        speedY: 0.8 + Math.random() * 1.2,
        speedZ: 0.5 + Math.random() * 1.1,
        phase: Math.random() * Math.PI * 2,
        radius: 0.8 + Math.random() * 1.6,
      })

      const rand = Math.random()
      const c = rand < 0.6 ? colJade : rand < 0.85 ? colCyan : colLimeLight
      fireflyColors[idx] = c.r
      fireflyColors[idx + 1] = c.g
      fireflyColors[idx + 2] = c.b
    }

    const fireflyGeo = new THREE.BufferGeometry()
    fireflyGeo.setAttribute(
      'position',
      new THREE.BufferAttribute(fireflyPositions, 3)
    )
    fireflyGeo.setAttribute(
      'color',
      new THREE.BufferAttribute(fireflyColors, 3)
    )

    // Jade glow particle canvas
    const fCanvas = document.createElement('canvas')
    fCanvas.width = 64
    fCanvas.height = 64
    const fCtx = fCanvas.getContext('2d')
    if (fCtx) {
      const grad = fCtx.createRadialGradient(32, 32, 0, 32, 32, 32)
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)')
      grad.addColorStop(0.3, 'rgba(140, 224, 25, 0.95)')
      grad.addColorStop(0.65, 'rgba(15, 227, 197, 0.4)')
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)')
      fCtx.fillStyle = grad
      fCtx.fillRect(0, 0, 64, 64)
    }

    const fTex = new THREE.CanvasTexture(fCanvas)
    const fireflyMat = new THREE.PointsMaterial({
      size: 0.55,
      map: fTex,
      vertexColors: true,
      transparent: true,
      opacity: 0.92,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const fireflies = new THREE.Points(fireflyGeo, fireflyMat)
    scene.add(fireflies)

    // =========================================================================
    // 9. CAMERA WAYPOINTS RIG (6 CHAPTERS)
    // =========================================================================
    const WAYPOINTS: CameraWaypoint[] = [
      {
        pos: new THREE.Vector3(0, 2.8, 14.5),
        lookAt: new THREE.Vector3(0.5, 3.8, -4),
        moonIntensity: 2.2,
        lanternIntensity: 4.5,
        jadeIntensity: 2.5,
        fov: 48,
      },
      {
        pos: new THREE.Vector3(-3.2, 2.2, 5.8),
        lookAt: new THREE.Vector3(0.8, 4.2, -3.5),
        moonIntensity: 2.6,
        lanternIntensity: 5.8,
        jadeIntensity: 3.8,
        fov: 44,
      },
      {
        pos: new THREE.Vector3(4.6, 1.2, 1.2),
        lookAt: new THREE.Vector3(-1.8, 2.2, -8.0),
        moonIntensity: 3.4,
        lanternIntensity: 6.2,
        jadeIntensity: 4.6,
        fov: 46,
      },
      {
        pos: new THREE.Vector3(-4.8, 5.8, 2.5),
        lookAt: new THREE.Vector3(0.2, 1.6, -6.5),
        moonIntensity: 2.8,
        lanternIntensity: 4.0,
        jadeIntensity: 3.0,
        fov: 52,
      },
      {
        pos: new THREE.Vector3(0, 3.2, -4.5),
        lookAt: new THREE.Vector3(0, 4.8, -22),
        moonIntensity: 3.8,
        lanternIntensity: 3.5,
        jadeIntensity: 4.2,
        fov: 50,
      },
      {
        pos: new THREE.Vector3(0, 9.2, 8.5),
        lookAt: new THREE.Vector3(6.5, 12.0, -32),
        moonIntensity: 5.5,
        lanternIntensity: 2.0,
        jadeIntensity: 2.0,
        fov: 56,
      },
    ]

    // =========================================================================
    // 10. SCROLL & MOUSE TRACKING ENGINE
    // =========================================================================
    let targetScrollProgress = 0
    let currentScrollProgress = 0

    let mouseX = 0
    let mouseY = 0
    let curMouseX = 0
    let curMouseY = 0

    const onScroll = () => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight
      if (maxScroll > 0) {
        targetScrollProgress = Math.max(
          0,
          Math.min(1, window.scrollY / maxScroll)
        )
      }
    }

    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('mousemove', onMouseMove, { passive: true })

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    onScroll()

    const currentCamPos = new THREE.Vector3()
    const currentLookAt = new THREE.Vector3()

    let clock = 0
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      clock += 0.016

      // Smooth scroll dampening
      currentScrollProgress +=
        (targetScrollProgress - currentScrollProgress) * 0.065

      // Mouse lerp
      curMouseX += (mouseX - curMouseX) * 0.04
      curMouseY += (mouseY - curMouseY) * 0.04

      // Map progress along the waypoints
      const segmentCount = WAYPOINTS.length - 1
      const scaledProgress = currentScrollProgress * segmentCount
      const segmentIndex = Math.min(
        Math.floor(scaledProgress),
        segmentCount - 1
      )
      const segmentAlpha = scaledProgress - segmentIndex
      const t = segmentAlpha * segmentAlpha * (3 - 2 * segmentAlpha)

      const wpStart = WAYPOINTS[segmentIndex]
      const wpEnd = WAYPOINTS[segmentIndex + 1]

      currentCamPos.lerpVectors(wpStart.pos, wpEnd.pos, t)
      currentLookAt.lerpVectors(wpStart.lookAt, wpEnd.lookAt, t)

      // Parallax mouse sway
      currentCamPos.x += curMouseX * 0.8
      currentCamPos.y += -curMouseY * 0.5
      currentLookAt.x += curMouseX * 0.4
      currentLookAt.y += -curMouseY * 0.3

      camera.position.copy(currentCamPos)
      camera.lookAt(currentLookAt)

      // FOV transition
      const targetFov = THREE.MathUtils.lerp(wpStart.fov, wpEnd.fov, t)
      if (Math.abs(camera.fov - targetFov) > 0.01) {
        camera.fov = targetFov
        camera.updateProjectionMatrix()
      }

      // Lights interpolation
      const moonPower = THREE.MathUtils.lerp(
        wpStart.moonIntensity,
        wpEnd.moonIntensity,
        t
      )
      moonLight.intensity = moonPower

      const lanternPower = THREE.MathUtils.lerp(
        wpStart.lanternIntensity,
        wpEnd.lanternIntensity,
        t
      )
      const flicker1 =
        lanternPower * (0.92 + Math.sin(clock * 9.2) * 0.08 + Math.cos(clock * 17.5) * 0.05)
      const flicker2 =
        lanternPower * (0.90 + Math.sin(clock * 11.4) * 0.09 + Math.sin(clock * 21.0) * 0.06)

      lanternLight1.intensity = flicker1
      lanternLight2.intensity = flicker2

      // Mascot Jade & Cyan lights animation
      const jadePower = THREE.MathUtils.lerp(
        wpStart.jadeIntensity,
        wpEnd.jadeIntensity,
        t
      )
      const jadeBreath = jadePower * (0.85 + Math.sin(clock * 2.4) * 0.18)
      jadeGlowLight.intensity = jadeBreath

      const cyanBreath = 2.4 + Math.sin(clock * 1.8 + 1) * 0.6
      cyanWaterLight.intensity = cyanBreath

      // Water gentle wave ripples
      const waterPos = waterGeo.attributes.position.array as Float32Array
      for (let i = 0; i < waterPos.length; i += 3) {
        const u = waterPos[i]
        const v = waterPos[i + 1]
        waterPos[i + 2] =
          Math.sin(u * 0.35 + clock * 1.5) * 0.05 +
          Math.cos(v * 0.4 + clock * 1.8) * 0.05
      }
      waterGeo.attributes.position.needsUpdate = true

      // Animate Green Fireflies (Hotaru)
      if (!prefersReducedMotion) {
        const ffArray = fireflyGeo.attributes.position.array as Float32Array
        for (let i = 0; i < fireflyCount; i++) {
          const idx = i * 3
          const orig = fireflyOrigins[i]
          const sp = fireflySpeeds[i]

          ffArray[idx] =
            orig.x + Math.sin(clock * sp.speedX + sp.phase) * sp.radius
          ffArray[idx + 1] =
            orig.y + Math.cos(clock * sp.speedY + sp.phase) * (sp.radius * 0.6)
          ffArray[idx + 2] =
            orig.z + Math.sin(clock * sp.speedZ + sp.phase) * sp.radius
        }
        fireflyGeo.attributes.position.needsUpdate = true

        // Animate Embers
        const pArray = emberGeo.attributes.position.array as Float32Array
        for (let i = 0; i < emberCount; i++) {
          const idx = i * 3
          const vel = emberVelocities[i]

          pArray[idx + 1] += vel.y
          pArray[idx] += Math.sin(clock * vel.freq + i) * 0.008 + vel.x
          pArray[idx + 2] += Math.cos(clock * vel.freq * 0.8 + i) * 0.006

          if (pArray[idx + 1] > 20) {
            pArray[idx + 1] = -2
            pArray[idx] = (Math.random() - 0.5) * 36
            pArray[idx + 2] = (Math.random() - 0.5) * 45 - 5
          }
        }
        emberGeo.attributes.position.needsUpdate = true

        const moonScale = 1 + Math.sin(clock * 0.7) * 0.035
        moonGroup.scale.set(moonScale, moonScale, moonScale)
      }

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', handleResize)

      moonGeo.dispose()
      moonMat.dispose()
      pillarGeo.dispose()
      bambooMat.dispose()
      charredWoodMat.dispose()
      lacqueredVermilionMat.dispose()
      jadeMossStoneMat.dispose()
      waterGeo.dispose()
      waterMat.dispose()
      emberGeo.dispose()
      emberMat.dispose()
      fireflyGeo.dispose()
      fireflyMat.dispose()
      pTex.dispose()
      fTex.dispose()
      renderer.dispose()
    }
  }, [])

  return <canvas id='gl-canvas' ref={canvasRef} aria-hidden='true' />
}
