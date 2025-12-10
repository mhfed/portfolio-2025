import { getPostBySlug, incrementViewCount } from '@/actions/post-actions';
import { BlogContent } from '@/components/blog/blog-content';
import { BlogTOC } from '@/components/blog/blog-toc';
import { Badge } from '@/components/ui/badge';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { routing } from '@/i18n/routing';
import { Metadata } from 'next';
import { format } from 'date-fns';
import { Eye, Calendar, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface BlogPostPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  const post = await getPostBySlug(slug, locale);

  if (!post || !post.isPublished) {
    return {
      title: 'Post Not Found',
    };
  }

  const title =
    locale === 'vi'
      ? post.titleVi || post.titleEn || post.title
      : post.titleEn || post.titleVi || post.title;
  const excerpt =
    locale === 'vi'
      ? post.excerptVi || post.excerptEn || post.excerpt
      : post.excerptEn || post.excerptVi || post.excerpt;

  const siteUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : 'https://minhhieu.is-a.dev';

  return {
    title: `${title} | Blog`,
    description: excerpt || undefined,
    openGraph: {
      title,
      description: excerpt || undefined,
      type: 'article',
      publishedTime: post.publishedAt?.toISOString(),
      images: post.coverImage
        ? [
            {
              url: post.coverImage,
              width: 1200,
              height: 630,
              alt: title,
            },
          ]
        : [],
      url: `${siteUrl}/${locale}/blog/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: excerpt || undefined,
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const t = await getTranslations('blog');

  const post = await getPostBySlug(slug, locale);

  if (!post || !post.isPublished) {
    notFound();
  }

  // Increment view count (fire and forget)
  incrementViewCount(post.id).catch(console.error);

  // Get localized content
  const displayTitle =
    locale === 'vi'
      ? post.titleVi || post.titleEn || post.title
      : post.titleEn || post.titleVi || post.title;
  const displayExcerpt =
    locale === 'vi'
      ? post.excerptVi || post.excerptEn || post.excerpt
      : post.excerptEn || post.excerptVi || post.excerpt;
  // Helper to check if content is valid (not null, not empty object)
  const isValidContent = (content: any): boolean => {
    if (!content) return false;
    if (typeof content === 'object') {
      // Check if it's a valid TipTap document or has content
      if (content.type === 'doc') return true;
      if (Array.isArray(content) && content.length > 0) return true;
      if (Object.keys(content).length > 0) return true;
      return false;
    }
    return true;
  };

  const getValidContent = (contents: any[]): any => {
    return contents.find((c) => isValidContent(c)) || null;
  };

  const displayContent =
    locale === 'vi'
      ? getValidContent([post.contentVi, post.contentEn, post.content])
      : getValidContent([post.contentEn, post.contentVi, post.content]);

  return (
    <div className='container mx-auto px-4 py-8 md:py-12 lg:py-16'>
      <div className='max-w-4xl mx-auto'>
        {/* Back Button */}
        <Link
          href={`/${locale}/blog`}
          className='inline-flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground mb-8 transition-colors'
        >
          <ArrowLeft className='w-4 h-4' />
          <span>{t('backToBlog')}</span>
        </Link>

        {/* Cover Image */}
        {post.coverImage && (
          <div className='relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden'>
            <Image
              src={post.coverImage}
              alt={displayTitle || ''}
              fill
              className='object-cover'
              priority
              sizes='(max-width: 768px) 100vw, 896px'
            />
          </div>
        )}

        {/* Header */}
        <header className='mb-8'>
          {/* Categories */}
          {post.categories && post.categories.length > 0 && (
            <div className='flex flex-wrap gap-2 mb-4'>
              {post.categories.map((category) => (
                <Badge key={category.slug} variant='secondary' size='sm'>
                  {category.name}
                </Badge>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4'>
            {displayTitle}
          </h1>

          {/* Excerpt */}
          {displayExcerpt && (
            <p className='text-lg md:text-xl text-foreground/70 mb-6'>
              {displayExcerpt}
            </p>
          )}

          {/* Meta Info */}
          <div className='flex items-center gap-6 text-sm text-foreground/60'>
            {post.publishedAt && (
              <div className='flex items-center gap-2'>
                <Calendar className='w-4 h-4' />
                <time dateTime={post.publishedAt.toISOString()}>
                  {format(new Date(post.publishedAt), 'MMMM d, yyyy')}
                </time>
              </div>
            )}
            {post.viewCount > 0 && (
              <div className='flex items-center gap-2'>
                <Eye className='w-4 h-4' />
                <span>
                  {post.viewCount} {t('views')}
                </span>
              </div>
            )}
          </div>
        </header>

        {/* Content with TOC */}
        <div className='grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-8'>
          {/* Main Content */}
          <article className='prose prose-lg dark:prose-invert max-w-none'>
            <BlogContent content={displayContent} />
          </article>

          {/* Table of Contents Sidebar */}
          <aside className='hidden lg:block'>
            <div className='sticky top-24'>
              <BlogTOC content={displayContent} />
            </div>
          </aside>
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className='mt-12 pt-8 border-t border-border'>
            <h3 className='text-sm font-semibold text-foreground/70 mb-4'>
              {t('tags')}
            </h3>
            <div className='flex flex-wrap gap-2'>
              {post.tags.map((tag) => (
                <Link
                  key={tag.slug}
                  href={`/${locale}/blog/tag/${tag.slug}`}
                  className='inline-block'
                >
                  <Badge
                    variant='outline'
                    size='sm'
                    className='hover:bg-primary/10 hover:border-primary/50 transition-colors'
                  >
                    {tag.name}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
