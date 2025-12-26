'use server'

import { db } from '@/lib/db'
import {
  posts,
  categories,
  tags,
  postCategories,
  postTags,
  views,
} from '@/db/schema'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { desc, eq, and, or, ilike, sql, inArray, isNull } from 'drizzle-orm'

export interface CreatePostResult {
  success: boolean
  error?: string
}

export interface UpdatePostResult {
  success: boolean
  error?: string
}

export interface DeletePostResult {
  success: boolean
  error?: string
}

export async function createPost(
  _prevState: CreatePostResult,
  formData: FormData
): Promise<CreatePostResult> {
  try {
    // Extract form data - locale fields
    const titleEn = formData.get('title_en') as string | null
    const titleVi = formData.get('title_vi') as string | null
    const excerptEn = formData.get('excerpt_en') as string | null
    const excerptVi = formData.get('excerpt_vi') as string | null
    const contentEnRaw = formData.get('content_en') as string | null
    const contentViRaw = formData.get('content_vi') as string | null

    // Legacy fields for backward compatibility
    const title = formData.get('title') as string | null
    const excerpt = formData.get('excerpt') as string | null
    const contentRaw = formData.get('content') as string | null

    // Non-locale fields
    const slug = formData.get('slug') as string
    const coverImage = formData.get('coverImage') as string | null
    const publishedAtRaw = formData.get('publishedAt') as string | null
    const isPublished = formData.get('isPublished') === 'true'
    const locale = formData.get('locale') as string | null

    // Category and tag IDs
    const categoryIdsRaw = formData.get('categoryIds') as string | null
    const tagIdsRaw = formData.get('tagIds') as string | null

    // Validate slug
    if (!slug || slug.trim() === '') {
      return { success: false, error: 'Slug is required' }
    }

    // Check if slug already exists
    const existingPost = await db
      .select()
      .from(posts)
      .where(eq(posts.slug, slug.trim()))
      .limit(1)

    if (existingPost.length > 0) {
      return { success: false, error: 'Slug already exists' }
    }

    // Validate: at least one locale must have title
    const finalTitleEn = titleEn?.trim() || title?.trim() || ''
    const finalTitleVi = titleVi?.trim() || title?.trim() || ''

    if (!finalTitleEn && !finalTitleVi) {
      return {
        success: false,
        error: 'Title is required (at least in one language)',
      }
    }

    // Parse JSON content
    let contentEn = null
    let contentVi = null
    let content = null

    if (contentEnRaw && contentEnRaw.trim()) {
      try {
        const parsed = JSON.parse(contentEnRaw)
        // Only set if it's a valid TipTap document (has type: 'doc' or is a non-empty object/array)
        if (parsed && typeof parsed === 'object') {
          if (
            parsed.type === 'doc' ||
            (Array.isArray(parsed) && parsed.length > 0) ||
            Object.keys(parsed).length > 0
          ) {
            contentEn = parsed
          }
        }
      } catch {
        contentEn = null
      }
    }

    if (contentViRaw && contentViRaw.trim()) {
      try {
        const parsed = JSON.parse(contentViRaw)
        // Only set if it's a valid TipTap document (has type: 'doc' or is a non-empty object/array)
        if (parsed && typeof parsed === 'object') {
          if (
            parsed.type === 'doc' ||
            (Array.isArray(parsed) && parsed.length > 0) ||
            Object.keys(parsed).length > 0
          ) {
            contentVi = parsed
          }
        }
      } catch {
        contentVi = null
      }
    }

    if (contentRaw && contentRaw.trim()) {
      try {
        const parsed = JSON.parse(contentRaw)
        // Only set if it's a valid TipTap document (has type: 'doc' or is a non-empty object/array)
        if (parsed && typeof parsed === 'object') {
          if (
            parsed.type === 'doc' ||
            (Array.isArray(parsed) && parsed.length > 0) ||
            Object.keys(parsed).length > 0
          ) {
            content = parsed
          }
        }
      } catch {
        content = null
      }
    }

    // Parse publishedAt
    const publishedAt = publishedAtRaw
      ? new Date(publishedAtRaw)
      : isPublished
        ? new Date()
        : null

    // Insert post
    const [newPost] = await db
      .insert(posts)
      .values({
        slug: slug.trim(),
        title: finalTitleEn || finalTitleVi || '',
        titleEn: finalTitleEn || null,
        titleVi: finalTitleVi || null,
        excerpt:
          excerptEn?.trim() || excerptVi?.trim() || excerpt?.trim() || null,
        excerptEn: excerptEn?.trim() || null,
        excerptVi: excerptVi?.trim() || null,
        content: content || contentEn || contentVi || null,
        contentEn: contentEn || null,
        contentVi: contentVi || null,
        coverImage: coverImage?.trim() || null,
        publishedAt: publishedAt,
        isPublished: isPublished,
        locale: locale?.trim() || null,
      })
      .returning()

    // Insert categories
    if (categoryIdsRaw) {
      const categoryIds = categoryIdsRaw
        .split(',')
        .map((id) => parseInt(id.trim(), 10))
        .filter((id) => !isNaN(id))

      if (categoryIds.length > 0) {
        await db.insert(postCategories).values(
          categoryIds.map((categoryId) => ({
            postId: newPost.id,
            categoryId,
          }))
        )
      }
    }

    // Insert tags
    if (tagIdsRaw) {
      const tagIds = tagIdsRaw
        .split(',')
        .map((id) => parseInt(id.trim(), 10))
        .filter((id) => !isNaN(id))

      if (tagIds.length > 0) {
        await db.insert(postTags).values(
          tagIds.map((tagId) => ({
            postId: newPost.id,
            tagId,
          }))
        )
      }
    }

    // Initialize view count
    await db.insert(views).values({
      postId: newPost.id,
      viewCount: 0,
    })

    // Revalidate paths
    revalidatePath('/blog')
    revalidatePath('/admin/blog')

    // Redirect to admin blog page
    redirect('/admin/blog')
  } catch (error) {
    if (
      error instanceof Error &&
      typeof (error as any).digest === 'string' &&
      (error as any).digest.startsWith('NEXT_REDIRECT')
    ) {
      throw error
    }

    console.error('Error creating post:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create post',
    }
  }
}

