import * as THREE from 'three'

/**
 * Controller interface for the Cinematic Ink Ronin (Bóng kiếm sĩ nghệ thuật thủy mặc)
 */
export interface InkRoninController {
  group: THREE.Group
  slashIntensity: number
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
 * of a wandering Ronin in dynamic martial iaido readiness.
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
  // 2. KATANA SCABBARD (SAYA) AT HIP & SAGEO CORDS
  // =========================================================================
  // Curved lacquer scabbard mounted at waist ready for Iai draw
  ctx.beginPath()
  ctx.moveTo(435, 605)
  ctx.bezierCurveTo(360, 720, 270, 890, 180, 1115)
  ctx.lineTo(190, 1128)
  ctx.bezierCurveTo(285, 905, 375, 735, 450, 615)
  ctx.closePath()
  ctx.fill()

  // Kojiri (scabbard tip)
  ctx.beginPath()
  ctx.arc(185, 1122, 6.5, 0, Math.PI * 2)
  ctx.fill()

  // Sageo cords floating from the scabbard kurigata
  ctx.beginPath()
  ctx.moveTo(405, 660)
  ctx.bezierCurveTo(365, 720, 335, 790, 305, 870)
  ctx.quadraticCurveTo(315, 880, 330, 850)
  ctx.bezierCurveTo(360, 780, 385, 715, 420, 670)
  ctx.closePath()
  ctx.fill()

  // =========================================================================
  // 3. FLOWING HAKAMA & HAORI ROBE (MAIN LOWER BODY)
  // =========================================================================
  // Wide martial silhouette with sweeping folds
  ctx.beginPath()
  ctx.moveTo(410, 620) // Waist left
  ctx.bezierCurveTo(375, 750, 325, 940, 285, 1180)
  ctx.bezierCurveTo(265, 1280, 275, 1370, 325, 1420)
  // Robe hem with organic tears & folds
  ctx.lineTo(385, 1410)
  ctx.lineTo(435, 1435)
  ctx.lineTo(505, 1420)
  ctx.lineTo(565, 1445)
  ctx.lineTo(635, 1425)
  ctx.lineTo(705, 1440)
  ctx.bezierCurveTo(755, 1420, 775, 1350, 765, 1240)
  // Right side flowing back into waist
  ctx.bezierCurveTo(755, 1020, 715, 820, 635, 630)
  ctx.closePath()
  ctx.fill()

  // Hakama pleats (Hida) shadow depth
  ctx.fillStyle = inkDark
  ctx.beginPath()
  ctx.moveTo(500, 660)
  ctx.bezierCurveTo(505, 850, 510, 1100, 515, 1425)
  ctx.lineTo(523, 1425)
  ctx.bezierCurveTo(518, 1100, 513, 850, 508, 660)
  ctx.closePath()
  ctx.fill()

  // Secondary fold lines
  ctx.beginPath()
  ctx.moveTo(450, 680)
  ctx.bezierCurveTo(445, 880, 435, 1120, 425, 1420)
  ctx.lineTo(432, 1420)
  ctx.bezierCurveTo(442, 1120, 452, 880, 457, 680)
  ctx.closePath()
  ctx.fill()

  ctx.beginPath()
  ctx.moveTo(580, 680)
  ctx.bezierCurveTo(590, 880, 610, 1120, 630, 1425)
  ctx.lineTo(637, 1425)
  ctx.bezierCurveTo(617, 1120, 597, 880, 587, 680)
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

  // Left hand resting poised on the scabbard mouth (Koiguchi)
  ctx.fillStyle = inkDark
  ctx.beginPath()
  ctx.ellipse(442, 598, 15, 10, -0.35, 0, Math.PI * 2)
  ctx.fill()

  // Right hand poised in ready martial stance near chest
  ctx.beginPath()
  ctx.ellipse(540, 530, 14, 9, 0.25, 0, Math.PI * 2)
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
  ctx.moveTo(250, 325)
  ctx.bezierCurveTo(360, 280, 460, 225, 510, 205)
  ctx.bezierCurveTo(565, 230, 675, 285, 770, 305)
  ctx.bezierCurveTo(680, 345, 530, 360, 400, 355)
  ctx.bezierCurveTo(330, 350, 280, 338, 250, 325)
  ctx.closePath()
  ctx.fill()

