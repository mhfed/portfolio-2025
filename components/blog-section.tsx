import { getAllPosts } from '@/actions/post-actions'
import { SectionTitle } from '@/components/section-title'
import { getTranslations, getLocale } from 'next-intl/server'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { format } from 'date-fns'

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
    <section id='blog' className='px-4 md:px-6'>
      <div className='max-w-5xl mx-auto'>
        {/* Section Header */}
        <div className='flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 md:mb-12'>
          <SectionTitle title={t('title')} className='mb-0' />
          <Link
            href={`/${locale}/blog`}
            className='group inline-flex items-center gap-2 text-xs md:text-sm font-medium text-foreground/70 hover:text-primary transition-colors uppercase tracking-wide'
          >
            {t('viewAllPosts')}
            <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
          </Link>
        </div>

        {/* Timeline Layout */}
        <div className='relative'>
          {/* Vertical line */}
          <div className='absolute left-3 md:left-32 top-0 bottom-0 w-px bg-border/70 pointer-events-none' />

          <div className='space-y-6 md:space-y-7'>
            {posts.map((post) => {
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
                <article key={post.id} className='relative pl-10 md:pl-40'>
                  {/* Dot */}
                  <div className='absolute left-1 md:left-[calc(8rem-6px)] top-2 w-3 h-3 rounded-full bg-background border border-primary shadow-sm' />

                  {/* Date */}
                  {date && (
                    <time className='block text-[11px] md:text-xs text-foreground/60 uppercase tracking-[0.16em] mb-1 md:absolute md:left-0 md:top-2 md:w-32 md:text-right md:pr-4 md:mb-0'>
                      {format(new Date(date), 'dd MMM yyyy')}
                    </time>
                  )}

                  <div>
                    {/* Title */}
                    <Link
                      href={`/${locale}/blog/${post.slug}`}
                      className='group'
                    >
                      <h2 className='text-sm md:text-base lg:text-lg font-semibold text-foreground mb-1 md:mb-1.5 group-hover:text-primary transition-colors'>
                        {displayTitle}
                      </h2>
                    </Link>

                    {/* Excerpt */}
                    {displayExcerpt && (
                      <p className='text-xs md:text-sm text-foreground/70 leading-relaxed line-clamp-2 md:line-clamp-3'>
                        {displayExcerpt}
                      </p>
                    )}
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
