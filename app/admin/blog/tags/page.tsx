import { getAllTags, createTag } from '@/actions/post-actions';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { TagForm } from './tag-form';

export default async function TagsPage() {
  const tags = await getAllTags();

  return (
    <div className='space-y-6'>
      <div className='flex items-center gap-4'>
        <Link
          href='/admin/blog'
          className='inline-flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground transition-colors'
        >
          <ArrowLeft className='w-4 h-4' />
          Back to Blog
        </Link>
      </div>

      <div>
        <h1 className='text-2xl font-bold text-foreground'>Tags</h1>
        <p className='text-sm text-muted-foreground mt-1'>
          Manage blog post tags
        </p>
      </div>

      {/* Add Tag Form */}
      <TagForm />

      {/* Tags List */}
      <section className='space-y-4'>
        {tags.length === 0 ? (
          <div className='flex flex-col items-center justify-center rounded-lg border border-dashed border-border/60 bg-muted/40 px-6 py-12 text-center'>
            <p className='mb-3 text-sm text-muted-foreground'>No tags yet.</p>
          </div>
        ) : (
          <div className='flex flex-wrap gap-2'>
            {tags.map((tag) => (
              <span
                key={tag.id}
                className='inline-flex items-center rounded-md border border-border/40 bg-card px-3 py-1.5 text-sm font-medium text-foreground'
              >
                {tag.name}
                <span className='ml-2 text-xs text-muted-foreground'>
                  ({tag.slug})
                </span>
              </span>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
