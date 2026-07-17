import {
  CreativePortfolio,
  type ExperienceRecord,
} from '@/components/organisms/creative-portfolio'
import { normalizeProjects, type LocalizedProjectRecord } from '@/data/projects'
import { getTranslations } from 'next-intl/server'

type Props = {
  params: Promise<{ locale: string }>
}

export default async function Home({ params }: Props) {
  const { locale } = await params
  const [tProjects, tExperience, tContact] = await Promise.all([
    getTranslations({ locale, namespace: 'projects' }),
    getTranslations({ locale, namespace: 'experience' }),
    getTranslations({ locale, namespace: 'hero.contact' }),
  ])

  const projects = normalizeProjects(
    (tProjects.raw('list') || []) as LocalizedProjectRecord[]
  )
  const experiences = (tExperience.raw('list') || []) as ExperienceRecord[]

  return (
    <main className='w-full'>
      <CreativePortfolio
        locale={locale}
        projects={projects}
        experiences={experiences}
        email={tContact('email')}
      />
    </main>
  )
}
