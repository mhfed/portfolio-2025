import { getAllPosts, getAllCategories, getAllTags } from '@/actions/post-actions'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { SectionTitle } from '@/components/section-title'
import { Badge } from '@/components/ui/badge'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { hasLocale } from 'next-intl'
import { routing } from '@/i18n/routing'
import Link from 'next/link'
import { format } from 'date-fns'

interface BlogPageProps {
  params: Promise<{ locale: string }>
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)
  const t = await getTranslations('blog')

  // Fetch published posts for this locale
  const posts = await getAllPosts(locale, true)
  const categories = await getAllCategories()
  const tags = await getAllTags()

  return (
    <>
      <Header />
      <div className='px-4 md:px-4 py-6 md:py-8 lg:py-10'>
        <div className='max-w-5xl mx-auto'>
          {/* Page Header */}
          <div className='mb-6 md:mb-8'>
            <SectionTitle title={t('title')} className='mb-2 md:mb-3' />
            <p className='text-xs md:text-sm text-foreground/70 max-w-xl'>
              {locale === 'vi'
                ? 'Những bài viết về công nghệ, phát triển và kinh nghiệm.'
                : 'Articles about technology, development, and experiences.'}
            </p>
          </div>

          {posts.length > 0 ? (
            <div className='grid grid-cols-1 md:grid-cols-[220px_minmax(0,1fr)] gap-6 md:gap-10'>
              {/* Left Filters */}
              <aside className='md:pt-1 md:sticky md:top-24 space-y-6'>
                {/* All posts */}
                <div>
                  <p className='text-[11px] md:text-xs font-semibold text-foreground/60 uppercase tracking-[0.16em] mb-2'>
                    {t('allPosts')}
                  </p>
                  <Link
                    href={`/${locale}/blog`}
                    className='inline-flex items-center text-xs md:text-sm text-primary hover:underline font-medium'
                  >
                    {locale === 'vi' ? 'Tất cả bài viết' : 'All posts'}
                  </Link>
                </div>

                {/* Categories */}
                {categories.length > 0 && (
                  <div>
                    <p className='text-[11px] md:text-xs font-semibold text-foreground/60 uppercase tracking-[0.16em] mb-2'>
                      {t('categories')}
                    </p>
                    <div className='flex flex-wrap md:flex-col gap-2'>
                      {categories.map((category) => (
                        <Link
                          key={category.id}
                          href={`/${locale}/blog/category/${category.slug}`}
                          className='inline-flex items-center text-xs md:text-sm text-foreground/80 hover:text-primary transition-colors'
                        >
                          <span className='truncate'>{category.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tags */}
                {tags.length > 0 && (
                  <div>
                    <p className='text-[11px] md:text-xs font-semibold text-foreground/60 uppercase tracking-[0.16em] mb-2'>
                      {t('tags')}
                    </p>
                    <div className='flex flex-wrap gap-2'>
                      {tags.map((tag) => (
                        <Link
                          key={tag.id}
                          href={`/${locale}/blog/tag/${tag.slug}`}
                          className='inline-block'
                        >
                          <Badge
                            variant='outline'
                            size='sm'
                            className='text-[11px] md:text-xs hover:bg-primary/10 hover:border-primary/50 transition-colors'
                          >
                            #{tag.name}
                          </Badge>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </aside>

              {/* Timeline */}
              <div className='relative'>
                {/* Vertical line */}
                <div className='absolute left-3 md:left-4 top-0 bottom-0 w-px bg-border/70 pointer-events-none' />

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
                      <article
                        key={post.id}
                        className='relative pl-10 md:pl-12'
                      >
                        {/* Dot */}
                        <div className='absolute left-1 md:left-2 top-2 w-3 h-3 rounded-full bg-background border border-primary shadow-sm' />

                        {/* Date */}
                        {date && (
                          <time className='block text-[11px] md:text-xs text-foreground/60 uppercase tracking-[0.16em] mb-1'>
                            {format(new Date(date), 'dd MMM yyyy')}
                          </time>
                        )}

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

                        {/* Meta: categories for this post are not loaded here; simple layout keeps timeline clean */}
                      </article>
                    )
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className='text-center py-10 md:py-12'>
              <p className='text-foreground/60 text-sm md:text-lg'>{t('noPosts')}</p>
            </div>
          )}
        </div>
      </div>
      <Footer locale={locale} />
    </>
  )
}
