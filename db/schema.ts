import {
  pgTable,
  serial,
  text,
  timestamp,
  pgEnum,
  integer,
  unique,
} from 'drizzle-orm/pg-core';

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
});

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
});

export const localeSettings = pgTable(
  'locale_settings',
  {
    id: serial('id').primaryKey(),
    locale: text('locale').notNull(),
    key: text('key').notNull(),
    value: text('value').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => ({
    uniqueLocaleKey: unique().on(table.locale, table.key),
  })
);