export async function getAllPosts(locale?: string, isPublished?: boolean) {
  try {
    let query = db.select().from(posts)

    const conditions = []

    if (locale) {
      // Flexible locale filtering:
      // - Posts with locale = null can be accessed from any locale
      // - Posts with a specific locale can only be accessed from that locale
      conditions.push(or(eq(posts.locale, locale), isNull(posts.locale)))
    }

    if (isPublished !== undefined) {
      conditions.push(eq(posts.isPublished, isPublished))
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions)) as any
    }

    const dbPosts = await query.orderBy(
      desc(posts.publishedAt || posts.createdAt)
    )

    return dbPosts
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

export async function getPostBySlug(slug: string, locale?: string) {
  try {
    const conditions = [eq(posts.slug, slug)]

    if (locale) {
      // Flexible locale filtering:
      // - Posts with locale = null can be accessed from any locale
      // - Posts with a specific locale can only be accessed from that locale
      conditions.push(or(eq(posts.locale, locale), isNull(posts.locale)))
    }

    const [post] = await db
      .select()
      .from(posts)
      .where(and(...conditions))
      .limit(1)

    if (!post) {
      return null
    }

    // Get categories
    const postCats = await db
      .select({
        id: categories.id,
        slug: categories.slug,
        name: categories.name,
        description: categories.description,
      })
      .from(postCategories)
      .innerJoin(categories, eq(postCategories.categoryId, categories.id))
      .where(eq(postCategories.postId, post.id))

    // Get tags
    const postTagsData = await db
      .select({
        id: tags.id,
        slug: tags.slug,
        name: tags.name,
      })
      .from(postTags)
      .innerJoin(tags, eq(postTags.tagId, tags.id))
      .where(eq(postTags.postId, post.id))

    // Get view count
    const [viewData] = await db
      .select()
      .from(views)
      .where(eq(views.postId, post.id))
      .limit(1)

    return {
      ...post,
      categories: postCats,
      tags: postTagsData,
      viewCount: viewData?.viewCount || 0,
    }
  } catch (error) {
    console.error('Error fetching post:', error)
    return null
  }
}