  // Fine straw weave radial lines
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
  ctx.beginPath()
  ctx.ellipse(480, 1435, 20, 9, 0.1, 0, Math.PI * 2)
  ctx.fill()

  ctx.beginPath()
  ctx.ellipse(585, 1415, 18, 8, -0.15, 0, Math.PI * 2)
  ctx.fill()

  // =========================================================================
  // 7. SUMI-E INK WASH FEATHERING & DRY-BRUSH BASE FADE
  // =========================================================================
  ctx.fillStyle = inkWash
  ctx.beginPath()
  ctx.ellipse(512, 1445, 240, 28, 0, 0, Math.PI * 2)
  ctx.fill()

  ctx.save()
  ctx.globalCompositeOperation = 'destination-out'
  const fadeGrad = ctx.createLinearGradient(0, 1320, 0, 1536)
  fadeGrad.addColorStop(0.0, 'rgba(0, 0, 0, 0)')
  fadeGrad.addColorStop(0.65, 'rgba(0, 0, 0, 0.45)')
  fadeGrad.addColorStop(1.0, 'rgba(0, 0, 0, 1.0)')
  ctx.fillStyle = fadeGrad
  ctx.fillRect(0, 1300, width, 236)
  ctx.restore()

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
 * Creates a glowing circular spark texture for sword ki sparks
 */
function createSparkTexture(): THREE.CanvasTexture {
  const size = 64
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    return new THREE.CanvasTexture(canvas)
  }

  const grad = ctx.createRadialGradient(32, 32, 2, 32, 32, 32)
  grad.addColorStop(0, 'rgba(255, 255, 255, 1.0)')
  grad.addColorStop(0.25, 'rgba(255, 220, 160, 0.95)')
  grad.addColorStop(0.6, 'rgba(255, 70, 30, 0.45)')
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)')

  ctx.fillStyle = grad
  ctx.fillRect(0, 0, size, size)

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

/**
 * Constructs a physically accurate, curved 3D Katana blade with hamon steel,
 * golden tsuba, and braided tsuka.
 */
function create3DKatanaMesh(): {
  katanaGroup: THREE.Group
  bladeMaterial: THREE.MeshStandardMaterial
} {
  const katanaGroup = new THREE.Group()

  // 1. Curved Katana Blade (Steel geometry with subtle curvature)
  const bladeShape = new THREE.Shape()
  bladeShape.moveTo(0, 0)
  bladeShape.lineTo(0.03, 0)
  bladeShape.lineTo(0.024, 0.88)
  bladeShape.lineTo(0.004, 0.95) // Kissaki sharp tip
  bladeShape.lineTo(-0.002, 0.94)
  bladeShape.lineTo(0, 0)

  const extrudeSettings: THREE.ExtrudeGeometryOptions = {
    depth: 0.006,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 1,
    bevelSize: 0.002,
    bevelThickness: 0.002,
  }

  const bladeGeo = new THREE.ExtrudeGeometry(bladeShape, extrudeSettings)
  // Apply authentic Japanese katana curve (sori)
  const posAttr = bladeGeo.attributes.position as THREE.BufferAttribute
  for (let i = 0; i < posAttr.count; i++) {
    const y = posAttr.getY(i)
    const curve = Math.pow(y / 0.95, 1.8) * 0.052
    posAttr.setZ(i, posAttr.getZ(i) - curve)
  }
  bladeGeo.computeVertexNormals()

  const bladeMaterial = new THREE.MeshStandardMaterial({
    color: 0xf5f8fb,
    emissive: 0xffffff,
    emissiveIntensity: 0.25,
    metalness: 0.96,
    roughness: 0.12,
  })
  const bladeMesh = new THREE.Mesh(bladeGeo, bladeMaterial)
  bladeMesh.castShadow = true
  katanaGroup.add(bladeMesh)

  // 2. Gold Blade Collar (Habaki)
  const habakiGeo = new THREE.BoxGeometry(0.036, 0.045, 0.016)
  const goldMaterial = new THREE.MeshStandardMaterial({
    color: 0xe8b84b,
    metalness: 0.85,
    roughness: 0.25,
  })
  const habakiMesh = new THREE.Mesh(habakiGeo, goldMaterial)
  habakiMesh.position.set(0.015, 0.022, 0)
  katanaGroup.add(habakiMesh)

  // 3. Antique Oval Sword Guard (Tsuba)
  const tsubaGeo = new THREE.CylinderGeometry(0.062, 0.062, 0.008, 20)
  tsubaGeo.scale(1, 1, 0.78)
  const tsubaMesh = new THREE.Mesh(tsubaGeo, goldMaterial)
  tsubaMesh.rotation.z = Math.PI / 2
  tsubaMesh.position.set(0.015, -0.004, 0)
  katanaGroup.add(tsubaMesh)

  // 4. Braided Ray-skin Hilt (Tsuka)
  const tsukaGeo = new THREE.CylinderGeometry(0.015, 0.018, 0.28, 12)
  const tsukaMat = new THREE.MeshStandardMaterial({
    color: 0x070b10,
    metalness: 0.3,
    roughness: 0.8,
  })
  const tsukaMesh = new THREE.Mesh(tsukaGeo, tsukaMat)
  tsukaMesh.position.set(0.015, -0.145, 0)
  katanaGroup.add(tsukaMesh)

  // 5. Pommel Cap (Kashira)
  const kashiraGeo = new THREE.SphereGeometry(0.019, 12, 12)
  const kashiraMesh = new THREE.Mesh(kashiraGeo, goldMaterial)
  kashiraMesh.position.set(0.015, -0.285, 0)
  katanaGroup.add(kashiraMesh)

  return { katanaGroup, bladeMaterial }
}

