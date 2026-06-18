/**
 * Singleton-cached dynamic import for GSAP + ScrollTrigger.
 * Every component shares one Promise so the module is loaded once.
 * registerPlugin is called exactly once on first resolution.
 */

import type { gsap as GsapType } from 'gsap'
import type { ScrollTrigger as ScrollTriggerType } from 'gsap/ScrollTrigger'

let _cached: Promise<{
  gsap: typeof GsapType
  ScrollTrigger: typeof ScrollTriggerType
}> | null = null

export function loadGSAP() {
  if (!_cached) {
    _cached = Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        gsap.registerPlugin(ScrollTrigger)
        return { gsap, ScrollTrigger }
      }
    )
  }
  return _cached
}
