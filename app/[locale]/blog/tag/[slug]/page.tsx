import { getPostsByTag } from '@/actions/post-actions'
import { BlogCard } from '@/components/blog/blog-card'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { hasLocale } from 'next-intl'
import { routing } from '@/i18n/routing'
import { getAllTags } from '@/actions/post-actions'

interface TagPageProps {
  params: Promise<{ locale: string; slug: string }>
}

export default async function TagPage({ params }: TagPageProps) {
  const { locale, slug } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)
  const t = await getTranslations('blog')

  const posts = await getPostsByTag(slug, locale)
  const tags = await getAllTags()
  const tag = tags.find((t) => t.slug === slug)

  if (!tag) {
    notFound()
  }

  return (
    <div className='container mx-auto px-4 py-8 md:py-12 lg:py-16'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='mb-8 md:mb-12'>
          <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4'>
            #{tag.name}
          </h1>
        </div>

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
            {posts.map((post) => (
              <BlogCard
                key={post.id}
                slug={post.slug}
                title={post.title}
                titleEn={post.titleEn}
                titleVi={post.titleVi}
                excerpt={post.excerpt}
                excerptEn={post.excerptEn}
                excerptVi={post.excerptVi}
                coverImage={post.coverImage}
                publishedAt={post.publishedAt}
                locale={locale}
              />
            ))}
          </div>
        ) : (
          <div className='text-center py-12 md:py-16'>
            <p className='text-foreground/60 text-lg'>{t('noPosts')}</p>
          </div>
        )}
      </div>
    </div>
  )
}
