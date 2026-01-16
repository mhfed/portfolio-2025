import { MetadataRoute } from 'next'
import { getAllPosts } from '@/actions/post-actions'
import { routing } from '@/i18n/routing'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : 'https://minhhieu.is-a.dev'

  const sitemap: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]

  // Add blog listing pages for each locale
  routing.locales.forEach((locale) => {
    sitemap.push({
      url: `${baseUrl}/${locale === 'en' ? '' : locale}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    })
  })

  // Add published blog posts
  const posts = await getAllPosts(undefined, true) // Get all published posts

  posts.forEach((post) => {
    // Add post for each locale if it has content in that locale
    routing.locales.forEach((locale) => {
      const hasContent =
        (locale === 'en' && (post.titleEn || post.contentEn)) ||
        (locale === 'vi' && (post.titleVi || post.contentVi))

      if (hasContent && post.publishedAt) {
        sitemap.push({
          url: `${baseUrl}/${locale === 'en' ? '' : locale}/blog/${post.slug}`,
          lastModified: post.updatedAt || post.publishedAt || new Date(),
          changeFrequency: 'monthly',
          priority: 0.7,
        })
      }
    })
  })

  return sitemap
}
