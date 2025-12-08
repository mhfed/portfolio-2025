CREATE TABLE "locale_settings" (
	"id" serial PRIMARY KEY NOT NULL,
	"locale" text NOT NULL,
	"key" text NOT NULL,
	"value" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "locale_settings_locale_key_unique" UNIQUE("locale","key")
);
