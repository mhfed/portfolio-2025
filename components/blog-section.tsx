import { getAllPosts } from '@/actions/post-actions'
import { BlogCard } from '@/components/blog/blog-card'
import { SectionTitle } from '@/components/section-title'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'
import { getTranslations, getLocale } from 'next-intl/server'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export async function BlogSection() {
  const locale = await getLocale()
  const t = await getTranslations('blog')

  // Fetch recent published posts (limit to 6)
  const posts = await getAllPosts(locale, true, 6)

  // Don't render section if no posts
  if (posts.length === 0) {
    return null
  }

  return (
    <section className='container mx-auto px-4 py-8 md:py-12 lg:py-16'>
      <div className='max-w-7xl mx-auto'>
        {/* Section Header */}
        <div className='flex items-center justify-between mb-8 md:mb-12'>
          <SectionTitle title={t('title')} />
          <Link
            href='/blog'
            className='group flex items-center gap-2 text-sm md:text-base font-medium text-foreground/70 hover:text-primary transition-colors'
          >
            {t('viewAllPosts')}
            <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
          </Link>
        </div>

        {/* Blog Posts Grid */}
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
              viewCount={0}
              locale={locale}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
