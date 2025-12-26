import type React from 'react'
import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { hasLocale } from 'next-intl'
import { routing } from '@/i18n/routing'
import { Analytics } from '@vercel/analytics/react'
import { LenisProvider } from '@/components/providers/lenis-provider'

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params

  const baseUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : 'https://minhhieu.is-a.dev'
  const titles = {
    en: 'Nguyen Minh Hieu - Frontend Developer Portfolio',
    vi: 'Nguyen Minh Hieu - Portfolio Lập Trình Viên Frontend',
  }
  const descriptions = {
    en: 'Frontend Developer with 5+ years of experience in React.js, Next.js, TypeScript. Specialized in building modern web applications with clean code and exceptional user experiences.',
    vi: 'Lập trình viên Frontend với 5+ năm kinh nghiệm về React.js, Next.js, TypeScript. Chuyên xây dựng ứng dụng web hiện đại với code sạch và trải nghiệm người dùng tuyệt vời.',
  }

  const title = titles[locale as keyof typeof titles] || titles.en
  const description =
    descriptions[locale as keyof typeof descriptions] || descriptions.en

  return {
    title,
    description,
    keywords: [
      'Frontend Developer',
      'React Developer',
      'Next.js Developer',
      'TypeScript',
      'Web Developer',
      'React.js',
      'Next.js',
      'JavaScript',
      'Portfolio',
      'Nguyen Minh Hieu',
      locale === 'vi' ? 'Lập trình viên Frontend' : '',
    ].filter(Boolean),
    authors: [{ name: 'Nguyen Minh Hieu' }],
    creator: 'Nguyen Minh Hieu',
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: '/en',
        vi: '/vi',
        'x-default': '/en',
      },
    },
    openGraph: {
      type: 'website',
      title,
      description,
      siteName: 'Nguyen Minh Hieu Portfolio',
      locale: locale === 'vi' ? 'vi_VN' : 'en_US',
      alternateLocale: locale === 'vi' ? 'en_US' : 'vi_VN',
      url: `${baseUrl}/${locale}`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  // Ensure that the incoming `locale` is valid
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  // Enable static rendering
  setRequestLocale(locale)

  // Get messages from server-side configuration
  const messages = await getMessages()

  // Structured data (JSON-LD) for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Nguyen Minh Hieu',
    jobTitle: 'Frontend Developer',
    description:
      locale === 'vi'
        ? 'Lập trình viên Frontend với 5+ năm kinh nghiệm'
        : 'Frontend Developer with 5+ years of experience',
    url:
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000'
        : 'https://minhhieu.is-a.dev',
    sameAs: ['https://github.com/mhfed', 'https://linkedin.com/in/mhfed'],
    knowsAbout: [
      'React.js',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'Frontend Development',
    ],
  }

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <NextIntlClientProvider messages={messages}>
        <LenisProvider>
          {children}
          <Analytics />
        </LenisProvider>
      </NextIntlClientProvider>
    </>
  )
}
