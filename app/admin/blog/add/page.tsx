import { PostForm } from './post-form'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function AddPostPage() {
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
        <h1 className='text-2xl font-bold text-foreground'>Create New Post</h1>
        <p className='text-sm text-muted-foreground mt-1'>
          Add a new blog post to your site
        </p>
      </div>

      <PostForm />
    </div>
  )
}
