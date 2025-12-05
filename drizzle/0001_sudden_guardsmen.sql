CREATE TABLE "experiences" (
	"id" serial PRIMARY KEY NOT NULL,
	"company" text NOT NULL,
	"position" text NOT NULL,
	"period" text NOT NULL,
	"location" text,
	"description" text NOT NULL,
	"skills" text[],
	"order_index" integer,
	"created_at" timestamp DEFAULT now() NOT NULL
);
