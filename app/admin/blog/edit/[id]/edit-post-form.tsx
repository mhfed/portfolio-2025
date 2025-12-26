'use client'

import { useActionState, useState, useEffect } from 'react'
import {
  updatePost,
  getAllCategories,
  getAllTags,
  getPostById,
} from '@/actions/post-actions'
import type { UpdatePostResult } from '@/actions/post-actions'
import { ImageUploadDropzone } from '@/components/admin-image-upload-dropzone'
import { LocaleTabs } from '@/components/admin/locale-tabs'
import { TipTapEditor } from '@/components/blog/tiptap-editor'
import { generateSlug } from '@/lib/utils'
import { format } from 'date-fns'

interface EditPostFormProps {
  post: Awaited<ReturnType<typeof getPostById>>
}

export function EditPostForm({ post }: EditPostFormProps) {
  const [state, formAction] = useActionState<UpdatePostResult, FormData>(
    updatePostAction,
    { success: true }
  )
  const [coverImage, setCoverImage] = useState(post?.coverImage || '')
  const [categories, setCategories] = useState<
    Array<{ id: number; name: string }>
  >([])
  const [tags, setTags] = useState<Array<{ id: number; name: string }>>([])
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>(
    post?.categories?.map((c) => c.id) || []
  )
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>(
    post?.tags?.map((t) => t.id) || []
  )
  const [contentEn, setContentEn] = useState<any>(post?.contentEn || null)
  const [contentVi, setContentVi] = useState<any>(post?.contentVi || null)
  const [slug, setSlug] = useState(post?.slug || '')
  const [titleEn, setTitleEn] = useState(post?.titleEn || '')
  const [titleVi, setTitleVi] = useState(post?.titleVi || '')
  const [autoGenerateSlug, setAutoGenerateSlug] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const [cats, tgs] = await Promise.all([getAllCategories(), getAllTags()])
      setCategories(cats)
      setTags(tgs)
    }
    fetchData()
  }, [])

  async function updatePostAction(
    _prevState: UpdatePostResult,
    formData: FormData
  ): Promise<UpdatePostResult> {
    if (!post) {
      return { success: false, error: 'Post not found' }
    }
    formData.append('id', post.id.toString())
    return updatePost(post.id, formData)
  }

  if (!post) {
    return <div>Post not found</div>
  }

  const publishedAtFormatted = post.publishedAt
    ? format(new Date(post.publishedAt), "yyyy-MM-dd'T'HH:mm")
    : ''

  return (
    <>
      {state.error && (
        <div className='mb-6 p-4 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive'>
          <p className='font-semibold'>Error</p>
          <p className='text-sm'>{state.error}</p>
        </div>
      )}

      <form action={formAction} className='space-y-6'>
        <input type='hidden' name='id' value={post.id} />

        {/* Slug */}
        <div>
          <div className='flex items-center justify-between mb-3'>
            <label
              htmlFor='slug'
              className='block text-sm font-semibold text-foreground'
            >
              Slug <span className='text-destructive'>*</span>
            </label>
            <label className='flex items-center gap-2 cursor-pointer'>
              <input
                type='checkbox'
                checked={autoGenerateSlug}
                onChange={(e) => setAutoGenerateSlug(e.target.checked)}
                className='rounded border-border'
              />
              <span className='text-xs text-muted-foreground'>
                Auto-generate from title
              </span>
            </label>
          </div>
          <input
            type='text'
            id='slug'
            name='slug'
            required
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className='w-full px-4 py-3 bg-background border border-border/30 rounded-md text-foreground placeholder-foreground/50 focus:outline-none focus:border-primary transition-colors'
          />
        </div>

        {/* Locale Tabs for Text Fields */}
        <LocaleTabs>
          {(activeTab) => (
            <div className='space-y-6'>
              {/* Title */}
              <div>
                <label
                  htmlFor={`title_${activeTab}`}
                  className='block text-sm font-semibold text-foreground mb-3'
                >
                  Title ({activeTab === 'en' ? 'English' : 'Tiếng Việt'}){' '}
                  <span className='text-destructive'>*</span>
                </label>
                <input
                  type='text'
                  id={`title_${activeTab}`}
                  name={`title_${activeTab}`}
                  value={
                    activeTab === 'en'
                      ? titleEn || post.titleEn || ''
                      : titleVi || post.titleVi || ''
                  }
                  onChange={(e) => {
                    const value = e.target.value
                    if (activeTab === 'en') {
                      setTitleEn(value)
                      if (autoGenerateSlug) {
                        // Use current title, fallback to other locale's title or existing post title
                        const titleToUse =
                          value || titleVi || post.titleVi || post.titleEn || ''
                        if (titleToUse) {
                          setSlug(generateSlug(titleToUse))
                        }
                      }
                    } else {
                      setTitleVi(value)
                      if (autoGenerateSlug) {
                        // Use current title, fallback to other locale's title or existing post title
                        const titleToUse =
                          value || titleEn || post.titleEn || post.titleVi || ''
                        if (titleToUse) {
                          setSlug(generateSlug(titleToUse))
                        }
                      }
                    }
                  }}
                  className='w-full px-4 py-3 bg-background border border-border/30 rounded-md text-foreground placeholder-foreground/50 focus:outline-none focus:border-primary transition-colors'
                />
              </div>

              {/* Excerpt */}
              <div>
                <label
                  htmlFor={`excerpt_${activeTab}`}
                  className='block text-sm font-semibold text-foreground mb-3'
                >
                  Excerpt ({activeTab === 'en' ? 'English' : 'Tiếng Việt'})
                </label>
                <textarea
                  id={`excerpt_${activeTab}`}
                  name={`excerpt_${activeTab}`}
                  rows={3}
                  defaultValue={
                    activeTab === 'en'
                      ? post.excerptEn || ''
                      : post.excerptVi || ''
                  }
                  className='w-full px-4 py-3 bg-background border border-border/30 rounded-md text-foreground placeholder-foreground/50 focus:outline-none focus:border-primary transition-colors resize-y'
                />
              </div>

              {/* Content (TipTap Editor) */}
              <div>
                <label className='block text-sm font-semibold text-foreground mb-3'>
                  Content ({activeTab === 'en' ? 'English' : 'Tiếng Việt'})
                </label>
                <TipTapEditor
                  content={
                    activeTab === 'en'
                      ? contentEn || post.contentEn
                      : contentVi || post.contentVi
                  }
                  onChange={(content) => {
                    if (activeTab === 'en') {
                      setContentEn(content)
                    } else {
                      setContentVi(content)
                    }
                  }}
                  placeholder={
                    activeTab === 'en'
                      ? 'Start writing your post in English...'
                      : 'Bắt đầu viết bài viết bằng tiếng Việt...'
                  }
                  locale={activeTab}
                />
                {/* Hidden inputs for form submission */}
                <input
                  type='hidden'
                  name={`content_${activeTab}`}
                  value={
                    activeTab === 'en'
                      ? contentEn && Object.keys(contentEn).length > 0
                        ? JSON.stringify(contentEn)
                        : ''
                      : contentVi && Object.keys(contentVi).length > 0
                        ? JSON.stringify(contentVi)
                        : ''
                  }
                />
              </div>
            </div>
          )}
        </LocaleTabs>

        {/* Cover Image */}
        <div className='space-y-3'>
          <ImageUploadDropzone
            initialUrl={coverImage}
            onUploadSuccess={(url) => {
              setCoverImage(url)
            }}
            label='Cover Image'
            description='Drag and drop a cover image here, or click to browse.'
          />

          <div>
            <label
              htmlFor='coverImage'
              className='block text-sm font-semibold text-foreground mb-3'
            >
              Cover Image URL (Cloudinary)
            </label>
            <input
              type='url'
              id='coverImage'
              name='coverImage'
              value={coverImage}
              onChange={(event) => setCoverImage(event.target.value)}
              className='w-full px-4 py-3 bg-background border border-border/30 rounded-md text-foreground placeholder-foreground/50 focus:outline-none focus:border-primary transition-colors'
            />
          </div>
        </div>

        {/* Categories */}
        <div>
          <label className='block text-sm font-semibold text-foreground mb-3'>
            Categories
          </label>
          <div className='space-y-2'>
            {categories.map((category) => (
              <label
                key={category.id}
                className='flex items-center gap-2 cursor-pointer'
              >
                <input
                  type='checkbox'
                  value={category.id}
                  checked={selectedCategoryIds.includes(category.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedCategoryIds([
                        ...selectedCategoryIds,
                        category.id,
                      ])
                    } else {
                      setSelectedCategoryIds(
                        selectedCategoryIds.filter((id) => id !== category.id)
                      )
                    }
                  }}
                  className='rounded border-border'
                />
                <span className='text-sm text-foreground'>{category.name}</span>
              </label>
            ))}
          </div>
          <input
            type='hidden'
            name='categoryIds'
            value={selectedCategoryIds.join(',')}
          />
        </div>

        {/* Tags */}
        <div>
          <label className='block text-sm font-semibold text-foreground mb-3'>
            Tags
          </label>
          <div className='space-y-2'>
            {tags.map((tag) => (
              <label
                key={tag.id}
                className='flex items-center gap-2 cursor-pointer'
              >
                <input
                  type='checkbox'
                  value={tag.id}
                  checked={selectedTagIds.includes(tag.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedTagIds([...selectedTagIds, tag.id])
                    } else {
                      setSelectedTagIds(
                        selectedTagIds.filter((id) => id !== tag.id)
                      )
                    }
                  }}
                  className='rounded border-border'
                />
                <span className='text-sm text-foreground'>{tag.name}</span>
              </label>
            ))}
          </div>
          <input type='hidden' name='tagIds' value={selectedTagIds.join(',')} />
        </div>

        {/* Published At */}
        <div>
          <label
            htmlFor='publishedAt'
            className='block text-sm font-semibold text-foreground mb-3'
          >
            Published Date
          </label>
          <input
            type='datetime-local'
            id='publishedAt'
            name='publishedAt'
            defaultValue={publishedAtFormatted}
            className='w-full px-4 py-3 bg-background border border-border/30 rounded-md text-foreground focus:outline-none focus:border-primary transition-colors'
          />
        </div>

        {/* Is Published */}
        <div>
          <label className='flex items-center gap-2 cursor-pointer'>
            <input
              type='checkbox'
              name='isPublished'
              value='true'
              defaultChecked={post.isPublished}
              className='rounded border-border'
            />
            <span className='text-sm font-semibold text-foreground'>
              Publish immediately
            </span>
          </label>
        </div>

        {/* Locale */}
        <div>
          <label
            htmlFor='locale'
            className='block text-sm font-semibold text-foreground mb-3'
          >
            Locale
          </label>
          <select
            id='locale'
            name='locale'
            defaultValue={post.locale || ''}
            className='w-full px-4 py-3 bg-background border border-border/30 rounded-md text-foreground focus:outline-none focus:border-primary transition-colors'
          >
            <option value=''>All locales</option>
            <option value='en'>English</option>
            <option value='vi'>Tiếng Việt</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className='flex justify-end gap-4 pt-4'>
          <button
            type='submit'
            className='inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90'
          >
            Update Post
          </button>
        </div>
      </form>
    </>
  )
}
