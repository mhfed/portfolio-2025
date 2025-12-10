'use client';

import { useState } from 'react';
import { deletePost } from '@/actions/post-actions';
import { useRouter } from 'next/navigation';

interface DeletePostButtonProps {
  postId: number;
}

export function DeletePostButton({ postId }: DeletePostButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this post?')) {
      return;
    }

    setIsDeleting(true);
    try {
      const result = await deletePost(postId);
      if (result.success) {
        router.refresh();
      } else {
        alert(result.error || 'Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className='inline-flex items-center justify-center rounded-md border border-destructive/60 bg-background px-3 py-1.5 text-xs font-medium text-destructive transition-colors hover:bg-destructive/10 disabled:opacity-50'
    >
      {isDeleting ? 'Deleting...' : 'Delete'}
    </button>
  );
}
