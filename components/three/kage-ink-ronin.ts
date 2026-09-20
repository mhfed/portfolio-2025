import * as THREE from 'three'

/**
 * Controller interface for the Cinematic Ink Ronin (Bóng kiếm sĩ nghệ thuật thủy mặc)
 */
export interface InkRoninController {
  group: THREE.Group
  update: (
    delta: number,
    clock: number,
    scrollProgress: number,
    mouseX?: number,
    mouseY?: number
  ) => void
  dispose: () => void
}

/**
 * Generates an ultra-high resolution Sumi-e (Thủy mặc) ink-wash silhouette texture
 * of a wandering Ronin / Swordsman with authentic Japanese brushstroke aesthetics.
 */
function createSumiETexture(): THREE.CanvasTexture {
  const width = 1024
  const height = 1536
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    return new THREE.CanvasTexture(canvas)
  }

  // Clear transparent
  ctx.clearRect(0, 0, width, height)

  // Sumi Ink Palette
  const inkDark = '#030508'
  const inkMid = 'rgba(5, 8, 14, 0.94)'
  const inkWash = 'rgba(10, 16, 24, 0.65)'

  // Helper for feathered brush strokes
  const applyBrushShadow = () => {
    ctx.shadowColor = 'rgba(2, 4, 7, 0.4)'
    ctx.shadowBlur = 8
    ctx.shadowOffsetX = 0
    ctx.shadowOffsetY = 0
  }

  // =========================================================================
  // 1. SCARF & CHINSTRAP RIBBONS (HIMO) FLUTTERING IN MOUNTAIN WIND
  // =========================================================================
  applyBrushShadow()
  ctx.fillStyle = inkDark

  // Long flowing trailing ribbon (wind whipping rightward)
  ctx.beginPath()
  ctx.moveTo(560, 340)
  ctx.bezierCurveTo(680, 345, 780, 390, 890, 370)
  ctx.quadraticCurveTo(860, 405, 760, 390)
  ctx.bezierCurveTo(670, 375, 590, 365, 550, 370)
  ctx.closePath()
  ctx.fill()

  // Secondary fluttering tail
  ctx.beginPath()
  ctx.moveTo(555, 365)
  ctx.bezierCurveTo(650, 410, 750, 440, 840, 425)
  ctx.quadraticCurveTo(800, 455, 720, 445)
  ctx.bezierCurveTo(640, 420, 580, 395, 545, 385)
  ctx.closePath()
  ctx.fill()

  // Tiny frayed ribbon tip particles
  ctx.beginPath()
  ctx.arc(898, 368, 2.5, 0, Math.PI * 2)
  ctx.arc(912, 366, 1.8, 0, Math.PI * 2)
  ctx.arc(848, 422, 2.0, 0, Math.PI * 2)
  ctx.fill()

  // =========================================================================
  // 2. KATANA SHEATH (SAYA) & SAGEO FLUTTERING CORDS
  // =========================================================================
  // Long curved Katana scabbard extending backwards to the left
  ctx.beginPath()
  ctx.moveTo(445, 605)
  ctx.bezierCurveTo(370, 720, 280, 890, 185, 1110)
  ctx.lineTo(195, 1125)
  ctx.bezierCurveTo(295, 905, 385, 735, 460, 615)
  ctx.closePath()
  ctx.fill()

  // Kojiri (scabbard tip)
  ctx.beginPath()
  ctx.arc(190, 1118, 7, 0, Math.PI * 2)
  ctx.fill()

  // Sageo cords floating from the scabbard kurigata
  ctx.beginPath()
  ctx.moveTo(410, 660)
  ctx.bezierCurveTo(370, 720, 340, 790, 310, 870)
  ctx.quadraticCurveTo(320, 880, 335, 850)
  ctx.bezierCurveTo(365, 780, 390, 715, 425, 670)
  ctx.closePath()
  ctx.fill()

  // =========================================================================
  // 3. FLOWING HAKAMA & HAORI ROBE (MAIN LOWER BODY)
  // =========================================================================
  // Wide martial silhouette with sweeping folds
  ctx.beginPath()
  ctx.moveTo(420, 620) // Waist left
  // Left drape billowing
  ctx.bezierCurveTo(380, 750, 330, 940, 290, 1180)
  ctx.bezierCurveTo(270, 1280, 280, 1370, 330, 1420)
  // Robe hem with organic tears & folds
  ctx.lineTo(390, 1410)
  ctx.lineTo(440, 1435)
  ctx.lineTo(510, 1420)
  ctx.lineTo(570, 1445)
  ctx.lineTo(640, 1425)
  ctx.lineTo(710, 1440)
  ctx.bezierCurveTo(760, 1420, 780, 1350, 770, 1240)
  // Right side flowing back into waist
  ctx.bezierCurveTo(760, 1020, 720, 820, 640, 630)
  ctx.closePath()
  ctx.fill()

  // Hakama pleats (Hida) shadow depth
  ctx.fillStyle = inkDark
  ctx.beginPath()
  ctx.moveTo(505, 660)
  ctx.bezierCurveTo(510, 850, 515, 1100, 520, 1425)
  ctx.lineTo(528, 1425)
  ctx.bezierCurveTo(523, 1100, 518, 850, 513, 660)
  ctx.closePath()
  ctx.fill()

  // Secondary fold lines
  ctx.beginPath()
  ctx.moveTo(455, 680)
  ctx.bezierCurveTo(450, 880, 440, 1120, 430, 1420)
  ctx.lineTo(437, 1420)
  ctx.bezierCurveTo(447, 1120, 457, 880, 462, 680)
  ctx.closePath()
  ctx.fill()

  ctx.beginPath()
  ctx.moveTo(585, 680)
  ctx.bezierCurveTo(595, 880, 615, 1120, 635, 1425)
  ctx.lineTo(642, 1425)
  ctx.bezierCurveTo(622, 1120, 602, 880, 592, 680)
  ctx.closePath()
  ctx.fill()

  // =========================================================================
  // 4. UPPER BODY, CHEST & BILLOWING SLEEVES (SODE)
  // =========================================================================
  ctx.fillStyle = inkDark

  // Wide right sleeve billowing in the wind behind
  ctx.beginPath()
  ctx.moveTo(630, 420)
  ctx.bezierCurveTo(720, 460, 760, 550, 740, 680)
  ctx.bezierCurveTo(710, 750, 660, 760, 620, 730)
  ctx.bezierCurveTo(600, 650, 610, 560, 580, 480)
  ctx.closePath()
  ctx.fill()

  // Left sleeve draped down near sword
  ctx.beginPath()
  ctx.moveTo(370, 440)
  ctx.bezierCurveTo(310, 500, 280, 600, 290, 750)
  ctx.bezierCurveTo(315, 810, 360, 790, 380, 730)
  ctx.bezierCurveTo(360, 640, 380, 550, 420, 490)
  ctx.closePath()
  ctx.fill()

  // Torso / Kimono overlapping lapels (Eri) & waist belt (Obi)
  ctx.beginPath()
  ctx.moveTo(430, 370)
  ctx.lineTo(600, 375)
  ctx.lineTo(640, 630)
  ctx.lineTo(410, 620)
  ctx.closePath()
  ctx.fill()

  // Obi sash tied knot depth
  ctx.fillStyle = inkMid
  ctx.beginPath()
  ctx.rect(430, 590, 180, 38)
  ctx.fill()

  // Hand resting on the Katana guard (Tsuba)
  ctx.fillStyle = inkDark
  ctx.beginPath()
  ctx.ellipse(452, 598, 16, 11, -0.35, 0, Math.PI * 2)
  ctx.fill()

  // Katana Tsuba (Guard) disc
  ctx.beginPath()
  ctx.ellipse(458, 595, 14, 22, -0.4, 0, Math.PI * 2)
  ctx.fill()

  // Katana Hilt (Tsuka) pointing up-forward
  ctx.beginPath()
  ctx.moveTo(462, 585)
  ctx.lineTo(518, 528)
  ctx.lineTo(528, 538)
  ctx.lineTo(472, 595)
  ctx.closePath()
  ctx.fill()

  // Pommel (Kashira)
  ctx.beginPath()
  ctx.arc(523, 533, 7, 0, Math.PI * 2)
  ctx.fill()

  // =========================================================================
  // 5. HEAD & WOVEN STRAW HAT (AJIRO-GASA / RONIN KASA)
  // =========================================================================
  // Head neck-wrap silhouette
  ctx.beginPath()
  ctx.moveTo(475, 335)
  ctx.lineTo(540, 335)
  ctx.lineTo(555, 385)
  ctx.lineTo(465, 380)
  ctx.closePath()
  ctx.fill()

  // Iconic Wide Sedge Hat (Tilted stoically downward to the left)
  ctx.beginPath()
  ctx.moveTo(250, 325) // Left rim tip
  ctx.bezierCurveTo(360, 280, 460, 225, 510, 205) // Cone apex
  ctx.bezierCurveTo(565, 230, 675, 285, 770, 305) // Right rim tip
  ctx.bezierCurveTo(680, 345, 530, 360, 400, 355) // Bottom brim curve
  ctx.bezierCurveTo(330, 350, 280, 338, 250, 325)
  ctx.closePath()
  ctx.fill()

  // Fine straw weave radial lines (subtle calligraphy relief)
  ctx.strokeStyle = 'rgba(20, 28, 38, 0.4)'
  ctx.lineWidth = 1.8
  for (let angle = 0; angle < 12; angle++) {
    const t = angle / 11
    const xBase = 265 + t * (755 - 265)
    const yBase = 325 - Math.sin(t * Math.PI) * 15 + (t > 0.5 ? -12 : 8)
    ctx.beginPath()
    ctx.moveTo(510, 205)
    ctx.lineTo(xBase, yBase)
    ctx.stroke()
  }

  // =========================================================================
  // 6. FEET IN STRAW SANDALS (WARAJI) EMERGING ON STEPS
  // =========================================================================
  ctx.fillStyle = inkDark

  // Front right foot
  ctx.beginPath()
  ctx.ellipse(480, 1435, 20, 9, 0.1, 0, Math.PI * 2)
  ctx.fill()

  // Back left foot
  ctx.beginPath()
  ctx.ellipse(585, 1415, 18, 8, -0.15, 0, Math.PI * 2)
  ctx.fill()

  // =========================================================================
  // 7. SUMI-E INK WASH FEATHERING & DRY-BRUSH BASE FADE
  // =========================================================================
  // Gentle ink wash bleed along edges
  ctx.fillStyle = inkWash
  ctx.beginPath()
  ctx.ellipse(512, 1445, 240, 28, 0, 0, Math.PI * 2)
  ctx.fill()

  // Vertical mask gradient to seamlessly fade the lower hem into sanctuary fog
  ctx.save()
  ctx.globalCompositeOperation = 'destination-out'
  const fadeGrad = ctx.createLinearGradient(0, 1320, 0, 1536)
  fadeGrad.addColorStop(0.0, 'rgba(0, 0, 0, 0)')
  fadeGrad.addColorStop(0.65, 'rgba(0, 0, 0, 0.45)')
  fadeGrad.addColorStop(1.0, 'rgba(0, 0, 0, 1.0)')
  ctx.fillStyle = fadeGrad
  ctx.fillRect(0, 1300, width, 236)
  ctx.restore()

  // Generate Three.js texture
  const texture = new THREE.CanvasTexture(canvas)
  texture.generateMipmaps = true
  texture.minFilter = THREE.LinearMipmapLinearFilter
  texture.magFilter = THREE.LinearFilter
  texture.needsUpdate = true

  return texture
}

