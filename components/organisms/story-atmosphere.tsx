'use client'

import {
  Component,
  lazy,
  Suspense,
  useEffect,
  useState,
  type ErrorInfo,
  type ReactNode,
} from 'react'
import {
  usePrefersReducedMotion,
  useSceneDeviceProfile,
} from '@/hooks/use-client-capabilities'
import type { StoryBeatId } from '@/types/storytelling'

export interface StoryAtmosphereProps {
  activeBeatId: StoryBeatId
}

interface StoryAtmosphereBoundaryProps {
  children: ReactNode
}

interface StoryAtmosphereBoundaryState {
  failed: boolean
}

const StoryAtmosphereCanvas = lazy(
  () => import('@/components/three/story-atmosphere-canvas')
)

class StoryAtmosphereBoundary extends Component<
  StoryAtmosphereBoundaryProps,
  StoryAtmosphereBoundaryState
> {
  state: StoryAtmosphereBoundaryState = { failed: false }

  static getDerivedStateFromError(): StoryAtmosphereBoundaryState {
    return { failed: true }
  }

  componentDidCatch(_error: Error, _info: ErrorInfo) {
    // The CSS fallback remains visible when WebGL or the lazy chunk fails.
  }

  render() {
    return this.state.failed ? null : this.props.children
  }
}

export function StoryAtmosphere({ activeBeatId }: StoryAtmosphereProps) {
  const reducedMotion = usePrefersReducedMotion()
  const profile = useSceneDeviceProfile(1180)
  const [webglReady, setWebglReady] = useState(false)
  const [requested, setRequested] = useState(false)

  useEffect(() => {
    if (!profile.ready || !profile.shouldRender3D || profile.isMobile) return

    const canvas = document.createElement('canvas')
    const context =
      canvas.getContext('webgl2', { failIfMajorPerformanceCaveat: true }) ??
      canvas.getContext('webgl', { failIfMajorPerformanceCaveat: true })

    setWebglReady(Boolean(context))
    context?.getExtension('WEBGL_lose_context')?.loseContext()
  }, [profile.isMobile, profile.ready, profile.shouldRender3D])

  useEffect(() => {
    if (!webglReady || reducedMotion) return

    const request = () => setRequested(true)
    const timeoutId = window.setTimeout(request, 240)
    window.addEventListener('pointerdown', request, { once: true, passive: true })

    return () => {
      window.clearTimeout(timeoutId)
      window.removeEventListener('pointerdown', request)
    }
  }, [reducedMotion, webglReady])

  return (
    <div
      className='story-atmosphere'
      data-story-atmosphere
      data-tone={activeBeatId}
      aria-hidden='true'
    >
      <div className='story-atmosphere__fallback' />
      {requested && webglReady && !reducedMotion && !profile.isMobile && (
        <StoryAtmosphereBoundary>
          <Suspense fallback={null}>
            <StoryAtmosphereCanvas
              activeBeatId={activeBeatId}
              tier={profile.tier}
            />
          </Suspense>
        </StoryAtmosphereBoundary>
      )}
    </div>
  )
}
