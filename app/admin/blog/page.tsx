import { getAllPosts } from '@/actions/post-actions';
import Link from 'next/link';
import Image from 'next/image';
import { deletePost } from '@/actions/post-actions';
import { DeletePostButton } from './delete-post-button';
import { Badge } from '@/components/ui/badge';

export default async function AdminBlogPage() {
  const posts = await getAllPosts(undefined, undefined); // Get all posts (published and draft)

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold text-foreground'>Blog Posts</h1>
          <p className='text-sm text-muted-foreground mt-1'>
            Manage your blog posts
          </p>
        </div>
        <Link
          href='/admin/blog/add'
          className='inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90'
        >
          Create New Post
        </Link>
      </div>

      {/* Stats */}
      <section className='rounded-lg border border-border/40 bg-muted/30 p-6'>
        <div className='flex items-center gap-8'>
          <div>
            <p className='mb-1 text-sm text-muted-foreground'>Total posts</p>
            <p className='text-3xl font-bold text-foreground'>{posts.length}</p>
          </div>
          <div>
            <p className='mb-1 text-sm text-muted-foreground'>Published</p>
            <p className='text-3xl font-bold text-foreground'>
              {posts.filter((p) => p.isPublished).length}
            </p>
          </div>
          <div>
            <p className='mb-1 text-sm text-muted-foreground'>Drafts</p>
            <p className='text-3xl font-bold text-foreground'>
              {posts.filter((p) => !p.isPublished).length}
            </p>
          </div>
        </div>
      </section>

      {/* Posts List */}
      <section className='space-y-4'>
        {posts.length === 0 ? (
          <div className='flex flex-col items-center justify-center rounded-lg border border-dashed border-border/60 bg-muted/40 px-6 py-12 text-center'>
            <p className='mb-3 text-sm text-muted-foreground'>No posts yet.</p>
            <Link
              href='/admin/blog/add'
              className='inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90'
            >
              Create your first post
            </Link>
          </div>
        ) : (
          <div className='grid gap-4 md:grid-cols-2'>
            {posts.map((post) => (
              <article
                key={post.id}
                className='flex flex-col overflow-hidden rounded-lg border border-border/40 bg-card transition-colors hover:border-primary/50'
              >
                {post.coverImage && (
                  <div className='relative h-40 w-full border-b border-border/40 bg-muted'>
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className='object-cover'
                    />
                  </div>
                )}

                <div className='flex flex-1 flex-col gap-3 p-4'>
                  <div>
                    <div className='flex items-center gap-2 mb-2'>
                      <h2 className='text-base font-semibold text-foreground'>
                        {post.title}
                      </h2>
                      {!post.isPublished && (
                        <Badge variant='outline' size='sm'>
                          Draft
                        </Badge>
                      )}
                    </div>
                    <p className='text-xs text-muted-foreground mb-1'>
                      Slug: {post.slug}
                    </p>
                    {post.excerpt && (
                      <p className='text-sm text-foreground/80 line-clamp-2'>
                        {post.excerpt}
                      </p>
                    )}
                  </div>

                  <div className='mt-3 flex flex-wrap gap-2'>
                    <Link
                      href={`/admin/blog/edit/${post.id}`}
                      className='inline-flex items-center justify-center rounded-md border border-border/60 bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-primary/10'
                    >
                      Edit
                    </Link>
                    <DeletePostButton postId={post.id} />
                    {post.isPublished && (
                      <Link
                        href={`/blog/${post.slug}`}
                        target='_blank'
                        className='inline-flex items-center justify-center rounded-md border border-border/60 bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-primary/10'
                      >
                        View
                      </Link>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
