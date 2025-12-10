import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { Eye, Calendar } from 'lucide-react';

interface BlogCardProps {
  slug: string;
  title: string;
  titleEn?: string | null;
  titleVi?: string | null;
  excerpt?: string | null;
  excerptEn?: string | null;
  excerptVi?: string | null;
  coverImage?: string | null;
  publishedAt?: Date | null;
  viewCount?: number;
  categories?: Array<{ slug: string; name: string }>;
  tags?: Array<{ slug: string; name: string }>;
  locale?: string;
}

export function BlogCard({
  slug,
  title,
  titleEn,
  titleVi,
  excerpt,
  excerptEn,
  excerptVi,
  coverImage,
  publishedAt,
  viewCount = 0,
  categories = [],
  tags = [],
  locale = 'en',
}: BlogCardProps) {
  // Get localized title and excerpt
  const displayTitle =
    locale === 'vi' ? titleVi || titleEn || title : titleEn || titleVi || title;
  const displayExcerpt =
    locale === 'vi'
      ? excerptVi || excerptEn || excerpt
      : excerptEn || excerptVi || excerpt;

  return (
    <article className='group flex flex-col h-full border border-border rounded-lg overflow-hidden bg-card hover:shadow-lg transition-shadow duration-300'>
      {/* Cover Image */}
      {coverImage && (
        <Link href={`/blog/${slug}`} className='block'>
          <AspectRatio ratio={16 / 9} className='overflow-hidden bg-muted'>
            <Image
              src={coverImage}
              alt={displayTitle || ''}
              fill
              className='object-cover group-hover:scale-105 transition-transform duration-300'
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            />
          </AspectRatio>
        </Link>
      )}

      {/* Content */}
      <div className='flex-1 flex flex-col p-6'>
        {/* Categories */}
        {categories.length > 0 && (
          <div className='flex flex-wrap gap-2 mb-3'>
            {categories.slice(0, 2).map((category) => (
              <Badge key={category.slug} variant='secondary' size='sm'>
                {category.name}
              </Badge>
            ))}
          </div>
        )}

        {/* Title */}
        <Link href={`/blog/${slug}`}>
          <h2 className='text-xl md:text-2xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2'>
            {displayTitle}
          </h2>
        </Link>

        {/* Excerpt */}
        {displayExcerpt && (
          <p className='text-sm md:text-base text-foreground/70 mb-4 line-clamp-3 flex-1'>
            {displayExcerpt}
          </p>
        )}

        {/* Meta Info */}
        <div className='flex items-center justify-between text-xs text-foreground/60 mt-auto pt-4 border-t border-border'>
          <div className='flex items-center gap-4'>
            {publishedAt && (
              <div className='flex items-center gap-1'>
                <Calendar className='w-3 h-3' />
                <time dateTime={publishedAt.toISOString()}>
                  {format(new Date(publishedAt), 'MMM d, yyyy')}
                </time>
              </div>
            )}
            {viewCount > 0 && (
              <div className='flex items-center gap-1'>
                <Eye className='w-3 h-3' />
                <span>{viewCount}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
