'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { createInkRoninGroup } from './kage-ink-ronin'

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
    renderer.toneMappingExposure = 1.15
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap

    const scene = new THREE.Scene()
    // Kyoto night mist depth fog
    scene.fog = new THREE.FogExp2(0x05070a, 0.032)

    const camera = new THREE.PerspectiveCamera(
      48,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )

    // =========================================================================
    // 1. LIGHTING (DUAL ACCENT + DEDICATED SWORDSMAN SPOTLIGHT)
    // =========================================================================
    const ambientLight = new THREE.AmbientLight(0x0c141d, 1.8)
    scene.add(ambientLight)

    // Vermilion moon primary directional light
    const moonLight = new THREE.DirectionalLight(0xe0231c, 2.8)
    moonLight.position.set(14, 20, -30)
    moonLight.castShadow = true
    moonLight.shadow.mapSize.width = 1024
    moonLight.shadow.mapSize.height = 1024
    moonLight.shadow.camera.near = 0.5
    moonLight.shadow.camera.far = 80
    moonLight.shadow.camera.left = -16
    moonLight.shadow.camera.right = 16
    moonLight.shadow.camera.top = 16
    moonLight.shadow.camera.bottom = -16
    moonLight.shadow.bias = -0.001
    scene.add(moonLight)

    // Warm stone lantern lights
    const lanternLight1 = new THREE.PointLight(0xff6a28, 3.8, 18, 1.8)
    lanternLight1.position.set(-2.6, 2.5, 0)
    scene.add(lanternLight1)

    const lanternLight2 = new THREE.PointLight(0xff7a36, 3.4, 16, 1.8)
    lanternLight2.position.set(2.8, 2.2, -6)
    scene.add(lanternLight2)

    // Mascot Lime Jade Accent Light (ground & moss)
    const jadeGlowLight = new THREE.PointLight(0x8ce019, 2.4, 16, 1.9)
    jadeGlowLight.position.set(-2.6, 1.0, -1)
    scene.add(jadeGlowLight)

    // Mascot Cyan Accent Light (reflective pool)
    const cyanWaterLight = new THREE.PointLight(0x0fe3c5, 2.2, 22, 2.0)
    cyanWaterLight.position.set(3.0, 0.4, -10)
    scene.add(cyanWaterLight)

    // Dedicated Key Spotlight on the character
    const characterKeyLight = new THREE.PointLight(0xffeed6, 3.2, 9.0, 1.8)
    scene.add(characterKeyLight)

    // Dedicated Cyan/Jade Rim Light for character edge silhouette
    const characterRimLight = new THREE.PointLight(0x0fe3c5, 2.8, 7.5, 2.0)
    scene.add(characterRimLight)

    // Ground fill
    const groundFill = new THREE.PointLight(0x0c1a14, 1.4, 28)
    groundFill.position.set(0, -1, 5)
    scene.add(groundFill)

    // =========================================================================
    // 2. THE VERMILION MOON & REFINED ATMOSPHERIC CORONA
    // =========================================================================
    const moonGroup = new THREE.Group()
    moonGroup.position.set(9.5, 14.5, -42)

    const moonGeo = new THREE.SphereGeometry(4.8, 36, 36)
    const moonMat = new THREE.MeshStandardMaterial({
      color: 0xee2820,
      emissive: 0x99110c,
      emissiveIntensity: 1.4,
      roughness: 0.8,
      metalness: 0.1,
    })
    const moonMesh = new THREE.Mesh(moonGeo, moonMat)
    moonGroup.add(moonMesh)

    const createGlowRing = (innerR: number, outerR: number, opacity: number, colorHex: number) => {
      const ringGeo = new THREE.RingGeometry(innerR, outerR, 48)
      const ringMat = new THREE.ShaderMaterial({
        transparent: true,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        uniforms: {
          color: { value: new THREE.Color(colorHex) },
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
            float alpha = smoothstep(0.5, 0.05, dist) * uOpacity;
            gl_FragColor = vec4(color, alpha);
          }
        `,
      })
      return new THREE.Mesh(ringGeo, ringMat)
    }

    const halo1 = createGlowRing(4.82, 8.8, 0.4, 0xe0231c)
    halo1.position.z = -0.2
    moonGroup.add(halo1)

    const halo2 = createGlowRing(8.2, 16.0, 0.18, 0xff5a3c)
    halo2.position.z = -0.3
    moonGroup.add(halo2)

    scene.add(moonGroup)

    // =========================================================================
    // 3. KYOTO DISTANT MOUNTAIN RIDGES (HIGASHIYAMA ATMOSPHERE)
    // =========================================================================
    const mountainsGroup = new THREE.Group()

    const createMountainRidge = (
      zPos: number,
      yBase: number,
      peakHeight: number,
      segments: number,
      color: number,
      opacity: number
    ) => {
      const shape = new THREE.Shape()
      const width = 140
      const halfW = width / 2
      shape.moveTo(-halfW, yBase - 15)

      for (let i = 0; i <= segments; i++) {
        const x = -halfW + (i / segments) * width
        const h =
          Math.sin(i * 0.45) * (peakHeight * 0.45) +
          Math.cos(i * 0.9 + 1.2) * (peakHeight * 0.3) +
          Math.sin(i * 1.8) * (peakHeight * 0.25)
        shape.lineTo(x, yBase + Math.max(0, h))
      }

      shape.lineTo(halfW, yBase - 15)
      shape.closePath()

      const geo = new THREE.ShapeGeometry(shape)
      const mat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity,
      })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.position.z = zPos
      return mesh
    }

    mountainsGroup.add(createMountainRidge(-68, -4, 18, 36, 0x050a0d, 0.88))
    mountainsGroup.add(createMountainRidge(-56, -6, 14, 28, 0x071116, 0.94))
    scene.add(mountainsGroup)

    // =========================================================================
    // 4. ICONIC KYOTO 5-TIER PAGODA SILHOUETTE (GOJŪNOTŌ)
    // =========================================================================
    const pagodaGroup = new THREE.Group()
    pagodaGroup.position.set(11.5, -0.5, -44)

    const pagodaMat = new THREE.MeshStandardMaterial({
      color: 0x080c0f,
      roughness: 0.9,
      metalness: 0.1,
    })

    const pagodaRoofMat = new THREE.MeshStandardMaterial({
      color: 0x0e141a,
      roughness: 0.6,
      metalness: 0.2,
    })

    const tierHeights = [2.4, 2.1, 1.8, 1.6, 1.4]
    const tierWidths = [2.8, 2.4, 2.0, 1.7, 1.4]
    let currentY = 0

    const pagodaBase = new THREE.Mesh(
      new THREE.BoxGeometry(3.6, 0.8, 3.6),
      pagodaMat
    )
    pagodaBase.position.y = 0.4
    pagodaGroup.add(pagodaBase)
    currentY += 0.8

    for (let t = 0; t < 5; t++) {
      const tw = tierWidths[t]
      const th = tierHeights[t]

      const bodyMesh = new THREE.Mesh(
        new THREE.BoxGeometry(tw, th, tw),
        pagodaMat
      )
      bodyMesh.position.y = currentY + th / 2
      pagodaGroup.add(bodyMesh)
      currentY += th

      const roofOverhang = tw * 1.5
      const roofMesh = new THREE.Mesh(
        new THREE.ConeGeometry(roofOverhang, 0.65, 4),
        pagodaRoofMat
      )
      roofMesh.rotation.y = Math.PI / 4
      roofMesh.position.y = currentY + 0.3
      pagodaGroup.add(roofMesh)
      currentY += 0.45
    }

    const spireMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.06, 0.12, 3.8, 8),
      new THREE.MeshStandardMaterial({
        color: 0xbfa04b,
        metalness: 0.8,
        roughness: 0.3,
      })
    )
    spireMesh.position.y = currentY + 1.9
    pagodaGroup.add(spireMesh)

    scene.add(pagodaGroup)

    // =========================================================================
    // 5. AUTHENTIC SANMON / TORII GATE CRAFTSMANSHIP
    // =========================================================================
    const sanctuaryGroup = new THREE.Group()

    const charredWoodMat = new THREE.MeshStandardMaterial({
      color: 0x090b0d,
      roughness: 0.88,
      metalness: 0.12,
    })

    const lacqueredVermilionMat = new THREE.MeshStandardMaterial({
      color: 0xaa1812,
      roughness: 0.42,
      metalness: 0.28,
    })

    const goldOrnamentMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.85,
      roughness: 0.22,
    })

    const jadeMossStoneMat = new THREE.MeshStandardMaterial({
      color: 0x112117,
      roughness: 0.85,
      metalness: 0.08,
    })

    const toriiGroup = new THREE.Group()
    toriiGroup.position.set(0, 0, -2)

    // Main Pillars (Hashira)
    const pillarGeo = new THREE.CylinderGeometry(0.32, 0.4, 7.6, 24)
    const leftPillar = new THREE.Mesh(pillarGeo, charredWoodMat)
    leftPillar.position.set(-3.2, 3.5, 0)
    leftPillar.rotation.z = 0.02
    leftPillar.castShadow = true
    toriiGroup.add(leftPillar)

    const rightPillar = new THREE.Mesh(pillarGeo, charredWoodMat)
    rightPillar.position.set(3.2, 3.5, 0)
    rightPillar.rotation.z = -0.02
    rightPillar.castShadow = true
    toriiGroup.add(rightPillar)

    // Gold collar rings (Daiwa)
    const collarGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.18, 24)
    const leftCollar = new THREE.Mesh(collarGeo, goldOrnamentMat)
    leftCollar.position.set(-3.2, 6.9, 0)
    toriiGroup.add(leftCollar)

    const rightCollar = new THREE.Mesh(collarGeo, goldOrnamentMat)
    rightCollar.position.set(3.2, 6.9, 0)
    toriiGroup.add(rightCollar)

    // Plinths (Kamebara)
    const plinthGeo = new THREE.CylinderGeometry(0.55, 0.72, 0.65, 16)
    const leftPlinth = new THREE.Mesh(plinthGeo, jadeMossStoneMat)
    leftPlinth.position.set(-3.2, 0.22, 0)
    leftPlinth.receiveShadow = true
    toriiGroup.add(leftPlinth)

    const rightPlinth = new THREE.Mesh(plinthGeo, jadeMossStoneMat)
    rightPlinth.position.set(3.2, 0.22, 0)
    rightPlinth.receiveShadow = true
    toriiGroup.add(rightPlinth)

    // Upper Curved Kasagi Beam
    const createCurvedKasagi = () => {
      const group = new THREE.Group()
      const segments = 18
      const totalWidth = 9.8
      const halfW = totalWidth / 2
      const stepW = totalWidth / segments

      for (let i = 0; i < segments; i++) {
        const x = -halfW + i * stepW + stepW / 2
        const norm = Math.abs(x) / halfW
        const yOffset = Math.pow(norm, 2.2) * 0.36
        const rotZ = (x / halfW) * -0.07

        const segMesh = new THREE.Mesh(
          new THREE.BoxGeometry(stepW * 1.02, 0.54, 0.88),
          lacqueredVermilionMat
        )
        segMesh.position.set(x, 7.3 + yOffset, 0)
        segMesh.rotation.z = rotZ
        segMesh.castShadow = true
        group.add(segMesh)

        const capMesh = new THREE.Mesh(
          new THREE.BoxGeometry(stepW * 1.02, 0.18, 1.08),
          charredWoodMat
        )
        capMesh.position.set(x, 7.62 + yOffset, 0)
        capMesh.rotation.z = rotZ
        group.add(capMesh)
      }

      const goldCapGeo = new THREE.BoxGeometry(0.3, 0.58, 0.92)
      const leftGoldCap = new THREE.Mesh(goldCapGeo, goldOrnamentMat)
      leftGoldCap.position.set(-halfW - 0.12, 7.68, 0)
      leftGoldCap.rotation.z = 0.08
      group.add(leftGoldCap)

      const rightGoldCap = new THREE.Mesh(goldCapGeo, goldOrnamentMat)
      rightGoldCap.position.set(halfW + 0.12, 7.68, 0)
      rightGoldCap.rotation.z = -0.08
      group.add(rightGoldCap)

      return group
    }
    toriiGroup.add(createCurvedKasagi())

    // Tie-beam (Nuki)
    const tieBeamGeo = new THREE.BoxGeometry(8.6, 0.38, 0.48)
    const tieBeam = new THREE.Mesh(tieBeamGeo, charredWoodMat)
    tieBeam.position.set(0, 5.75, 0)
    tieBeam.castShadow = true
    toriiGroup.add(tieBeam)

    const nukiCapGeo = new THREE.BoxGeometry(0.18, 0.42, 0.52)
    const leftNukiCap = new THREE.Mesh(nukiCapGeo, goldOrnamentMat)
    leftNukiCap.position.set(-4.35, 5.75, 0)
    toriiGroup.add(leftNukiCap)

    const rightNukiCap = new THREE.Mesh(nukiCapGeo, goldOrnamentMat)
    rightNukiCap.position.set(4.35, 5.75, 0)
    toriiGroup.add(rightNukiCap)

    const strutGeo = new THREE.BoxGeometry(0.44, 1.25, 0.36)
    const strut = new THREE.Mesh(strutGeo, lacqueredVermilionMat)
    strut.position.set(0, 6.5, 0)
    toriiGroup.add(strut)

    const createBracket = (x: number) => {
      const g = new THREE.Group()
      g.position.set(x, 7.0, 0)
      const arm = new THREE.Mesh(
        new THREE.BoxGeometry(0.9, 0.16, 0.4),
        charredWoodMat
      )
      g.add(arm)
      const bearingBlock = new THREE.Mesh(
        new THREE.BoxGeometry(0.24, 0.18, 0.42),
        goldOrnamentMat
      )
      bearingBlock.position.y = 0.14
      g.add(bearingBlock)
      return g
    }
    toriiGroup.add(createBracket(-3.2))
    toriiGroup.add(createBracket(3.2))

    // Shimenawa rope
    const ropeCurve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-3.1, 5.5, 0.2),
      new THREE.Vector3(0, 5.1, 0.25),
      new THREE.Vector3(3.1, 5.5, 0.2)
    )
    const ropeGeo = new THREE.TubeGeometry(ropeCurve, 20, 0.07, 8, false)
    const ropeMat = new THREE.MeshStandardMaterial({
      color: 0xd6c292,
      roughness: 0.95,
      metalness: 0.05,
    })
    const ropeMesh = new THREE.Mesh(ropeGeo, ropeMat)
    toriiGroup.add(ropeMesh)

    const shideMat = new THREE.MeshStandardMaterial({
      color: 0xf5f8f5,
      roughness: 0.7,
      side: THREE.DoubleSide,
    })
    const shidePositions = [-1.8, -0.6, 0.6, 1.8]
    shidePositions.forEach((posX) => {
      const shideGeo = new THREE.PlaneGeometry(0.18, 0.55)
      const shideMesh = new THREE.Mesh(shideGeo, shideMat)
      shideMesh.position.set(posX, 4.9, 0.24)
      shideMesh.rotation.z = (Math.random() - 0.5) * 0.2
      toriiGroup.add(shideMesh)
    })

    sanctuaryGroup.add(toriiGroup)

    // =========================================================================
    // 6. BAMBOO GROVE (CHIKURIN) SILHOUETTES
    // =========================================================================
    const bambooMat = new THREE.MeshStandardMaterial({
      color: 0x14281a,
      roughness: 0.7,
      metalness: 0.1,
    })

    const createBambooStalk = (x: number, z: number, height: number) => {
      const g = new THREE.Group()
      g.position.set(x, 0, z)

      const segments = 5
      const segH = height / segments
      for (let s = 0; s < segments; s++) {
        const stalkMesh = new THREE.Mesh(
          new THREE.CylinderGeometry(0.1, 0.12, segH * 0.96, 12),
          bambooMat
        )
        stalkMesh.position.y = s * segH + segH / 2
        stalkMesh.castShadow = true
        g.add(stalkMesh)

        const ringMesh = new THREE.Mesh(
          new THREE.TorusGeometry(0.12, 0.02, 8, 16),
          lacqueredVermilionMat
        )
        ringMesh.rotation.x = Math.PI / 2
        ringMesh.position.y = (s + 1) * segH
        g.add(ringMesh)
      }
      return g
    }

    sanctuaryGroup.add(createBambooStalk(-6.8, 1.5, 11))
    sanctuaryGroup.add(createBambooStalk(-8.2, -1.5, 12.5))
    sanctuaryGroup.add(createBambooStalk(-6.0, -6.0, 10))
    sanctuaryGroup.add(createBambooStalk(-8.6, -9.0, 13))

    sanctuaryGroup.add(createBambooStalk(6.5, 1.0, 10.5))
    sanctuaryGroup.add(createBambooStalk(8.0, -2.5, 13))
    sanctuaryGroup.add(createBambooStalk(5.8, -7.0, 11))
    sanctuaryGroup.add(createBambooStalk(8.4, -10.0, 12))

    // =========================================================================
    // 7. AUTHENTIC STONE LANTERNS (KASUGA-DŌRŌ) & PAPER LANTERNS
    // =========================================================================
    const createStoneLantern = (x: number, z: number, yRot: number) => {
      const g = new THREE.Group()
      g.position.set(x, 0, z)
      g.rotation.y = yRot

      const baseMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(0.65, 0.8, 0.35, 6),
        jadeMossStoneMat
      )
      baseMesh.position.y = 0.18
      baseMesh.receiveShadow = true
      g.add(baseMesh)

      const postMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(0.28, 0.32, 1.45, 6),
        jadeMossStoneMat
      )
      postMesh.position.y = 1.05
      postMesh.castShadow = true
      g.add(postMesh)

      const midMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(0.72, 0.55, 0.28, 6),
        jadeMossStoneMat
      )
      midMesh.position.y = 1.85
      g.add(midMesh)

      const fireboxFrame = new THREE.Mesh(
        new THREE.CylinderGeometry(0.48, 0.48, 0.68, 6),
        charredWoodMat
      )
      fireboxFrame.position.y = 2.3
      g.add(fireboxFrame)

      const flameCore = new THREE.Mesh(
        new THREE.CylinderGeometry(0.32, 0.32, 0.58, 6),
        new THREE.MeshStandardMaterial({
          color: 0xffaa44,
          emissive: 0xff5511,
          emissiveIntensity: 3.2,
          roughness: 0.2,
        })
      )
      flameCore.position.y = 2.3
      g.add(flameCore)

      const roofMesh = new THREE.Mesh(
        new THREE.ConeGeometry(0.98, 0.46, 6),
        charredWoodMat
      )
      roofMesh.position.y = 2.82
      roofMesh.castShadow = true
      g.add(roofMesh)

      const topJewel = new THREE.Mesh(
        new THREE.SphereGeometry(0.18, 12, 12),
        jadeMossStoneMat
      )
      topJewel.position.y = 3.16
      g.add(topJewel)

      return g
    }

    sanctuaryGroup.add(createStoneLantern(-2.8, 0, 0.4))
    sanctuaryGroup.add(createStoneLantern(2.9, -4.5, -0.3))
    sanctuaryGroup.add(createStoneLantern(-3.4, -9, 0.6))
    sanctuaryGroup.add(createStoneLantern(3.2, -14, -0.5))

    const paperLanternGeo = new THREE.CylinderGeometry(0.22, 0.26, 0.68, 16)
    const paperLanternMat = new THREE.MeshStandardMaterial({
      color: 0xffaa44,
      emissive: 0xff5511,
      emissiveIntensity: 3.4,
    })

    const hangLantern1 = new THREE.Mesh(paperLanternGeo, paperLanternMat)
    hangLantern1.position.set(-1.8, 4.95, 0)
    toriiGroup.add(hangLantern1)

    const hangLantern2 = new THREE.Mesh(paperLanternGeo, paperLanternMat)
    hangLantern2.position.set(1.8, 4.95, 0)
    toriiGroup.add(hangLantern2)

    // =========================================================================
    // 8. ZEN STEPPING STONES (TOBI-ISHI) & MIRROR POND (KYŌKO-CHI)
    // =========================================================================
    for (let i = 0; i < 14; i++) {
      const stepWidth = 6.2 - i * 0.14
      const stepGeo = new THREE.BoxGeometry(stepWidth, 0.26, 1.35)
      const stepMesh = new THREE.Mesh(stepGeo, jadeMossStoneMat)
      stepMesh.position.set(0, i * 0.22, -i * 1.25 + 4)
      stepMesh.receiveShadow = true
      sanctuaryGroup.add(stepMesh)
    }

    const waterGeo = new THREE.PlaneGeometry(70, 90, 48, 48)
    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x04080d,
      roughness: 0.1,
      metalness: 0.92,
    })
    const waterMesh = new THREE.Mesh(waterGeo, waterMat)
    waterMesh.rotation.x = -Math.PI / 2
    waterMesh.position.set(0, -0.1, -15)
    waterMesh.receiveShadow = true
    sanctuaryGroup.add(waterMesh)

    scene.add(sanctuaryGroup)

    // =========================================================================
    // 9. CINEMATIC INK RONIN SILHOUETTE (THỦY MẶC LÃNG KHÁCH)
    // =========================================================================
    const inkRonin = createInkRoninGroup()
    scene.add(inkRonin.group)

    // =========================================================================
    // 10. SUBTLE ATMOSPHERIC EMBERS (MINIMALIST & CRISP)
    // =========================================================================
    const emberCount = prefersReducedMotion ? 12 : 36
    const emberPositions = new Float32Array(emberCount * 3)
    const emberVelocities: { x: number; y: number; z: number; freq: number }[] =
      []
    const emberColors = new Float32Array(emberCount * 3)

    const colVermilion = new THREE.Color(0xe0231c)
    const colEmber = new THREE.Color(0xff6a28)
    const colGold = new THREE.Color(0xe8b84b)

    for (let i = 0; i < emberCount; i++) {
      const idx = i * 3
      emberPositions[idx] = (Math.random() - 0.5) * 28
      emberPositions[idx + 1] = Math.random() * 18 - 2
      emberPositions[idx + 2] = (Math.random() - 0.5) * 36 - 6

      emberVelocities.push({
        x: (Math.random() - 0.5) * 0.008,
        y: 0.006 + Math.random() * 0.012,
        z: (Math.random() - 0.5) * 0.008,
        freq: 0.5 + Math.random() * 1.6,
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
    pCanvas.width = 32
    pCanvas.height = 32
    const pCtx = pCanvas.getContext('2d')
    if (pCtx) {
      const grad = pCtx.createRadialGradient(16, 16, 0, 16, 16, 16)
      grad.addColorStop(0, 'rgba(255, 255, 255, 0.95)')
      grad.addColorStop(0.25, 'rgba(255, 140, 70, 0.7)')
      grad.addColorStop(0.65, 'rgba(224, 35, 28, 0.25)')
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)')
      pCtx.fillStyle = grad
      pCtx.fillRect(0, 0, 32, 32)
    }

    const pTex = new THREE.CanvasTexture(pCanvas)
    const emberMat = new THREE.PointsMaterial({
      size: 0.24,
      map: pTex,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const embers = new THREE.Points(emberGeo, emberMat)
    scene.add(embers)

    // =========================================================================
    // 11. REFINED ORGANIC HOTARU (DISCREET & BREATHING JADE FIREFLIES)
    // =========================================================================
    const fireflyCount = prefersReducedMotion ? 6 : 18
    const fireflyPositions = new Float32Array(fireflyCount * 3)
    const fireflyOrigins: THREE.Vector3[] = []
    const fireflyDynamics: {
      speedX: number
      speedY: number
      speedZ: number
      phase: number
      radius: number
      pulseFreq: number
    }[] = []
    const fireflyColors = new Float32Array(fireflyCount * 3)

    const colJade = new THREE.Color(0x8ce019)
    const colCyan = new THREE.Color(0x0fe3c5)

    for (let i = 0; i < fireflyCount; i++) {
      const idx = i * 3
      const side = i % 2 === 0 ? -1 : 1
      const origX = side * (2.8 + Math.random() * 4.5)
      const origY = 0.3 + Math.random() * 2.2
      const origZ = -1 - Math.random() * 14

      fireflyPositions[idx] = origX
      fireflyPositions[idx + 1] = origY
      fireflyPositions[idx + 2] = origZ

      fireflyOrigins.push(new THREE.Vector3(origX, origY, origZ))
      fireflyDynamics.push({
        speedX: 0.4 + Math.random() * 0.6,
        speedY: 0.5 + Math.random() * 0.7,
        speedZ: 0.3 + Math.random() * 0.5,
        phase: Math.random() * Math.PI * 2,
        radius: 0.5 + Math.random() * 0.9,
        pulseFreq: 1.2 + Math.random() * 1.5,
      })

      const c = Math.random() < 0.65 ? colJade : colCyan
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

    const fCanvas = document.createElement('canvas')
    fCanvas.width = 64
    fCanvas.height = 64
    const fCtx = fCanvas.getContext('2d')
    if (fCtx) {
      const grad = fCtx.createRadialGradient(32, 32, 0, 32, 32, 32)
      grad.addColorStop(0, 'rgba(255, 255, 255, 0.95)')
      grad.addColorStop(0.18, 'rgba(180, 245, 60, 0.7)')
      grad.addColorStop(0.45, 'rgba(140, 224, 25, 0.22)')
      grad.addColorStop(0.75, 'rgba(15, 227, 197, 0.05)')
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)')
      fCtx.fillStyle = grad
      fCtx.fillRect(0, 0, 64, 64)

      fCtx.strokeStyle = 'rgba(255, 255, 255, 0.25)'
      fCtx.lineWidth = 1
      fCtx.beginPath()
      fCtx.moveTo(16, 32)
      fCtx.lineTo(48, 32)
      fCtx.moveTo(32, 16)
      fCtx.lineTo(32, 48)
      fCtx.stroke()
    }

    const fTex = new THREE.CanvasTexture(fCanvas)
    const fireflyMat = new THREE.PointsMaterial({
      size: 0.32,
      map: fTex,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const fireflies = new THREE.Points(fireflyGeo, fireflyMat)
    scene.add(fireflies)

    // =========================================================================
    // 12. CAMERA WAYPOINTS RIG (6 CHAPTERS)
    // =========================================================================
    const WAYPOINTS: CameraWaypoint[] = [
      {
        pos: new THREE.Vector3(0, 2.8, 14.5),
        lookAt: new THREE.Vector3(0.5, 3.8, -4),
        moonIntensity: 2.2,
        lanternIntensity: 4.5,
        jadeIntensity: 2.2,
        fov: 48,
      },
      {
        pos: new THREE.Vector3(-3.2, 2.2, 5.8),
        lookAt: new THREE.Vector3(0.8, 4.2, -3.5),
        moonIntensity: 2.6,
        lanternIntensity: 5.5,
        jadeIntensity: 3.2,
        fov: 44,
      },
      {
        pos: new THREE.Vector3(4.6, 1.2, 1.2),
        lookAt: new THREE.Vector3(-1.8, 2.2, -8.0),
        moonIntensity: 3.4,
        lanternIntensity: 5.8,
        jadeIntensity: 3.8,
        fov: 46,
      },
      {
        pos: new THREE.Vector3(-4.8, 5.8, 2.5),
        lookAt: new THREE.Vector3(0.2, 1.6, -6.5),
        moonIntensity: 2.8,
        lanternIntensity: 3.8,
        jadeIntensity: 2.6,
        fov: 52,
      },
      {
        pos: new THREE.Vector3(0, 3.2, -4.5),
        lookAt: new THREE.Vector3(0, 4.8, -22),
        moonIntensity: 3.8,
        lanternIntensity: 3.2,
        jadeIntensity: 3.4,
        fov: 50,
      },
      {
        pos: new THREE.Vector3(0, 9.2, 8.5),
        lookAt: new THREE.Vector3(6.5, 12.0, -32),
        moonIntensity: 5.5,
        lanternIntensity: 1.8,
        jadeIntensity: 1.6,
        fov: 56,
      },
    ]

    // =========================================================================
    // 13. SCROLL & MOUSE TRACKING ENGINE
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
      if (!canvas) return
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
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

      // Smooth mouse lerp
      curMouseX += (mouseX - curMouseX) * 0.04
      curMouseY += (mouseY - curMouseY) * 0.04

      // Map progress along the camera waypoints
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
      currentCamPos.x += curMouseX * 0.7
      currentCamPos.y += -curMouseY * 0.4
      currentLookAt.x += curMouseX * 0.35

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
        lanternPower * (0.90 + Math.sin(clock * 8.1 + 2) * 0.1 + Math.cos(clock * 14.2) * 0.04)
      lanternLight1.intensity = flicker1
      lanternLight2.intensity = flicker2

      // Mascot Jade & Cyan lights animation
      const jadePower = THREE.MathUtils.lerp(
        wpStart.jadeIntensity,
        wpEnd.jadeIntensity,
        t
      )
      const jadeBreath = jadePower * (0.85 + Math.sin(clock * 2.2) * 0.15)
      jadeGlowLight.intensity = jadeBreath

      const cyanBreath = 2.0 + Math.sin(clock * 1.6 + 1) * 0.4
      cyanWaterLight.intensity = cyanBreath

      // =========================================================================
      // DYNAMIC ASCENT & LIGHTING ON THE STONE STAIRS (CINEMATIC INK RONIN)
      // =========================================================================
      inkRonin.update(
        0.016,
        clock,
        currentScrollProgress,
        curMouseX,
        curMouseY
      )

      const roninPos = inkRonin.group.position
      characterKeyLight.position.set(
        roninPos.x + 0.8,
        roninPos.y + 1.8,
        roninPos.z + 1.2
      )
      characterRimLight.position.set(
        roninPos.x - 1.2,
        roninPos.y + 1.4,
        roninPos.z - 0.8
      )

      // Water gentle wave ripples
      const waterPos = waterGeo.attributes.position.array as Float32Array
      for (let i = 0; i < waterPos.length; i += 3) {
        const u = waterPos[i]
        const v = waterPos[i + 1]
        waterPos[i + 2] =
          Math.sin(u * 0.28 + clock * 1.3) * 0.05 +
          Math.cos(v * 0.22 + clock * 0.9) * 0.04
      }
      waterGeo.attributes.position.needsUpdate = true

      // Animate Green Fireflies (Hotaru)
      if (!prefersReducedMotion) {
        const ffArray = fireflyGeo.attributes.position.array as Float32Array
        for (let i = 0; i < fireflyCount; i++) {
          const idx = i * 3
          const orig = fireflyOrigins[i]
          const dyn = fireflyDynamics[i]

          ffArray[idx] =
            orig.x + Math.sin(clock * dyn.speedX + dyn.phase) * dyn.radius
          ffArray[idx + 1] =
            orig.y + Math.cos(clock * dyn.speedY + dyn.phase) * (dyn.radius * 0.5)
          ffArray[idx + 2] =
            orig.z + Math.sin(clock * dyn.speedZ + dyn.phase) * dyn.radius
        }
        fireflyGeo.attributes.position.needsUpdate = true
        fireflyMat.opacity = 0.55 + Math.sin(clock * 1.8) * 0.25

        // Animate Embers
        const pArray = emberGeo.attributes.position.array as Float32Array
        for (let i = 0; i < emberCount; i++) {
          const idx = i * 3
          const vel = emberVelocities[i]
          pArray[idx + 1] += vel.y
          pArray[idx] += Math.sin(clock * vel.freq + i) * 0.006 + vel.x
          pArray[idx + 2] += Math.cos(clock * vel.freq * 0.8 + i) * 0.005

          if (pArray[idx + 1] > 18) {
            pArray[idx + 1] = -2
            pArray[idx] = (Math.random() - 0.5) * 28
            pArray[idx + 2] = (Math.random() - 0.5) * 36 - 6
          }
        }
        emberGeo.attributes.position.needsUpdate = true

        // Moon subtle breathing scale
        const moonScale = 1 + Math.sin(clock * 0.6) * 0.025
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

      // Deep geometry and material disposal
      moonGeo.dispose()
      moonMat.dispose()
      pillarGeo.dispose()
      bambooMat.dispose()
      charredWoodMat.dispose()
      lacqueredVermilionMat.dispose()
      goldOrnamentMat.dispose()
      jadeMossStoneMat.dispose()
      ropeGeo.dispose()
      ropeMat.dispose()
      waterGeo.dispose()
      waterMat.dispose()
      emberGeo.dispose()
      emberMat.dispose()
      fireflyGeo.dispose()
      fireflyMat.dispose()
      pTex.dispose()
      fTex.dispose()
      inkRonin.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
      aria-hidden="true"
    />
  )
}