/**
 * Builds a dynamic swept crescent sword slash geometry matching an authentic
 * directional martial strike trajectory (NOT a spinning ring).
 */
function createCrescentSlashGeometry(
  radius: number = 1.45,
  maxWidth: number = 0.58,
  arcAngle: number = Math.PI * 0.98,
  tiltY: number = -0.38,
  tiltZ: number = 0.32
): THREE.BufferGeometry {
  const segments = 64
  const vertexCount = (segments + 1) * 2
  const positions = new Float32Array(vertexCount * 3)
  const uvs = new Float32Array(vertexCount * 2)
  const indices: number[] = []

  const startAngle = -arcAngle * 0.55
  const endAngle = arcAngle * 0.45

  for (let i = 0; i <= segments; i++) {
    const t = i / segments
    const angle = startAngle + t * (endAngle - startAngle)

    // Dynamic blade crescent envelope: sharp start, swelling belly, razor tip
    const envelope = Math.sin(t * Math.PI)
    const currentWidth = maxWidth * Math.pow(envelope, 0.75)

    const rInner = radius - currentWidth * 0.45
    const rOuter = radius + currentWidth * 0.55

    // Realistic volumetric arc swoop in 3D
    const yOffset = (t - 0.5) * tiltY
    const zOffset = Math.sin(t * Math.PI) * tiltZ

    const cosA = Math.cos(angle)
    const sinA = Math.sin(angle)

    // Inner vertex
    const iIdx = i * 2
    positions[iIdx * 3] = rInner * cosA
    positions[iIdx * 3 + 1] = yOffset
    positions[iIdx * 3 + 2] = rInner * sinA + zOffset

    uvs[iIdx * 2] = t
    uvs[iIdx * 2 + 1] = 0.0

    // Outer vertex (razor cutting edge)
    const oIdx = i * 2 + 1
    positions[oIdx * 3] = rOuter * cosA
    positions[oIdx * 3 + 1] = yOffset
    positions[oIdx * 3 + 2] = rOuter * sinA + zOffset

    uvs[oIdx * 2] = t
    uvs[oIdx * 2 + 1] = 1.0

    if (i < segments) {
      const v0 = iIdx
      const v1 = oIdx
      const v2 = (i + 1) * 2
      const v3 = (i + 1) * 2 + 1

      indices.push(v0, v1, v2)
      indices.push(v1, v3, v2)
    }
  }

  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geo.setAttribute('uv', new THREE.BufferAttribute(uvs, 2))
  geo.setIndex(indices)
  geo.computeVertexNormals()
  return geo
}

/**
 * Creates an authentic directional calligraphy slash shader material.
 */
