"use client"

import { useTranslations } from "next-intl"
import { useParams } from "next/navigation"
import { SectionTitle } from "./section-title"
import { blogPosts, type BlogPost } from "@/data/blog-posts"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

interface BlogCardProps {
  post: BlogPost
  locale: "en" | "vi"
  readMoreText: string
}

function BlogCard({ post, locale, readMoreText }: BlogCardProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 })

  return (
    <div
      ref={ref}
      className={`border-2 border-primary rounded-lg p-6 md:p-8 space-y-4 hover:border-accent transition-all duration-700 ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8"
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
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-body-sm font-medium text-primary"
          >
            {tag}
          </span>
        ))}
      </div>
      <button className="text-accent font-semibold text-body hover:opacity-80 transition-opacity cursor-pointer">
        {readMoreText}
      </button>
    </div>
  )
}

interface CategoryProps {
  name: string
  icon: string
  color?: "blue" | "red"
}

function CategoryTag({ name, icon, color = "blue" }: CategoryProps) {
  const bgColor = color === "blue" ? "bg-primary" : "bg-accent"
  return (
    <button
      className={`${bgColor} text-white font-bold px-6 py-3 rounded-full flex items-center gap-2 hover:opacity-90 transition-opacity w-full md:w-auto`}
    >
      <span>{icon}</span>
      {name}
    </button>
  )
}

export function BlogSection() {
  const t = useTranslations('blog')
  const params = useParams()
  const locale = (params?.locale as "en" | "vi") || "en"

  // Get unique categories from blog posts
  const categories = Array.from(new Set(blogPosts.map((post) => post.category))).map((cat) => ({
    name: cat,
    icon: blogPosts.find((p) => p.category === cat)?.icon || "📝",
    color: cat === "REACT" || cat === "NEXT.JS" ? ("blue" as const) : ("red" as const),
  }))

  return (
    <section id="blog" className="min-h-screen flex flex-col justify-center py-24 px-6 bg-background scroll-mt-16">
      <div className="max-w-7xl mx-auto w-full space-y-16">
        <SectionTitle title={t('title')} />
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            {blogPosts.map((post) => (
              <BlogCard key={post.id} post={post} locale={locale} readMoreText={t('readMore')} />
            ))}
          </div>
          <div className="space-y-6 scroll-animate">
            <div>
              <h3 className="text-xl font-black text-accent mb-4 flex items-center gap-2">
                <span>❖</span> {t('allCategories')}
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
  )
}
