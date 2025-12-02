import { pgTable, serial, text, timestamp, pgEnum } from "drizzle-orm/pg-core";

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

