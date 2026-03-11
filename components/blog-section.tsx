import { getAllPosts } from '@/actions/post-actions'
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
    <section id='blog' className='w-full max-w-[1200px] mx-auto px-6 mt-24 mb-16'>
      {/* Section Header */}
      <div className='flex items-center justify-between border-b-2 border-foreground pb-4 mb-8'>
        <h2 className='text-3xl font-bold uppercase tracking-tight'>/blog/recent</h2>
        <Link
          href={`/${locale}/blog`}
          className='group inline-flex items-center gap-2 mono-text text-sm text-primary font-bold hover:underline'
        >
          {t('viewAllPosts')}
          <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
        </Link>
      </div>

      {/* Blog Posts */}
      <div className='space-y-4'>
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
              className='border-2 border-foreground p-6 hover:bg-card transition-colors group'
            >
              <div className='flex flex-col md:flex-row md:items-center gap-4'>
                {date && (
                  <time className='mono-text text-sm font-bold text-primary shrink-0 md:w-32'>
                    {format(new Date(date), 'dd MMM yyyy')}
                  </time>
                )}
                <div className='flex-1'>
                  <Link href={`/${locale}/blog/${post.slug}`}>
                    <h3 className='text-lg font-bold uppercase group-hover:text-primary transition-colors'>
                      {displayTitle}
                    </h3>
                  </Link>
                  {displayExcerpt && (
                    <p className='text-sm text-muted-foreground mt-1 line-clamp-2'>
                      {displayExcerpt}
                    </p>
                  )}
                </div>
                <span className='mono-text text-xs text-primary font-bold shrink-0'>
                  &gt;&gt;&gt;
                </span>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
