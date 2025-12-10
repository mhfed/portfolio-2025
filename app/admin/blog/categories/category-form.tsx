'use client';

import { useState } from 'react';
import { createCategory } from '@/actions/post-actions';
import { useRouter } from 'next/navigation';

export function CategoryForm() {
  const [slug, setSlug] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const result = await createCategory(slug, name, description);
      if (result.success) {
        setSlug('');
        setName('');
        setDescription('');
        router.refresh();
      } else {
        setError(result.error || 'Failed to create category');
      }
    } catch (err) {
      setError('An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='space-y-4 p-4 border border-border/40 rounded-lg bg-muted/30'
    >
      <h2 className='text-lg font-semibold text-foreground'>
        Add New Category
      </h2>

      {error && (
        <div className='p-3 bg-destructive/10 border border-destructive/30 rounded text-destructive text-sm'>
          {error}
        </div>
      )}

      <div>
        <label
          htmlFor='slug'
          className='block text-sm font-semibold text-foreground mb-2'
        >
          Slug <span className='text-destructive'>*</span>
        </label>
        <input
          type='text'
          id='slug'
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          required
          className='w-full px-4 py-2 bg-background border border-border/30 rounded-md text-foreground'
          placeholder='tech'
        />
      </div>

      <div>
        <label
          htmlFor='name'
          className='block text-sm font-semibold text-foreground mb-2'
        >
          Name <span className='text-destructive'>*</span>
        </label>
        <input
          type='text'
          id='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className='w-full px-4 py-2 bg-background border border-border/30 rounded-md text-foreground'
          placeholder='Tech'
        />
      </div>

      <div>
        <label
          htmlFor='description'
          className='block text-sm font-semibold text-foreground mb-2'
        >
          Description
        </label>
        <textarea
          id='description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className='w-full px-4 py-2 bg-background border border-border/30 rounded-md text-foreground resize-y'
          placeholder='Technology related posts'
        />
      </div>

      <button
        type='submit'
        disabled={isSubmitting}
        className='inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 disabled:opacity-50'
      >
        {isSubmitting ? 'Creating...' : 'Create Category'}
      </button>
    </form>
  );
}
