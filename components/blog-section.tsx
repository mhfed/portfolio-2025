"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { SectionTitle } from "./section-title";
import { blogPosts, type BlogPost } from "@/data/blog-posts";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

interface BlogCardProps {
  post: BlogPost;
  locale: "en" | "vi";
  readMoreText: string;
}

function BlogCard({ post, locale, readMoreText }: BlogCardProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`border-2 border-primary rounded-lg p-6 md:p-8 space-y-4 hover:border-accent transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl">{post.icon}</span>
        <div className="flex-1">
          <h3 className="text-h3 text-foreground">{post.title[locale]}</h3>
          <p className="text-body-sm text-accent">
            {post.date} • {post.readTime}
          </p>
        </div>
      </div>
      <p className="text-body text-muted-foreground">{post.excerpt[locale]}</p>
      <div className="flex flex-wrap gap-2 mt-3">
        {post.tags.map((tag, idx) => {
          const variants: Array<"primary" | "cyan" | "green" | "pink" | "orange"> = [
            "primary",
            "cyan",
            "green",
            "pink",
            "orange",
          ];
          return (
            <Badge
              key={tag}
              variant={variants[idx % variants.length]}
              className="text-body-sm"
            >
              {tag}
            </Badge>
          );
        })}
      </div>
      <Button variant="ghost" className="text-accent font-semibold text-body hover:opacity-80 p-0 h-auto">
        {readMoreText}
      </Button>
    </div>
  );
}

interface CategoryProps {
  name: string;
  icon: string;
  color?: "blue" | "red" | "green" | "orange" | "cyan";
}

function CategoryTag({ name, icon, color = "blue" }: CategoryProps) {
  const colorClasses: Record<string, string> = {
    blue: "bg-primary text-primary-foreground hover:bg-primary/90",
    red: "bg-[var(--pink)] text-[var(--pink-foreground)] hover:bg-[var(--pink)]/90",
    green: "bg-[var(--green)] text-[var(--green-foreground)] hover:bg-[var(--green)]/90",
    orange: "bg-[var(--orange)] text-[var(--orange-foreground)] hover:bg-[var(--orange)]/90",
    cyan: "bg-[var(--cyan)] text-[var(--cyan-foreground)] hover:bg-[var(--cyan)]/90",
  };
  return (
    <Button
      className={`${colorClasses[color] || colorClasses.blue} font-bold px-6 py-3 flex items-center gap-2 w-full md:w-auto`}
    >
      <span>{icon}</span>
      {name}
    </Button>
  );
}

export function BlogSection() {
  const t = useTranslations("blog");
  const params = useParams();
  const locale = (params?.locale as "en" | "vi") || "en";

  // Get unique categories from blog posts
  const categories = Array.from(
    new Set(blogPosts.map((post) => post.category)),
  ).map((cat, idx) => {
    const colors: Array<"blue" | "red" | "green" | "orange" | "cyan"> = [
      "blue",
      "cyan",
      "green",
      "orange",
      "red",
    ];
    return {
      name: cat,
      icon: blogPosts.find((p) => p.category === cat)?.icon || "📝",
      color: colors[idx % colors.length],
    };
  });

  return (
    <section
      id="blog"
      className="min-h-screen flex flex-col justify-center py-8 md:py-12 lg:py-16 px-6 scroll-mt-16 relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 via-transparent to-[var(--pink)]/5" />
        <div className="absolute bottom-0 right-0 w-1/2 h-full bg-gradient-to-tl from-[var(--cyan)]/5 to-transparent" />
      </div>
      <div className="max-w-7xl mx-auto w-full space-y-8 md:space-y-10 lg:space-y-12 relative z-10">
        <SectionTitle title={t("title")} />
        <div className="grid md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          <div className="md:col-span-2 space-y-4 md:space-y-6">
            {blogPosts.map((post) => (
              <BlogCard
                key={post.id}
                post={post}
                locale={locale}
                readMoreText={t("readMore")}
              />
            ))}
          </div>
          <div className="space-y-4 md:space-y-6 scroll-animate">
            <div>
              <h3 className="text-xl font-black text-accent mb-4 flex items-center gap-2">
                <span>❖</span> {t("allCategories")}
              </h3>
            </div>
            <div className="space-y-3">
              {categories.map((cat, idx) => (
                <CategoryTag key={idx} {...cat} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
