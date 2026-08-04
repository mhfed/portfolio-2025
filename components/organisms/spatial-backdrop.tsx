'use client'

import {
  Component,
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useState,
  type ErrorInfo,
  type ReactNode,
} from 'react'
import {
  usePrefersReducedMotion,
  useSceneDeviceProfile,
  type ScenePerformanceTier,
} from '@/hooks/use-client-capabilities'
import { setSceneState } from '@/lib/sceneStore'
import type { PortfolioSceneContent } from '@/types/scene-content'

export interface SpatialBackdropProps {
  content: PortfolioSceneContent
}

function SpatialFallback() {
  return (
    <div
      aria-hidden='true'
      className='ambient-fallback pointer-events-none fixed inset-0 z-0'
    />
  )
}

const SpatialScene = lazy(() => import('./spatial-scene'))

interface SceneErrorBoundaryProps {
  children: ReactNode
  onError: () => void
}

interface SceneErrorBoundaryState {
  failed: boolean
}

interface OptionalIdleScheduler {
  cancelIdleCallback?: (handle: number) => void
  requestIdleCallback?: (
    callback: IdleRequestCallback,
    options?: IdleRequestOptions
  ) => number
}

class SceneErrorBoundary extends Component<
  SceneErrorBoundaryProps,
  SceneErrorBoundaryState
> {
  state: SceneErrorBoundaryState = { failed: false }

  static getDerivedStateFromError(): SceneErrorBoundaryState {
    return { failed: true }
  }

  componentDidCatch(_error: Error, _info: ErrorInfo) {
    this.props.onError()
  }

  render() {
    return this.state.failed ? <SpatialFallback /> : this.props.children
  }
}

export function SpatialBackdrop({ content }: SpatialBackdropProps) {
  const reducedMotion = usePrefersReducedMotion()
  const deviceProfile = useSceneDeviceProfile()
  const [webglReady, setWebglReady] = useState(false)
  const [sceneRequested, setSceneRequested] = useState(false)
  const [sceneReady, setSceneReady] = useState(false)
  const [runtimeTier, setRuntimeTier] =
    useState<ScenePerformanceTier>('balanced')

  useEffect(() => {
    if (!deviceProfile.ready || !deviceProfile.shouldRender3D) {
      setWebglReady(false)
      return
    }

    const canvas = document.createElement('canvas')
    const context =
      canvas.getContext('webgl2', { failIfMajorPerformanceCaveat: true }) ??
      canvas.getContext('webgl', { failIfMajorPerformanceCaveat: true })
    setWebglReady(Boolean(context))
    context?.getExtension('WEBGL_lose_context')?.loseContext()
  }, [deviceProfile.ready, deviceProfile.shouldRender3D])

  useEffect(() => {
    setRuntimeTier(deviceProfile.tier)
  }, [deviceProfile.tier])

  useEffect(() => {
    if (!webglReady || reducedMotion) {
      setSceneRequested(false)
      return
    }

    const requestScene = () => setSceneRequested(true)
    const idleScheduler = window as unknown as OptionalIdleScheduler
    let idleId: number | undefined
    let timeoutId: ReturnType<typeof setTimeout> | undefined

    if (idleScheduler.requestIdleCallback) {
      idleId = idleScheduler.requestIdleCallback(requestScene, { timeout: 700 })
    } else {
      timeoutId = setTimeout(requestScene, 80)
    }

    window.addEventListener('pointerdown', requestScene, {
      once: true,
      passive: true,
    })
    window.addEventListener('scroll', requestScene, {
      once: true,
      passive: true,
    })
    return () => {
      if (idleId !== undefined) idleScheduler.cancelIdleCallback?.(idleId)
      if (timeoutId !== undefined) clearTimeout(timeoutId)
      window.removeEventListener('pointerdown', requestScene)
      window.removeEventListener('scroll', requestScene)
    }
  }, [reducedMotion, webglReady])

  useEffect(() => {
    if (webglReady && sceneRequested && !reducedMotion) return
    setSceneReady(false)
    setSceneState({ ready: false })
  }, [reducedMotion, sceneRequested, webglReady])

  useEffect(
    () => () => {
      setSceneState({ ready: false })
      document.body.style.cursor = ''
    },
    []
  )

  const onReady = useCallback(() => {
    setSceneReady(true)
    setSceneState({ ready: true })

    window.requestAnimationFrame(() => {
      const hash = window.location.hash
      if (hash) {
        const target = document.querySelector(hash)
        if (target instanceof HTMLElement) {
          target.scrollIntoView({ behavior: 'auto', block: 'start' })
        }
      }
    })
  }, [])

  const onError = useCallback(() => {
    setSceneReady(false)
    setSceneState({ ready: false })
    document.body.style.cursor = ''
  }, [])

  if (
    !deviceProfile.ready ||
    !deviceProfile.shouldRender3D ||
    !webglReady ||
    !sceneRequested ||
    reducedMotion
  ) {
    return <SpatialFallback />
  }

  return (
    <div
      aria-hidden='true'
      className='spatial-canvas fixed inset-0'
      data-scene-ready={sceneReady ? '' : undefined}
      data-performance-tier={runtimeTier}
    >
      <SceneErrorBoundary onError={onError}>
        <Suspense fallback={null}>
          <SpatialScene
            content={content}
            onTierChange={setRuntimeTier}
            performanceTier={deviceProfile.tier}
            quality={deviceProfile.isMobile ? 'low' : 'high'}
            onReady={onReady}
          />
        </Suspense>
      </SceneErrorBoundary>
      <div className='spatial-loader' data-loaded={sceneReady ? '' : undefined}>
        <span>Preparing spatial interface</span>
        <i aria-hidden='true' />
      </div>
    </div>
  )
}
