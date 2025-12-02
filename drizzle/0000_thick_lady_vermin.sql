CREATE TABLE "projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"year" text,
	"description" text NOT NULL,
	"details" text,
	"image_url" text NOT NULL,
	"live_url" text,
	"github_url" text,
	"tech_stack" text[],
	"created_at" timestamp DEFAULT now() NOT NULL
);