export async function getPostById(id: number) {
  try {
    const [post] = await db
      .select()
      .from(posts)
      .where(eq(posts.id, id))
      .limit(1)

    if (!post) {
      return null
    }

    // Get categories
    const postCats = await db
      .select({
        id: categories.id,
        slug: categories.slug,
        name: categories.name,
        description: categories.description,
      })
      .from(postCategories)
      .innerJoin(categories, eq(postCategories.categoryId, categories.id))
      .where(eq(postCategories.postId, post.id))

    // Get tags
    const postTagsData = await db
      .select({
        id: tags.id,
        slug: tags.slug,
        name: tags.name,
      })
      .from(postTags)
      .innerJoin(tags, eq(postTags.tagId, tags.id))
      .where(eq(postTags.postId, post.id))

    return {
      ...post,
      categories: postCats,
      tags: postTagsData,
    }
  } catch (error) {
    console.error('Error fetching post:', error)
    return null
  }
}

export async function updatePostAction(
  _prevState: UpdatePostResult,
  formData: FormData
): Promise<UpdatePostResult> {
  const id = parseInt(formData.get('id') as string, 10)

  if (isNaN(id)) {
    return { success: false, error: 'Invalid post ID' }
  }

  return updatePost(id, formData)
}

export async function updatePost(
  id: number,
  formData: FormData
): Promise<UpdatePostResult> {
  try {
    // Extract form data - locale fields
    const titleEn = formData.get('title_en') as string | null
    const titleVi = formData.get('title_vi') as string | null
    const excerptEn = formData.get('excerpt_en') as string | null
    const excerptVi = formData.get('excerpt_vi') as string | null
    const contentEnRaw = formData.get('content_en') as string | null
    const contentViRaw = formData.get('content_vi') as string | null

    // Legacy fields
    const title = formData.get('title') as string | null
    const excerpt = formData.get('excerpt') as string | null
    const contentRaw = formData.get('content') as string | null

    // Non-locale fields
    const slug = formData.get('slug') as string
    const coverImage = formData.get('coverImage') as string | null
    const publishedAtRaw = formData.get('publishedAt') as string | null
    const isPublished = formData.get('isPublished') === 'true'
    const locale = formData.get('locale') as string | null

    // Category and tag IDs
    const categoryIdsRaw = formData.get('categoryIds') as string | null
    const tagIdsRaw = formData.get('tagIds') as string | null

    // Validate slug
    if (!slug || slug.trim() === '') {
      return { success: false, error: 'Slug is required' }
    }

    // Check if slug already exists (excluding current post)
    const existingPost = await db
      .select()
      .from(posts)
      .where(and(eq(posts.slug, slug.trim()), sql`${posts.id} != ${id}`))
      .limit(1)

    if (existingPost.length > 0) {
      return { success: false, error: 'Slug already exists' }
    }

    // Validate: at least one locale must have title
    const finalTitleEn = titleEn?.trim() || title?.trim() || ''
    const finalTitleVi = titleVi?.trim() || title?.trim() || ''

    if (!finalTitleEn && !finalTitleVi) {
      return {
        success: false,
        error: 'Title is required (at least in one language)',
      }
    }

    // Parse JSON content
    let contentEn = null
    let contentVi = null
    let content = null

    if (contentEnRaw && contentEnRaw.trim()) {
      try {
        const parsed = JSON.parse(contentEnRaw)
        // Only set if it's a valid TipTap document (has type: 'doc' or is a non-empty object/array)
        if (parsed && typeof parsed === 'object') {
          if (
            parsed.type === 'doc' ||
            (Array.isArray(parsed) && parsed.length > 0) ||
            Object.keys(parsed).length > 0
          ) {
            contentEn = parsed
          }
        }
      } catch {
        contentEn = null
      }
    }

    if (contentViRaw && contentViRaw.trim()) {
      try {
        const parsed = JSON.parse(contentViRaw)
        // Only set if it's a valid TipTap document (has type: 'doc' or is a non-empty object/array)
        if (parsed && typeof parsed === 'object') {
          if (
            parsed.type === 'doc' ||
            (Array.isArray(parsed) && parsed.length > 0) ||
            Object.keys(parsed).length > 0
          ) {
            contentVi = parsed
          }
        }
      } catch {
        contentVi = null
      }
    }

    if (contentRaw && contentRaw.trim()) {
      try {
        const parsed = JSON.parse(contentRaw)
        // Only set if it's a valid TipTap document (has type: 'doc' or is a non-empty object/array)
        if (parsed && typeof parsed === 'object') {
          if (
            parsed.type === 'doc' ||
            (Array.isArray(parsed) && parsed.length > 0) ||
            Object.keys(parsed).length > 0
          ) {
            content = parsed
          }
        }
      } catch {
        content = null
      }
    }

    // Parse publishedAt
    const publishedAt = publishedAtRaw
      ? new Date(publishedAtRaw)
      : isPublished
        ? new Date()
        : null

    // Update post
    await db
      .update(posts)
      .set({
        slug: slug.trim(),
        title: finalTitleEn || finalTitleVi || '',
        titleEn: finalTitleEn || null,
        titleVi: finalTitleVi || null,
        excerpt:
          excerptEn?.trim() || excerptVi?.trim() || excerpt?.trim() || null,
        excerptEn: excerptEn?.trim() || null,
        excerptVi: excerptVi?.trim() || null,
        content: content || contentEn || contentVi || null,
        contentEn: contentEn || null,
        contentVi: contentVi || null,
        coverImage: coverImage?.trim() || null,
        publishedAt: publishedAt,
        isPublished: isPublished,
        locale: locale?.trim() || null,
        updatedAt: new Date(),
      })
      .where(eq(posts.id, id))

    // Update categories - delete existing and insert new
    await db.delete(postCategories).where(eq(postCategories.postId, id))

    if (categoryIdsRaw) {
      const categoryIds = categoryIdsRaw
        .split(',')
        .map((id) => parseInt(id.trim(), 10))
        .filter((id) => !isNaN(id))

      if (categoryIds.length > 0) {
        await db.insert(postCategories).values(
          categoryIds.map((categoryId) => ({
            postId: id,
            categoryId,
          }))
        )
      }
    }

    // Update tags - delete existing and insert new
    await db.delete(postTags).where(eq(postTags.postId, id))

    if (tagIdsRaw) {
      const tagIds = tagIdsRaw
        .split(',')
        .map((id) => parseInt(id.trim(), 10))
        .filter((id) => !isNaN(id))

      if (tagIds.length > 0) {
        await db.insert(postTags).values(
          tagIds.map((tagId) => ({
            postId: id,
            tagId,
          }))
        )
      }
    }

    // Revalidate paths
    revalidatePath('/blog')
    revalidatePath(`/blog/${slug}`)
    revalidatePath('/admin/blog')

    // Redirect to admin blog page
    redirect('/admin/blog')
  } catch (error) {
    if (
      error instanceof Error &&
      typeof (error as any).digest === 'string' &&
      (error as any).digest.startsWith('NEXT_REDIRECT')
    ) {
      throw error
    }

    console.error('Error updating post:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update post',
    }
  }
}

