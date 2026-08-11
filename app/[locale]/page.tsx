import { getTranslations } from 'next-intl/server'
import { EditorialPortfolio } from '@/components/organisms/editorial-portfolio'
import { normalizeProjects, type LocalizedProjectRecord } from '@/data/projects'
import { STORY_BEAT_IDS } from '@/lib/storytelling'
import type { ExperienceRecord } from '@/types/experience'
import type {
  PortfolioContent,
  PortfolioContactPoint,
  PortfolioLocale,
  PortfolioSkillGroup,
} from '@/types/portfolio-content'

type Props = {
  params: Promise<{ locale: string }>
}

export default async function Home({ params }: Props) {
  const { locale } = await params
  const [
    tProjects,
    tExperience,
    tHero,
    tAbout,
    tCollaborate,
    tHeader,
    tSkills,
    tEditorialUi,
    tStory,
  ] = await Promise.all([
    getTranslations({ locale, namespace: 'projects' }),
    getTranslations({ locale, namespace: 'experience' }),
    getTranslations({ locale, namespace: 'hero' }),
    getTranslations({ locale, namespace: 'about' }),
    getTranslations({ locale, namespace: 'collaborate' }),
    getTranslations({ locale, namespace: 'header' }),
    getTranslations({ locale, namespace: 'skills' }),
    getTranslations({ locale, namespace: 'editorialUi' }),
    getTranslations({ locale, namespace: 'storytelling' }),
  ])

  const projects = normalizeProjects(
    (tProjects.raw('list') || []) as LocalizedProjectRecord[]
  )
  const experiences = (tExperience.raw('list') || []) as ExperienceRecord[]
  const fullName = `${tHero('front')} ${tHero('middle')} ${tHero('end')}`
  const emailAddress = tHero('contact.email')
  const email: PortfolioContactPoint = {
    label: tHero('contact.sayHello'),
    value: emailAddress,
    href: `mailto:${emailAddress}`,
  }
  const content: PortfolioContent = {
    locale: locale as PortfolioLocale,
    fullName,
    editorialUi: {
      builder: tEditorialUi('builder'),
      caseStudies: tEditorialUi('caseStudies'),
      curious: tEditorialUi('curious'),
      hello: tEditorialUi('hello'),
      journey: tEditorialUi('journey'),
      madeWithCare: tEditorialUi('madeWithCare'),
      portfolioJourney: tEditorialUi('portfolioJourney'),
      shipping: tEditorialUi('shipping'),
      years: tEditorialUi('years'),
    },
    story: {
      ariaLabel: tStory('ariaLabel'),
      hideTooltipLabel: tStory('hideTooltipLabel'),
      progressLabel: tStory('progressLabel'),
      showTooltipLabel: tStory('showTooltipLabel'),
      beats: STORY_BEAT_IDS.map((id) => ({
        id,
        label: tStory(`beats.${id}.label`),
        dialogue: tStory(`beats.${id}.dialogue`),
        bridge: tStory(`beats.${id}.bridge`),
      })),
    },
    navigation: {
      items: [
        { id: 'about', label: tHeader('nav.about'), href: '#about' },
        { id: 'work', label: tHeader('nav.projects'), href: '#work' },
        {
          id: 'experience',
          label: tHeader('nav.experience'),
          href: '#experience',
        },
        { id: 'skills', label: tHeader('nav.skills'), href: '#skills' },
        {
          id: 'contact',
          label: tHeader('nav.collaborate'),
          href: '#contact',
        },
      ],
      contactLabel: tHeader('contact'),
      theme: {
        label: tHeader('themeMode'),
        darkLabel: tHeader('dark'),
        lightLabel: tHeader('light'),
        toggleLabel: tHeader('toggleTheme'),
      },
      language: {
        label: tHeader('language'),
        changeLabel: tHeader('changeLanguage'),
      },
      skipToContentLabel: tHeader('skipToContent'),
      primaryNavigationLabel: tHeader('primaryNavigation'),
      mobileNavigationLabel: tHeader('mobileNavigation'),
      menu: {
        openLabel: tHeader('openMenu'),
        closeLabel: tHeader('closeMenu'),
      },
    },
    hero: {
      role: tHero('developer'),
      headline: tHero('headline'),
      description: tHero('description'),
      intro: tHero('intro'),
      status: tHero('status'),
      location: {
        label: tHero('contact.basedIn'),
        value: tHero('contact.location'),
      },
      email,
      actions: {
        viewWork: { label: tHero('viewWork'), href: '#work' },
        contact: { label: tHero('contactMe'), href: email.href },
      },
    },
    about: {
      title: tAbout('title'),
      statement: tAbout('statement'),
      description: tAbout('description1'),
      metrics: [
        { value: '5+', label: tAbout('yearsExperience') },
        { value: '29 → 90+', label: tAbout('storefrontResult') },
      ],
    },
    work: {
      title: tProjects('title'),
      headline: tProjects('headline'),
      launchLabel: tProjects('launchApp'),
      sourceLabel: tProjects('sourceCode'),
      viewLabel: tProjects('viewProject'),
      projects,
    },
    experience: {
      title: tExperience('title'),
      headline: tExperience('headline'),
      emptyLabel: tExperience('noExperience'),
      records: experiences,
    },
    skills: {
      title: tSkills('title'),
      headline: tSkills('headline'),
      groups: (tSkills.raw('groups') || []) as PortfolioSkillGroup[],
    },
    contact: {
      title: tCollaborate('title'),
      headline: tCollaborate('poeticHeadline'),
      description: tCollaborate('description'),
      email,
      links: [
        {
          label: 'GitHub',
          href: 'https://github.com/mhfed',
          external: true,
        },
        {
          label: 'LinkedIn',
          href: 'https://www.linkedin.com/in/mhfed/',
          external: true,
        },
        {
          label: tHeader('downloadResume'),
          href: '/CV_Nguyen_Minh_Hieu_Frontend_Developer.pdf',
          download: true,
        },
      ],
      rights: tCollaborate('allRightsReserved'),
    },
  }

  return <EditorialPortfolio content={content} />
}