function createSlashShaderMaterial(
  colorCore: THREE.Color,
  colorFlame: THREE.Color,
  colorCyan: THREE.Color
): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    transparent: true,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    uniforms: {
      uTime: { value: 0 },
      uSlashHead: { value: 0 },
      uSlashTail: { value: 0 },
      uIntensity: { value: 0 },
      uColorCore: { value: colorCore },
      uColorFlame: { value: colorFlame },
      uColorCyan: { value: colorCyan },
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
      uniform float uTime;
      uniform float uSlashHead;
      uniform float uSlashTail;
      uniform float uIntensity;
      uniform vec3 uColorCore;
      uniform vec3 uColorFlame;
      uniform vec3 uColorCyan;

      void main() {
        // Discard fragments outside active cutting stroke interval
        if (vUv.x > uSlashHead || vUv.x < uSlashTail || uIntensity < 0.01) discard;

        float strokeLen = max(uSlashHead - uSlashTail, 0.001);
        float localU = (vUv.x - uSlashTail) / strokeLen; // 1.0 at blade edge, 0.0 at oldest tail

        // Tapered razor cutting tip and fading ink tail
        float tipEdge = smoothstep(0.0, 0.12, localU);
        float tailFade = smoothstep(0.0, 0.45, localU);

        // Razor cutting line along the outer rim (vUv.y -> 1.0)
        float razorLine = smoothstep(0.70, 0.98, vUv.y);
        float coreBand = smoothstep(0.16, 0.01, abs(vUv.y - 0.84));
        float innerGlow = smoothstep(0.0, 0.85, vUv.y);

        // Sumi-e dry-brush striations (Feihaku brush stroke texture)
        float brushTexture = 0.84 + sin(vUv.x * 48.0 + vUv.y * 14.0) * 0.16;
        brushTexture *= 0.88 + sin(vUv.y * 70.0 - uTime * 18.0) * 0.12;

        // Dynamic electric gradient: white steel core, vermilion aura, and cyan spirit edge
        vec3 aura = mix(uColorCyan, uColorFlame, localU * 0.85 + 0.15);
        vec3 color = mix(aura, uColorCore, razorLine * 0.85 + coreBand * 1.25);

        float alpha = (razorLine * 2.2 + coreBand * 2.6 + innerGlow * 0.7)
                      * tailFade * tipEdge * brushTexture * uIntensity;
        if (alpha < 0.004) discard;

        gl_FragColor = vec4(color * (2.4 + uIntensity * 2.8), alpha);
      }
    `,
  })
}

/**
 * Constructs the Complete Cinematic Ink Ronin with Articulated 3D Katana,
 * Directional Calligraphy Sword Strikes, and Acrobatic Martial Flight.
 */
export function createInkRoninGroup(): InkRoninController {
  const group = new THREE.Group()
  group.name = 'InkRoninGroup'

  // Initial positioning: poised on the Kyoto temple stairs
  group.position.set(1.15, 0.42, 2.7)
  group.rotation.y = -0.28 // Angled toward the Torii gate and red moon

  const texture = createSumiETexture()
  const mistTexture = createMistDiscTexture()
  const sparkTexture = createSparkTexture()

  // 1. Plane geometry for the Sumi-e Ronin body silhouette
  const planeWidth = 1.95
  const planeHeight = 2.92
  const geometry = new THREE.PlaneGeometry(planeWidth, planeHeight, 32, 48)

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
        float windWeight = smoothstep(0.75, 0.05, uv.y);
        float wave1 = sin(uv.y * 7.5 + uTime * 3.2) * 0.045 * windWeight;
        float wave2 = cos(uv.y * 5.0 + uTime * 2.4) * 0.026 * windWeight;
        pos.x += (wave1 + wave2) * uWindStrength;
        pos.z += sin(uv.y * 9.0 + uTime * 3.8) * 0.022 * windWeight * uWindStrength;

        // Martial breathing rhythm
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

        // Edge catches crimson red moon light and cool cyan mist
        float moonFactor = smoothstep(0.25, 0.95, vUv.y);
        vec3 rimTint = mix(uRimColor, uMoonColor, moonFactor);

        float rimPulse = 0.82 + sin(uTime * 1.6) * 0.18;
        vec3 finalColor = mix(inkBase, rimTint * 1.5, edge * 0.72 * rimPulse);

        // Katana Steel Glint flash on the sword guard
        vec2 glintUv = vec2(0.448, 0.612);
        float d = distance(vUv, glintUv);
        if (d < 0.085 && uGlint > 0.01) {
          vec2 delta = abs(vUv - glintUv);
          float star = (1.0 / (delta.x * 80.0 + 1.0)) * (1.0 / (delta.y * 80.0 + 1.0));
          float core = smoothstep(0.02, 0.001, d) * 1.8;
          float flash = (star * 1.1 + core) * uGlint;
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
  roninMesh.position.y = planeHeight / 2 - 0.15
  group.add(roninMesh)

  // 2. Ground mist disc underneath feet
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

  // =========================================================================
  // 3. ARTICULATED 3D KATANA BLADE WITH PHYSICAL MOTION RIG
  // =========================================================================
  const { katanaGroup, bladeMaterial } = create3DKatanaMesh()
  // Parent inside a pivot group anchored at the sword-drawing hip/shoulder
  const swordPivot = new THREE.Group()
  swordPivot.position.set(0.12, 1.45, 0.12)
  swordPivot.add(katanaGroup)
  group.add(swordPivot)

  // Initial rest pose: katana sheathed at hip
  katanaGroup.position.set(0, 0, 0)
  katanaGroup.rotation.set(-0.35, 0.25, -1.95)

  // =========================================================================
  // 4. AUTHENTIC DIRECTIONAL CALLIGRAPHY SWORD SLASH ARCS (NOT RINGS)
  // =========================================================================
  const colCore = new THREE.Color(0xffffff)
  const colFlame = new THREE.Color(0xff3b20)
  const colCyan = new THREE.Color(0x0df0d0)

  // Kata 1: Horizontal/Diagonal Iaijutsu Flash Slash (Trảm ngang)
  const slashGeo1 = createCrescentSlashGeometry(1.48, 0.62, Math.PI * 1.05, -0.42, 0.35)
  const slashMat1 = createSlashShaderMaterial(colCore, colFlame, colCyan)
  const slashMesh1 = new THREE.Mesh(slashGeo1, slashMat1)
  slashMesh1.position.set(0.25, 1.48, 0.22)
  slashMesh1.rotation.set(0.28, 0.15, -0.32)
  group.add(slashMesh1)

  // Kata 2: Upward Dragon Rising Cross-Slash (Phi thiên nghịch trảm)
  const slashGeo2 = createCrescentSlashGeometry(1.35, 0.52, Math.PI * 0.95, 0.48, -0.28)
  const slashMat2 = createSlashShaderMaterial(colCore, colCyan, colFlame)
  const slashMesh2 = new THREE.Mesh(slashGeo2, slashMat2)
  slashMesh2.position.set(0.18, 1.55, 0.18)
  slashMesh2.rotation.set(-0.45, -0.22, 0.85)
  group.add(slashMesh2)

  // Shockwave Ring: Expands from sword impact center
  const shockwaveGeo = new THREE.RingGeometry(0.2, 0.38, 36)
  const shockwaveMat = new THREE.MeshBasicMaterial({
    color: 0xff4422,
    transparent: true,
    opacity: 0,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  })
  const shockwaveMesh = new THREE.Mesh(shockwaveGeo, shockwaveMat)
  shockwaveMesh.position.set(0.25, 1.45, 0.35)
  group.add(shockwaveMesh)

  // Dynamic sword gleam point light
  const swordGleamLight = new THREE.PointLight(0xff3b20, 0.2, 8.5, 1.8)
  swordGleamLight.position.set(0.45, 1.5, 0.35)
  group.add(swordGleamLight)

  // =========================================================================
  // 5. SWORD KI SPARKS PARTICLE SYSTEM (HỎA HOA KIẾM KHÍ)
  // =========================================================================
  const sparkCount = 42
  const sparkGeo = new THREE.BufferGeometry()
  const sparkPositions = new Float32Array(sparkCount * 3)
  const sparkColors = new Float32Array(sparkCount * 3)
  const sparkData: {
    vx: number
    vy: number
    vz: number
    life: number
    maxLife: number
  }[] = []

  const colWhite = new THREE.Color(0xffffff)
  const colGold = new THREE.Color(0xffaa22)

  for (let i = 0; i < sparkCount; i++) {
    const idx = i * 3
    sparkPositions[idx] = 0.25
    sparkPositions[idx + 1] = 1.45
    sparkPositions[idx + 2] = 0.25

    const tint = i % 3 === 0 ? colWhite : i % 3 === 1 ? colCyan : colGold
    sparkColors[idx] = tint.r
    sparkColors[idx + 1] = tint.g
    sparkColors[idx + 2] = tint.b

    sparkData.push({
      vx: (Math.random() - 0.5) * 4.5,
      vy: Math.random() * 3.5 - 0.5,
      vz: (Math.random() - 0.5) * 4.5,
      life: Math.random(),
      maxLife: 0.6 + Math.random() * 0.6,
    })
  }

  sparkGeo.setAttribute('position', new THREE.BufferAttribute(sparkPositions, 3))
  sparkGeo.setAttribute('color', new THREE.BufferAttribute(sparkColors, 3))

  const sparkMat = new THREE.PointsMaterial({
    size: 0.24,
    map: sparkTexture,
    transparent: true,
    opacity: 0.85,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
  })
  const sparksMesh = new THREE.Points(sparkGeo, sparkMat)
  group.add(sparksMesh)

  // =========================================================================
  // MARTIAL KATA STATE MACHINE & ANIMATION RIG
  // =========================================================================
  let prevScrollProgress = 0
  let slashEnergy = 0
  let activeKata = 0 // 0: Horizontal Iai, 1: Rising Dragon
  let kataTimer = 0
  let shockwaveProgress = 1.0

  const controller: InkRoninController = {
    group,
    slashIntensity: 0,
    update: (
      delta: number,
      clock: number,
      scrollProgress: number,
      mouseX?: number,
      mouseY?: number
    ) => {
      material.uniforms.uTime.value = clock
      slashMat1.uniforms.uTime.value = clock
      slashMat2.uniforms.uTime.value = clock

      // Calculate instantaneous scroll velocity
      const instantVelocity = Math.abs(scrollProgress - prevScrollProgress)
      prevScrollProgress = scrollProgress

      // Smoothly charge up slash energy during scrolling with rapid attack and silky decay
      const isActivelyScrolling = instantVelocity > 0.0004
      const targetEnergy = isActivelyScrolling
        ? Math.min(instantVelocity * 75.0, 1.0)
        : 0.0

      const chargeRate = targetEnergy > slashEnergy ? 0.38 : 0.06
      slashEnergy += (targetEnergy - slashEnergy) * chargeRate
      controller.slashIntensity = slashEnergy

      // Advance kata cycle when active
      if (slashEnergy > 0.08) {
        kataTimer += delta * (4.2 + slashEnergy * 6.5)
        // Switch between horizontal and rising strikes as the user continues scrolling
        const currentCycle = Math.floor(kataTimer / Math.PI)
        activeKata = currentCycle % 2
      } else {
        // Smoothly settle kata timer to completion (Zanshin & Noto)
        kataTimer += delta * 1.5
      }

      const strikePhase = kataTimer % Math.PI // 0 to PI
      const strikeNorm = strikePhase / Math.PI // 0.0 to 1.0

      // Trigger shockwave at strike impact apex
      if (strikeNorm > 0.45 && strikeNorm < 0.55 && slashEnergy > 0.25 && shockwaveProgress >= 1.0) {
        shockwaveProgress = 0.0
      }

      // =======================================================================
      // 1. DIRECTIONAL SWORD SLASH RIBBON CHOREOGRAPHY
      // =======================================================================
      // Head and tail of the slash arc move physically with the blade
      // Rapid extension (0 -> 1) during swing, then trailing tail catches up
      let slashHead: number
      let slashTail: number
      if (strikeNorm < 0.65) {
        // Cutting phase: leading edge sweeps forward rapidly
        slashHead = Math.min(strikeNorm * 1.6, 1.0)
        slashTail = Math.max(0.0, slashHead - 0.52)
      } else {
        // Dissolving phase: tail catches up, arc fades into ink mist
        const diss = (strikeNorm - 0.65) / 0.35
        slashHead = 1.0
        slashTail = Math.min(0.48 + diss * 0.52, 1.0)
      }

      const strikeIntensity = Math.pow(Math.sin(strikeNorm * Math.PI), 0.7) * slashEnergy

      if (activeKata === 0) {
        // Kata 1: Horizontal / Diagonal Iaijutsu Slash Active
        slashMat1.uniforms.uSlashHead.value = slashHead
        slashMat1.uniforms.uSlashTail.value = slashTail
        slashMat1.uniforms.uIntensity.value = strikeIntensity * 1.4

        slashMat2.uniforms.uIntensity.value = 0.0
      } else {
        // Kata 2: Rising Dragon Slash Active
        slashMat2.uniforms.uSlashHead.value = slashHead
        slashMat2.uniforms.uSlashTail.value = slashTail
        slashMat2.uniforms.uIntensity.value = strikeIntensity * 1.4

        slashMat1.uniforms.uIntensity.value = 0.0
      }

      // =======================================================================
      // 2. ARTICULATED 3D KATANA MOTION RIG (PHYSICAL DRAW, STRIKE & SHEATHE)
      // =======================================================================
      if (slashEnergy > 0.05) {
        // Unsheathe and swing blade in 3D
        bladeMaterial.emissiveIntensity = 0.35 + strikeIntensity * 2.5

        if (activeKata === 0) {
          // Horizontal draw & cut across chest
          const swingAngle = -1.2 + strikeNorm * 2.8
          katanaGroup.position.set(
            0.15 + Math.cos(swingAngle) * 0.35,
            0.05 + Math.sin(strikeNorm * Math.PI) * 0.18,
            0.25 + Math.sin(swingAngle) * 0.35
          )
          katanaGroup.rotation.set(
            0.45 + Math.sin(strikeNorm * Math.PI) * 0.35,
            swingAngle - 0.35,
            -0.65 + Math.cos(strikeNorm * Math.PI) * 0.85
          )
        } else {
          // Rising diagonal dragon uppercut
          const riseAngle = -0.8 + strikeNorm * 2.5
          katanaGroup.position.set(
            0.18 - Math.sin(strikeNorm * Math.PI) * 0.25,
            0.15 + strikeNorm * 0.45,
            0.28 + Math.cos(riseAngle) * 0.28
          )
          katanaGroup.rotation.set(
            -0.85 + strikeNorm * 1.6,
            0.35 + Math.sin(riseAngle) * 0.45,
            0.75 - strikeNorm * 1.4
          )
        }
      } else {
        // Settle smoothly into sheathed position at hip (Noto)
        katanaGroup.position.lerp(new THREE.Vector3(0, 0, 0), 0.1)
        katanaGroup.rotation.x = THREE.MathUtils.lerp(katanaGroup.rotation.x, -0.35, 0.1)
        katanaGroup.rotation.y = THREE.MathUtils.lerp(katanaGroup.rotation.y, 0.25, 0.1)
        katanaGroup.rotation.z = THREE.MathUtils.lerp(katanaGroup.rotation.z, -1.95, 0.1)
        bladeMaterial.emissiveIntensity = 0.25
      }

      // =======================================================================
      // 3. SHOCKWAVE EXPANSION & BLADE GLEAM LIGHT
      // =======================================================================
      if (shockwaveProgress < 1.0) {
        shockwaveProgress += delta * 2.8
        const sScale = 0.4 + shockwaveProgress * 3.2
        shockwaveMesh.scale.set(sScale, sScale, sScale)
        shockwaveMat.opacity = (1.0 - shockwaveProgress) * 0.75 * slashEnergy
      } else {
        shockwaveMat.opacity = 0.0
      }

      // Blade flash light illuminates the surroundings during cuts
      const gleamPulse = strikeIntensity * (5.5 + Math.sin(clock * 18.0) * 1.5)
      swordGleamLight.intensity = 0.2 + gleamPulse

      if (activeKata === 0) {
        swordGleamLight.color.setHex(0xff3b20) // Vermilion fire
      } else {
        swordGleamLight.color.setHex(0x0df0d0) // Cyan ki
      }

      // =======================================================================
      // 4. SWORD SPARKS ORBITAL DYNAMICS (BURSTING ON STRIKES)
      // =======================================================================
      const sPos = sparkGeo.attributes.position.array as Float32Array
      for (let i = 0; i < sparkCount; i++) {
        const idx = i * 3
        const dat = sparkData[i]

        dat.life += delta * (1.2 + slashEnergy * 2.8)
        if (dat.life > dat.maxLife) {
          dat.life = 0
          // Respawn at current sword blade position
          sPos[idx] = katanaGroup.position.x + 0.1 + (Math.random() - 0.5) * 0.2
          sPos[idx + 1] = katanaGroup.position.y + 1.45 + (Math.random() - 0.5) * 0.25
          sPos[idx + 2] = katanaGroup.position.z + 0.25 + (Math.random() - 0.5) * 0.2

          const burstSpeed = 2.5 + slashEnergy * 5.5
          dat.vx = (Math.random() - 0.5) * burstSpeed
          dat.vy = (Math.random() - 0.2) * burstSpeed
          dat.vz = (Math.random() - 0.5) * burstSpeed
        } else {
          sPos[idx] += dat.vx * delta
          sPos[idx + 1] += dat.vy * delta - 1.8 * delta // Gravity
          sPos[idx + 2] += dat.vz * delta
        }
      }
      sparkGeo.attributes.position.needsUpdate = true
      sparkMat.opacity = 0.3 + slashEnergy * 0.7

      // =======================================================================
      // 5. ACROBATIC LEAPING & MARTIAL ASCENT (BAY NHẢY KHINH CÔNG)
      // =======================================================================
      const maxSteps = 10
      const scrollStepProgress = scrollProgress * maxSteps
      const baseStep = Math.min(Math.floor(scrollStepProgress), maxSteps - 1)
      const stepFraction = scrollStepProgress - baseStep

      // Parabolic leaping flight trajectory (high agile jumps up to 1.85m)
      const flightApex = Math.sin(stepFraction * Math.PI)
      const highLeap = Math.pow(flightApex, 0.75) * (0.32 + slashEnergy * 1.55)

      const currentStepI = baseStep + stepFraction

      // Lateral martial arts weave & evasive dash across the stairway
      const lateralDash =
        Math.sin(currentStepI * Math.PI * 1.6 + clock * 2.2) *
        (0.48 * slashEnergy)

      const targetZ = 2.7 - currentStepI * 1.15
      const targetY = currentStepI * 0.22 + 0.38 + highLeap
      const targetX = 1.15 - (currentStepI / maxSteps) * 1.05 + lateralDash

      group.position.set(targetX, targetY, targetZ)

      // Aerobatic pitch & banking during leaps
      const forwardPitch = -0.32 * slashEnergy * flightApex
      const bankRoll = Math.cos(currentStepI * Math.PI * 1.8) * (0.2 * slashEnergy)

      group.rotation.y =
        -0.28 +
        (mouseX ?? 0) * 0.12 +
        Math.sin(clock * 3.2) * (0.1 * slashEnergy)
      group.rotation.x = -(mouseY ?? 0) * 0.05 + forwardPitch
      group.rotation.z = bankRoll

      // Squash and stretch during take-off, apex flight, and landing
      if (flightApex > 0.45 && slashEnergy > 0.1) {
        roninMesh.scale.set(0.94, 1.10, 1.0)
      } else if (flightApex < 0.15 && slashEnergy > 0.1) {
        roninMesh.scale.set(1.06, 0.92, 1.0)
      } else {
        roninMesh.scale.set(1.0, 1.0, 1.0)
      }

      // Wind fluttering & ground mist dynamics
      material.uniforms.uWindStrength.value = 1.0 + slashEnergy * 3.2
      mistMesh.rotation.z += delta * (0.08 + slashEnergy * 0.25)
      mistMat.opacity = (0.65 + Math.sin(clock * 1.5) * 0.15) * (1.0 + slashEnergy * 0.4)
    },
    dispose: () => {
      geometry.dispose()
      material.dispose()
      texture.dispose()
      mistGeo.dispose()
      mistMat.dispose()
      mistTexture.dispose()
      sparkTexture.dispose()

      slashGeo1.dispose()
      slashMat1.dispose()
      slashGeo2.dispose()
      slashMat2.dispose()
      shockwaveGeo.dispose()
      shockwaveMat.dispose()

      sparkGeo.dispose()
      sparkMat.dispose()
    },
  }

  return controller
}
