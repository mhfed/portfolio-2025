import { getPostById } from '@/actions/post-actions';
import { EditPostForm } from './edit-post-form';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';

interface EditPostPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { id } = await params;
  const postId = parseInt(id, 10);

  if (isNaN(postId)) {
    notFound();
  }

  const post = await getPostById(postId);

  if (!post) {
    notFound();
  }

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
        <h1 className='text-2xl font-bold text-foreground'>Edit Post</h1>
        <p className='text-sm text-muted-foreground mt-1'>
          Update blog post: {post.title}
        </p>
      </div>

      <EditPostForm post={post} />
    </div>
  );
}
