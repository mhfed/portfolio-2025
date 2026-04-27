import {
  pgTable,
  serial,
  text,
  timestamp,
  integer,
  unique,
  boolean,
  jsonb,
  index,
} from 'drizzle-orm/pg-core'

export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  titleEn: text('title_en'),
  titleVi: text('title_vi'),
  year: text('year'),
  description: text('description').notNull(),
  descriptionEn: text('description_en'),
  descriptionVi: text('description_vi'),
  details: text('details'),
  detailsEn: text('details_en'),
  detailsVi: text('details_vi'),
  imageUrl: text('image_url').notNull(),
  liveUrl: text('live_url'),
  githubUrl: text('github_url'),
  techStack: text('tech_stack').array(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const experiences = pgTable('experiences', {
  id: serial('id').primaryKey(),
  company: text('company').notNull(),
  companyEn: text('company_en'),
  companyVi: text('company_vi'),
  position: text('position').notNull(),
  positionEn: text('position_en'),
  positionVi: text('position_vi'),
  period: text('period').notNull(),
  location: text('location'),
  locationEn: text('location_en'),
  locationVi: text('location_vi'),
  description: text('description').notNull(),
  descriptionEn: text('description_en'),
  descriptionVi: text('description_vi'),
  skills: text('skills').array(),
  orderIndex: integer('order_index'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

// Blog schema
export const posts = pgTable(
  'posts',
  {
    id: serial('id').primaryKey(),
    slug: text('slug').notNull(),
    title: text('title').notNull(),
    titleEn: text('title_en'),
    titleVi: text('title_vi'),
    excerpt: text('excerpt'),
    excerptEn: text('excerpt_en'),
    excerptVi: text('excerpt_vi'),
    content: jsonb('content'),
    contentEn: jsonb('content_en'),
    contentVi: jsonb('content_vi'),
    coverImage: text('cover_image'),
    publishedAt: timestamp('published_at'),
    isPublished: boolean('is_published').default(false),
    locale: text('locale'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => ({
    slugIdx: index('posts_slug_idx').on(table.slug),
    slugUnique: unique('posts_slug_unique').on(table.slug),
  })
)

export const categories = pgTable(
  'categories',
  {
    id: serial('id').primaryKey(),
    slug: text('slug').notNull(),
    name: text('name').notNull(),
    description: text('description'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => ({
    slugUnique: unique('categories_slug_unique').on(table.slug),
  })
)

export const tags = pgTable(
  'tags',
  {
    id: serial('id').primaryKey(),
    slug: text('slug').notNull(),
    name: text('name').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => ({
    slugUnique: unique('tags_slug_unique').on(table.slug),
  })
)

export const postCategories = pgTable(
  'post_categories',
  {
    postId: integer('post_id')
      .notNull()
      .references(() => posts.id, { onDelete: 'cascade' }),
    categoryId: integer('category_id')
      .notNull()
      .references(() => categories.id, { onDelete: 'cascade' }),
  },
  (table) => ({
    uniquePostCategory: unique('post_categories_unique').on(
      table.postId,
      table.categoryId
    ),
  })
)

export const postTags = pgTable(
  'post_tags',
  {
    postId: integer('post_id')
      .notNull()
      .references(() => posts.id, { onDelete: 'cascade' }),
    tagId: integer('tag_id')
      .notNull()
      .references(() => tags.id, { onDelete: 'cascade' }),
  },
  (table) => ({
    uniquePostTag: unique('post_tags_unique').on(table.postId, table.tagId),
  })
)

export const views = pgTable('views', {
  id: serial('id').primaryKey(),
  postId: integer('post_id')
    .notNull()
    .references(() => posts.id, { onDelete: 'cascade' })
    .unique(),
  viewCount: integer('view_count').default(0),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})