/**
 * Creates a soft radial mist disc texture for anchoring the silhouette's feet
 */
function createMistDiscTexture(): THREE.CanvasTexture {
  const size = 512
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    return new THREE.CanvasTexture(canvas)
  }

  const grad = ctx.createRadialGradient(
    size / 2,
    size / 2,
    10,
    size / 2,
    size / 2,
    size / 2
  )
  grad.addColorStop(0.0, 'rgba(20, 35, 45, 0.65)')
  grad.addColorStop(0.35, 'rgba(14, 25, 34, 0.40)')
  grad.addColorStop(0.7, 'rgba(8, 16, 22, 0.15)')
  grad.addColorStop(1.0, 'rgba(0, 0, 0, 0)')

  ctx.fillStyle = grad
  ctx.fillRect(0, 0, size, size)

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

/**
 * Constructs the Complete Cinematic Ink Ronin Group with Custom Shader Material
 */
export function createInkRoninGroup(): InkRoninController {
  const group = new THREE.Group()
  group.name = 'InkRoninGroup'

  // Initial positioning: poised on the Kyoto temple stairs
  group.position.set(1.15, 0.42, 2.7)
  group.rotation.y = -0.28 // Angled toward the Torii gate and red moon

  const texture = createSumiETexture()
  const mistTexture = createMistDiscTexture()

  // Plane geometry with fine subdivisions for silky wind cloth deformation
  const planeWidth = 1.95
  const planeHeight = 2.92
  const geometry = new THREE.PlaneGeometry(planeWidth, planeHeight, 32, 48)

  // Custom Shader Material: Wind flutter + Ethereal Moon Rim + Katana Glint
  const material = new THREE.ShaderMaterial({
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
    uniforms: {
      uTexture: { value: texture },
      uTime: { value: 0 },
      uWindStrength: { value: 1.0 },
      uGlint: { value: 0 },
      uMoonColor: { value: new THREE.Color(0xe0231c) },
      uRimColor: { value: new THREE.Color(0x1fc7c7) },
      uOpacity: { value: 0.98 },
    },
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vWorldPos;
      uniform float uTime;
      uniform float uWindStrength;

      void main() {
        vUv = uv;
        vec3 pos = position;

        // Realistic cloth wind fluttering (strongest at bottom hem & scarf)
        // uv.y: 0.0 at bottom, 1.0 at top
        float windWeight = smoothstep(0.75, 0.05, uv.y);
        float wave1 = sin(uv.y * 7.5 + uTime * 2.6) * 0.038 * windWeight;
        float wave2 = cos(uv.y * 5.0 + uTime * 1.9) * 0.022 * windWeight;
        pos.x += (wave1 + wave2) * uWindStrength;
        pos.z += sin(uv.y * 9.0 + uTime * 3.1) * 0.018 * windWeight * uWindStrength;

        // Martial breathing rhythm (calm subtle chest lift)
        float breath = sin(uTime * 1.4) * 0.014;
        pos.y += breath;

        vec4 worldPos = modelMatrix * vec4(pos, 1.0);
        vWorldPos = worldPos.xyz;
        gl_Position = projectionMatrix * viewMatrix * worldPos;
      }
    `,
    fragmentShader: `
      varying vec2 vUv;
      varying vec3 vWorldPos;
      uniform sampler2D uTexture;
      uniform float uTime;
      uniform float uGlint;
      uniform vec3 uMoonColor;
      uniform vec3 uRimColor;
      uniform float uOpacity;

      void main() {
        vec4 tex = texture2D(uTexture, vUv);
        if (tex.a < 0.01) discard;

        // Silhouette edge detection for atmospheric backlighting
        vec2 off = vec2(0.0035, 0.0025);
        float aL = texture2D(uTexture, vUv - vec2(off.x, 0.0)).a;
        float aR = texture2D(uTexture, vUv + vec2(off.x, 0.0)).a;
        float aU = texture2D(uTexture, vUv + vec2(0.0, off.y)).a;
        float aD = texture2D(uTexture, vUv - vec2(0.0, off.y)).a;

        float edge = clamp((abs(aL - aR) + abs(aU - aD)) * 2.8, 0.0, 1.0);

        // Deep pure Sumi ink body
        vec3 inkBase = vec3(0.025, 0.035, 0.05);

        // Top/Right edge catches the crimson red moon light; lower edge catches cool cyan mist
        float moonFactor = smoothstep(0.25, 0.95, vUv.y);
        vec3 rimTint = mix(uRimColor, uMoonColor, moonFactor);

        // Subtle pulsing of rim light
        float rimPulse = 0.82 + sin(uTime * 1.6) * 0.18;
        vec3 finalColor = mix(inkBase, rimTint * 1.5, edge * 0.72 * rimPulse);

        // Katana Steel Glint: moonlight flashing on the sword guard / blade
        // Guard coordinates in UV space: approx (0.448, 0.612)
        vec2 glintUv = vec2(0.448, 0.612);
        float d = distance(vUv, glintUv);
        if (d < 0.075 && uGlint > 0.02) {
          vec2 delta = abs(vUv - glintUv);
          // 4-point star anime gleam
          float star = (1.0 / (delta.x * 90.0 + 1.0)) * (1.0 / (delta.y * 90.0 + 1.0));
          float core = smoothstep(0.016, 0.001, d) * 1.6;
          float flash = (star * 0.9 + core) * uGlint;
          finalColor += vec3(1.0, 0.96, 0.92) * flash;
        }

        // Soft vertical mist fade at the very base
        float bottomFade = smoothstep(0.015, 0.16, vUv.y);
        float alpha = tex.a * uOpacity * bottomFade;

        gl_FragColor = vec4(finalColor, alpha);
      }
    `,
  })

  const roninMesh = new THREE.Mesh(geometry, material)
  roninMesh.position.y = planeHeight / 2 - 0.15 // Align feet with ground plane
  group.add(roninMesh)

  // Ground mist disc underneath feet to blend into the stone steps
  const mistGeo = new THREE.PlaneGeometry(2.4, 2.4)
  const mistMat = new THREE.MeshBasicMaterial({
    map: mistTexture,
    transparent: true,
    opacity: 0.75,
    depthWrite: false,
    blending: THREE.NormalBlending,
  })
  const mistMesh = new THREE.Mesh(mistGeo, mistMat)
  mistMesh.rotation.x = -Math.PI / 2
  mistMesh.position.set(0, 0.02, 0)
  group.add(mistMesh)

  // Update loop
  const update = (
    delta: number,
    clock: number,
    scrollProgress: number,
    mouseX?: number,
    mouseY?: number
  ) => {
    material.uniforms.uTime.value = clock

    // Katana glint periodicity: flashes every 3.8 seconds for 0.35 seconds
    const cycle = (clock * 0.26) % 1.0
    let glintVal = 0
    if (cycle < 0.09) {
      glintVal = Math.sin((cycle / 0.09) * Math.PI)
    }
    material.uniforms.uGlint.value = glintVal

    // Ground mist gentle rotation
    mistMesh.rotation.z += delta * 0.08
    mistMat.opacity = 0.65 + Math.sin(clock * 1.5) * 0.15

    // Scroll-driven progression: Ronin ascends the stairs towards the Torii gate!
    const maxSteps = 10
    const scrollStepProgress = scrollProgress * maxSteps
    const baseStep = Math.min(Math.floor(scrollStepProgress), maxSteps - 1)
    const stepFraction = scrollStepProgress - baseStep

    const stepHop = Math.sin(stepFraction * Math.PI) * 0.22
    const currentStepI = baseStep + stepFraction

    // Ascent coordinates along the sanctuary stairway
    const targetZ = 2.7 - currentStepI * 1.15
    const targetY = currentStepI * 0.22 + 0.38 + stepHop
    const targetX = 1.15 - (currentStepI / maxSteps) * 1.05 + Math.sin(clock * 1.2) * 0.04

    group.position.set(targetX, targetY, targetZ)

    // Interactive mouse gaze
    if (mouseX !== undefined && mouseY !== undefined) {
      group.rotation.y = -0.28 + mouseX * 0.12
      group.rotation.x = -mouseY * 0.05
    }
  }

  const dispose = () => {
    geometry.dispose()
    material.dispose()
    texture.dispose()
    mistGeo.dispose()
    mistMat.dispose()
    mistTexture.dispose()
  }

  return { group, update, dispose }
}