export async function deletePost(id: number): Promise<DeletePostResult> {
  try {
    // Delete post (cascade will handle related records)
    await db.delete(posts).where(eq(posts.id, id))

    // Revalidate paths
    revalidatePath('/blog')
    revalidatePath('/admin/blog')

    return { success: true }
  } catch (error) {
    console.error('Error deleting post:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete post',
    }
  }
}

export async function incrementViewCount(postId: number) {
  try {
    // Check if view record exists
    const [existing] = await db
      .select()
      .from(views)
      .where(eq(views.postId, postId))
      .limit(1)

    if (existing) {
      // Update existing record
      await db
        .update(views)
        .set({
          viewCount: sql`${views.viewCount} + 1`,
          updatedAt: new Date(),
        })
        .where(eq(views.postId, postId))
    } else {
      // Insert new record
      await db.insert(views).values({
        postId,
        viewCount: 1,
      })
    }
  } catch (error) {
    console.error('Error incrementing view count:', error)
  }
}

export async function getPostsByCategory(
  categorySlug: string,
  locale?: string
) {
  try {
    const conditions = [eq(categories.slug, categorySlug)]

    if (locale) {
      // Flexible locale filtering:
      // - Posts with locale = null can be accessed from any locale
      // - Posts with a specific locale can only be accessed from that locale
      conditions.push(or(eq(posts.locale, locale), isNull(posts.locale)))
    }

    const dbPosts = await db
      .select({
        id: posts.id,
        slug: posts.slug,
        title: posts.title,
        titleEn: posts.titleEn,
        titleVi: posts.titleVi,
        excerpt: posts.excerpt,
        excerptEn: posts.excerptEn,
        excerptVi: posts.excerptVi,
        coverImage: posts.coverImage,
        publishedAt: posts.publishedAt,
        isPublished: posts.isPublished,
        locale: posts.locale,
        createdAt: posts.createdAt,
        updatedAt: posts.updatedAt,
      })
      .from(posts)
      .innerJoin(postCategories, eq(posts.id, postCategories.postId))
      .innerJoin(categories, eq(postCategories.categoryId, categories.id))
      .where(and(...conditions))
      .orderBy(desc(posts.publishedAt || posts.createdAt))

    return dbPosts
  } catch (error) {
    console.error('Error fetching posts by category:', error)
    return []
  }
}

