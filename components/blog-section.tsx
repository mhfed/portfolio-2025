import { getAllPosts } from '@/actions/post-actions'
import { BlogCard } from '@/components/blog/blog-card'
import { SectionTitle } from '@/components/section-title'
import { getTranslations, getLocale } from 'next-intl/server'
import { ArrowRight } from 'lucide-react'

export async function BlogSection() {
  const locale = (await getLocale()) as 'en' | 'vi'
  const t = await getTranslations('blog')

  // Fetch a small number of recent published posts for the homepage
  const posts = await getAllPosts(locale, true, 3)

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
          <a
            href={`/${locale}/blog`}
            className='group inline-flex items-center gap-2 text-xs md:text-sm font-medium text-foreground/70 hover:text-primary transition-colors uppercase tracking-wide'
          >
            {t('viewAllPosts')}
            <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
          </a>
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
