'use client'

import { useEffect } from 'react'
import { useTexture } from '@react-three/drei'
import { MathUtils } from 'three'
import type { ProjectCaseStudy } from '@/data/projects'
import { scrollToSceneRecord, useSceneValue } from '@/lib/sceneStore'
import type { PortfolioSceneContent } from '@/types/scene-content'
import { SCENE_PALETTE } from './scene-palette'
import { useScenePerformanceTier } from './scene-runtime'
import type { SceneQuality } from './scene-waypoints'
import {
  SceneBadge,
  SceneButton,
  SceneMedia,
  ScenePanel,
  SceneRule,
  SceneText,
} from './spatial-primitives'

const SENTENCE_BOUNDARY = /[.。!?]\s/

function summarize(text: string, limit: number): string {
  const clean = text
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  const sentenceEnd = clean.search(SENTENCE_BOUNDARY)
  const sentence = sentenceEnd === -1 ? clean : clean.slice(0, sentenceEnd + 1)
  return sentence.length > limit
    ? `${sentence.slice(0, limit).trim()}...`
    : sentence
}

function sceneImageUrl(
  url: string,
  performanceTier: 'high' | 'balanced' | 'low'
): string {
  if (!url.includes('res.cloudinary.com') || !url.includes('/upload/'))
    return url
  const width = performanceTier === 'high' ? 768 : 512
  return url.replace(
    '/upload/',
    `/upload/f_auto,q_auto:eco,dpr_1.0,w_${width}/`
  )
}

interface ProjectCardProps {
  content: PortfolioSceneContent['work']
  project: ProjectCaseStudy
  quality: SceneQuality
}

interface OptionalIdleScheduler {
  cancelIdleCallback?: (handle: number) => void
  requestIdleCallback?: (
    callback: IdleRequestCallback,
    options?: IdleRequestOptions
  ) => number
}

function ProjectCard({ content, project, quality }: ProjectCardProps) {
  const performanceTier = useScenePerformanceTier()
  const high = quality === 'high'
  const tags = project.techStack.slice(0, high ? 5 : 3)
  const titleSize = high
    ? project.title.length > 28
      ? 0.3
      : 0.43
    : project.title.length > 28
      ? 0.21
      : 0.29

  if (!high) {
    return (
      <group>
        <ScenePanel size={[2.72, 5.35, 0.12]} tone='glass' />
        <SceneMedia
          position={[0, 1.32, 0.12]}
          scale={[2.35, 1.62]}
          url={sceneImageUrl(project.image, performanceTier)}
        />
        <SceneText
          position={[-1.08, 0.26, 0.16]}
          fontSize={0.11}
          fontWeight={650}
          letterSpacing={0.05}
          color={SCENE_PALETTE.accent}
        >
          {project.year}
        </SceneText>
        <SceneText
          position={[-1.08, 0.02, 0.16]}
          fontSize={titleSize}
          fontWeight={700}
          maxWidth={2.15}
          lineHeight={0.94}
          letterSpacing={-0.035}
        >
          {project.title}
        </SceneText>
        <SceneText
          position={[-1.08, -0.92, 0.16]}
          fontSize={0.125}
          fontWeight={450}
          maxWidth={2.15}
          lineHeight={1.38}
          color={SCENE_PALETTE.smoke}
        >
          {summarize(project.description, 112)}
        </SceneText>
        {tags.map((tag, index) => (
          <SceneBadge
            key={tag}
            label={tag}
            position={[-0.7 + index * 0.7, -1.55, 0.17]}
            tone={index === 0 ? 'accent' : 'light'}
          />
        ))}
        {project.liveUrl ? (
          <SceneButton
            position={[-0.62, -2.13, 0.17]}
            targetId={`project-${project.id}-live`}
            href={project.liveUrl}
            label={content.launchLabel}
            tone='dark'
            width={1.28}
          />
        ) : null}
        {project.githubUrl ? (
          <SceneButton
            position={[0.75, -2.13, 0.17]}
            targetId={`project-${project.id}-source`}
            href={project.githubUrl}
            label={content.sourceLabel}
            tone='light'
            width={1.25}
          />
        ) : null}
      </group>
    )
  }

  return (
    <group>
      <ScenePanel size={[7.8, 4.48, 0.13]} tone='glass' />
      <SceneMedia
        position={[-2.02, 0.15, 0.15]}
        scale={[3.32, 2.68]}
        url={sceneImageUrl(project.image, performanceTier)}
      />
      <SceneRule
        position={[-0.05, 0, 0.15]}
        length={3.65}
        vertical
        color={SCENE_PALETTE.chrome}
      />

      <SceneText
        position={[0.28, 1.77, 0.17]}
        fontSize={0.12}
        fontWeight={650}
        letterSpacing={0.055}
        color={SCENE_PALETTE.accent}
      >
        {project.year}
      </SceneText>
      <SceneText
        position={[0.28, 1.48, 0.17]}
        fontSize={titleSize}
        fontWeight={710}
        maxWidth={3.25}
        lineHeight={0.93}
        letterSpacing={-0.04}
      >
        {project.title}
      </SceneText>
      <SceneText
        position={[0.28, 0.3, 0.17]}
        fontSize={0.16}
        fontWeight={450}
        maxWidth={3.28}
        lineHeight={1.42}
        color={SCENE_PALETTE.smoke}
      >
        {summarize(project.description, 150)}
      </SceneText>
      <SceneText
        position={[0.28, -0.52, 0.17]}
        fontSize={0.1}
        fontWeight={620}
        maxWidth={3.2}
        lineHeight={1.35}
        letterSpacing={0.025}
        color={SCENE_PALETTE.smoke}
      >
        {project.role.toUpperCase()}
      </SceneText>

      {tags.map((tag, index) => (
        <SceneBadge
          key={tag}
          label={tag}
          position={[0.64 + index * 0.75, -1.03, 0.18]}
          tone={index === 0 ? 'accent' : 'light'}
        />
      ))}
      {project.liveUrl ? (
        <SceneButton
          position={[1.02, -1.73, 0.18]}
          targetId={`project-${project.id}-live`}
          href={project.liveUrl}
          label={content.launchLabel}
          tone='dark'
          width={1.55}
        />
      ) : null}
      {project.githubUrl ? (
        <SceneButton
          position={[2.75, -1.73, 0.18]}
          targetId={`project-${project.id}-source`}
          href={project.githubUrl}
          label={content.sourceLabel}
          tone='light'
          width={1.55}
        />
      ) : null}
    </group>
  )
}

