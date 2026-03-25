import { getAllPosts } from '@/actions/post-actions'
import { SectionTitle } from '@/components/section-title'
import { getTranslations, getLocale } from 'next-intl/server'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { format } from 'date-fns'
import { Reveal } from './ui/reveal'

export async function BlogSection() {
  const locale = (await getLocale()) as 'en' | 'vi'
  const t = await getTranslations('blog')

  // Fetch a small number of recent published posts for the homepage
  const posts = await getAllPosts(locale, true, 5)

  // Don't render section if no posts
  if (posts.length === 0) {
    return null
  }

  return (
    <section id='blog' className='section-shell scroll-mt-24 px-4 md:px-6'>
      <div className='mx-auto max-w-[1280px]'>
        <div className='flex flex-col gap-4 md:flex-row md:items-end md:justify-between'>
          <Reveal>
            <SectionTitle title={t('title')} className='mb-0' />
          </Reveal>
          <Reveal delay={140}>
            <Link
              href={`/${locale}/blog`}
              className='group inline-flex items-center gap-2 self-start text-sm font-medium text-foreground/70 transition-colors hover:text-foreground'
            >
              {t('viewAllPosts')}
              <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
            </Link>
          </Reveal>
        </div>

        <div className='mt-8 border-b border-white/10'>
          {posts.map((post, idx) => {
            const displayTitle =
              locale === 'vi'
                ? post.titleVi || post.titleEn || post.title
                : post.titleEn || post.titleVi || post.title

            const displayExcerpt =
              locale === 'vi'
                ? post.excerptVi || post.excerptEn || post.excerpt
                : post.excerptEn || post.excerptVi || post.excerpt

            const date = post.publishedAt || post.createdAt

            return (
              <Reveal
                key={post.id}
                delay={idx * 90}
                variant={idx % 2 === 0 ? 'left' : 'right'}
              >
                <article className='group border-t border-white/10 py-6 md:py-7 lg:grid lg:grid-cols-[140px_minmax(0,1fr)_auto] lg:gap-8 lg:items-start'>
                  <div className='mb-3 text-sm text-foreground/52 lg:mb-0'>
                    {date ? (
                      <time>{format(new Date(date), 'dd MMM yyyy')}</time>
                    ) : (
                      <span>unpublished</span>
                    )}
                  </div>

                  <div className='min-w-0'>
                    <Link
                      href={`/${locale}/blog/${post.slug}`}
                      className='block'
                    >
                      <h2 className='font-display text-2xl font-semibold tracking-[-0.06em] text-foreground transition-colors duration-300 group-hover:text-primary md:text-[2rem]'>
                        {displayTitle}
                      </h2>
                    </Link>

                    {displayExcerpt && (
                      <p className='mt-3 max-w-2xl text-sm leading-relaxed text-foreground/72 md:text-base'>
                        {displayExcerpt}
                      </p>
                    )}
                  </div>

                  <Link
                    href={`/${locale}/blog/${post.slug}`}
                    className='mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80 lg:mt-1'
                  >
                    Read article
                    <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
                  </Link>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
