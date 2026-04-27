import { getAllCategories } from '@/actions/post-actions'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { CategoryForm } from './category-form'

export default async function CategoriesPage() {
  const categories = await getAllCategories()

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
        <h1 className='text-2xl font-bold text-foreground'>Categories</h1>
        <p className='text-sm text-muted-foreground mt-1'>
          Manage blog post categories
        </p>
      </div>

      {/* Add Category Form */}
      <CategoryForm />

      {/* Categories List */}
      <section className='space-y-4'>
        {categories.length === 0 ? (
          <div className='flex flex-col items-center justify-center rounded-lg border border-dashed border-border/60 bg-muted/40 px-6 py-12 text-center'>
            <p className='mb-3 text-sm text-muted-foreground'>
              No categories yet.
            </p>
          </div>
        ) : (
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
            {categories.map((category) => (
              <article
                key={category.id}
                className='flex flex-col overflow-hidden rounded-lg border border-border/40 bg-card p-4'
              >
                <h3 className='text-base font-semibold text-foreground mb-1'>
                  {category.name}
                </h3>
                <p className='text-xs text-muted-foreground mb-2'>
                  Slug: {category.slug}
                </p>
                {category.description && (
                  <p className='text-sm text-foreground/80'>
                    {category.description}
                  </p>
                )}
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