export interface WorkStationProps {
  content: PortfolioSceneContent['work']
  projects: ProjectCaseStudy[]
  quality: SceneQuality
}

export function WorkStation({ content, projects, quality }: WorkStationProps) {
  const workIndex = useSceneValue('workIndex')
  const activeIndex = MathUtils.clamp(
    workIndex,
    0,
    Math.max(0, projects.length - 1)
  )
  const project = projects[activeIndex]
  const high = quality === 'high'
  const performanceTier = useScenePerformanceTier()

  useEffect(() => {
    const adjacent = projects[activeIndex + 1] ?? projects[activeIndex - 1]
    if (!adjacent?.image) return

    const preload = () =>
      useTexture.preload(sceneImageUrl(adjacent.image, performanceTier))
    const idleScheduler = window as unknown as OptionalIdleScheduler
    if (idleScheduler.requestIdleCallback) {
      const requestId = idleScheduler.requestIdleCallback(preload, {
        timeout: 1200,
      })
      return () => idleScheduler.cancelIdleCallback?.(requestId)
    }

    const timeoutId = setTimeout(preload, 300)
    return () => clearTimeout(timeoutId)
  }, [activeIndex, performanceTier, projects])

  if (!project) {
    return (
      <SceneText
        position={[-1.5, 0.2, 0]}
        fontSize={high ? 0.42 : 0.24}
        maxWidth={3}
      >
        {content.emptyLabel}
      </SceneText>
    )
  }

  const previous = Math.max(0, activeIndex - 1)
  const next = Math.min(projects.length - 1, activeIndex + 1)

  return (
    <group>
      <SceneText
        position={high ? [-3.88, 2.82, 0.1] : [-1.28, 3.08, 0.1]}
        fontSize={high ? 0.2 : 0.14}
        fontWeight={680}
        letterSpacing={0.06}
        color={SCENE_PALETTE.smoke}
      >
        {content.title}
      </SceneText>

      <group position={[0, 0, -0.34]}>
        <ScenePanel
          position={[0.22, -0.18, -0.34]}
          rotation={[0, 0, 0.025]}
          size={high ? [7.55, 4.2, 0.08] : [2.55, 5.1, 0.08]}
          tone='dark'
        />
        <ScenePanel
          position={[0.1, -0.08, -0.16]}
          rotation={[0, 0, -0.012]}
          size={high ? [7.68, 4.34, 0.09] : [2.64, 5.22, 0.09]}
          tone='light'
        />
      </group>

      <ProjectCard
        key={project.id}
        content={content}
        project={project}
        quality={quality}
      />

      {high && projects.length > 1 ? (
        <group>
          <SceneButton
            position={high ? [-3.18, -2.72, 0.06] : [-0.72, -3.05, 0.06]}
            targetId='work-previous'
            label='PREV'
            tone='light'
            width={high ? 1.15 : 1.05}
            onActivate={() => scrollToSceneRecord('work', previous)}
          />
          <SceneButton
            position={high ? [-1.84, -2.72, 0.06] : [0.48, -3.05, 0.06]}
            targetId='work-next'
            label='NEXT'
            tone='accent'
            width={high ? 1.15 : 1.05}
            onActivate={() => scrollToSceneRecord('work', next)}
          />
        </group>
      ) : null}
    </group>
  )
}
