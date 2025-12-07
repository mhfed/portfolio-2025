import {
  pgTable,
  serial,
  text,
  timestamp,
  pgEnum,
  integer,
} from "drizzle-orm/pg-core";

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  year: text("year"),
  description: text("description").notNull(),
  details: text("details"),
  imageUrl: text("image_url").notNull(),
  liveUrl: text("live_url"),
  githubUrl: text("github_url"),
  techStack: text("tech_stack").array(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const experiences = pgTable("experiences", {
  id: serial("id").primaryKey(),
  company: text("company").notNull(),
  position: text("position").notNull(),
  period: text("period").notNull(),
  location: text("location"),
  description: text("description").notNull(),
  skills: text("skills").array(),
  orderIndex: integer("order_index"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
