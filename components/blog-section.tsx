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
    <section id='blog' className='scroll-mt-24 px-4 md:px-6'>
      <div className='mx-auto max-w-[1200px]'>
        <div className='terminal-panel px-6 py-7 md:px-8 md:py-8 lg:px-10 lg:py-10'>
          <div className='mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between'>
            <SectionTitle title={t('title')} className='mb-0' />
            <Link
              href={`/${locale}/blog`}
              className='group inline-flex items-center gap-2 self-start rounded-full border border-primary/15 bg-primary/10 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.28em] text-primary transition-colors hover:bg-primary/15'
            >
              {t('viewAllPosts')}
              <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
            </Link>
          </div>

          <div className='grid gap-4 lg:grid-cols-2'>
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
                <article
                  key={post.id}
                  className='rounded-[1.4rem] border border-primary/12 bg-card/80 p-5 md:p-6'
                >
                  <div className='mb-4 flex items-center justify-between gap-4'>
                    {date ? (
                      <time className='font-mono text-[10px] uppercase tracking-[0.28em] text-primary/75'>
                        {format(new Date(date), 'dd MMM yyyy')}
                      </time>
                    ) : (
                      <span className='font-mono text-[10px] uppercase tracking-[0.28em] text-primary/75'>
                        unpublished
                      </span>
                    )}
                    <span className='rounded-full border border-primary/15 bg-background/55 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/70'>
                      log_{post.id}
                    </span>
                  </div>

                  <Link href={`/${locale}/blog/${post.slug}`} className='group'>
                    <h2 className='text-xl font-semibold tracking-[-0.04em] text-foreground transition-colors group-hover:text-primary md:text-2xl'>
                      {displayTitle}
                    </h2>
                  </Link>

                  {displayExcerpt && (
                    <p className='mt-3 line-clamp-3 text-sm leading-relaxed text-foreground/72 md:text-base'>
                      {displayExcerpt}
                    </p>
                  )}

                  <Link
                    href={`/${locale}/blog/${post.slug}`}
                    className='mt-5 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-primary transition-colors hover:text-primary/80'
                  >
                    read log
                    <ArrowRight className='h-4 w-4' />
                  </Link>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