export async function getPostsByTag(tagSlug: string, locale?: string) {
  try {
    const conditions = [eq(tags.slug, tagSlug)]

    if (locale) {
      // Flexible locale filtering:
      // - Posts with locale = null can be accessed from any locale
      // - Posts with a specific locale can only be accessed from that locale
      conditions.push(or(eq(posts.locale, locale), isNull(posts.locale)))
    }

    const dbPosts = await db
      .select({
        id: posts.id,
        slug: posts.slug,
        title: posts.title,
        titleEn: posts.titleEn,
        titleVi: posts.titleVi,
        excerpt: posts.excerpt,
        excerptEn: posts.excerptEn,
        excerptVi: posts.excerptVi,
        coverImage: posts.coverImage,
        publishedAt: posts.publishedAt,
        isPublished: posts.isPublished,
        locale: posts.locale,
        createdAt: posts.createdAt,
        updatedAt: posts.updatedAt,
      })
      .from(posts)
      .innerJoin(postTags, eq(posts.id, postTags.postId))
      .innerJoin(tags, eq(postTags.tagId, tags.id))
      .where(and(...conditions))
      .orderBy(desc(posts.publishedAt || posts.createdAt))

    return dbPosts
  } catch (error) {
    console.error('Error fetching posts by tag:', error)
    return []
  }
}

export async function searchPosts(query: string, locale?: string) {
  try {
    const searchTerm = `%${query}%`
    const conditions = [
      or(
        ilike(posts.title, searchTerm),
        ilike(posts.titleEn, searchTerm),
        ilike(posts.titleVi, searchTerm),
        ilike(posts.excerpt, searchTerm),
        ilike(posts.excerptEn, searchTerm),
        ilike(posts.excerptVi, searchTerm)
      ),
    ]

    if (locale) {
      // Flexible locale filtering:
      // - Posts with locale = null can be accessed from any locale
      // - Posts with a specific locale can only be accessed from that locale
      conditions.push(or(eq(posts.locale, locale), isNull(posts.locale)))
    }

    const dbPosts = await db
      .select()
      .from(posts)
      .where(and(...conditions))
      .orderBy(desc(posts.publishedAt || posts.createdAt))

    return dbPosts
  } catch (error) {
    console.error('Error searching posts:', error)
    return []
  }
}

// Category and Tag management functions
export async function getAllCategories() {
  try {
    return await db.select().from(categories).orderBy(categories.name)
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

export async function getAllTags() {
  try {
    return await db.select().from(tags).orderBy(tags.name)
  } catch (error) {
    console.error('Error fetching tags:', error)
    return []
  }
}

export interface CreateCategoryResult {
  success: boolean
  error?: string
}

export interface CreateTagResult {
  success: boolean
  error?: string
}

export async function createCategory(
  slug: string,
  name: string,
  description?: string
): Promise<CreateCategoryResult> {
  try {
    // Check if slug exists
    const existing = await db
      .select()
      .from(categories)
      .where(eq(categories.slug, slug))
      .limit(1)

    if (existing.length > 0) {
      return { success: false, error: 'Category slug already exists' }
    }

    await db.insert(categories).values({
      slug,
      name,
      description: description || null,
    })

    revalidatePath('/admin/blog/categories')
    return { success: true }
  } catch (error) {
    console.error('Error creating category:', error)
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Failed to create category',
    }
  }
}

export async function createTag(
  slug: string,
  name: string
): Promise<CreateTagResult> {
  try {
    // Check if slug exists
    const existing = await db
      .select()
      .from(tags)
      .where(eq(tags.slug, slug))
      .limit(1)

    if (existing.length > 0) {
      return { success: false, error: 'Tag slug already exists' }
    }

    await db.insert(tags).values({
      slug,
      name,
    })

    revalidatePath('/admin/blog/tags')
    return { success: true }
  } catch (error) {
    console.error('Error creating tag:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create tag',
    }
  }
}
