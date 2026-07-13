/**
 * Tiny shared bridge between the DOM sections and the WebGL scene. The DOM
 * (which knows what the user is actually reading, via IntersectionObserver)
 * writes the active item index per station here; the 3D landmarks read it
 * inside their render loop. It's a plain mutable singleton on purpose — the
 * 3D side polls it every frame, so pushing this through React state would only
 * add re-renders for no benefit. One portfolio renders per page.
 */
export const hudFocus: Record<string, number> = {
  experience: 0,
  work: 0,
}
