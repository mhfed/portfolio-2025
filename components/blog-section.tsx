import { SectionTitle } from "./section-title"

interface BlogPostProps {
  title: string
  date: string
  readTime: string
  excerpt: string
  icon: string
}

function BlogCard({ title, date, readTime, excerpt, icon }: BlogPostProps) {
  return (
    <div className="border-2 border-primary rounded-lg p-6 md:p-8 space-y-4 hover:border-accent transition-colors scroll-animate">
      <div className="flex items-start gap-3">
        <span className="text-2xl">{icon}</span>
        <div className="flex-1">
          <h3 className="text-xl md:text-2xl font-black text-foreground">{title}</h3>
          <p className="text-xs md:text-sm text-accent">
            {date} • {readTime}
          </p>
        </div>
      </div>
      <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{excerpt}</p>
      <button className="text-accent font-bold text-sm md:text-base hover:opacity-80 transition-opacity">
        READ MORE →
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
  const posts: BlogPostProps[] = [
    {
      title: "Building a Magical 3D Button",
      date: "12 March 2021",
      readTime: "5 min read",
      excerpt:
        "Every action we take on the web starts with a button click, and yet most buttons are ho-hum and uninspired. In this tutorial, we'll build an animated 3D button with HTML and CSS that sparks joy.",
      icon: "⚛️",
    },
    {
      title: "Advanced React Patterns",
      date: "20 April 2021",
      readTime: "8 min read",
      excerpt:
        "Explore advanced patterns in React including render props, compound components, and custom hooks to make your code more flexible and reusable.",
      icon: "⚛️",
    },
  ]

  const categories: CategoryProps[] = [
    { name: "REACT", icon: "⚛️", color: "blue" },
    { name: "WORDPRESS", icon: "W", color: "red" },
    { name: "CSS", icon: "C", color: "blue" },
    { name: "ANIMATION", icon: "A", color: "blue" },
    { name: "JAVASCRIPT", icon: "J", color: "blue" },
    { name: "OTHER", icon: "•••", color: "blue" },
  ]

  return (
    <section id="blog" className="min-h-screen flex flex-col justify-center py-24 px-6 bg-background scroll-mt-20">
      <div className="max-w-6xl mx-auto w-full space-y-16">
        <SectionTitle title="RECENTLY PUBLISHED" />
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            {posts.map((post, idx) => (
              <BlogCard key={idx} {...post} />
            ))}
          </div>
          <div className="space-y-6 scroll-animate">
            <div>
              <h3 className="text-xl font-black text-accent mb-4 flex items-center gap-2">
                <span>❖</span> ALL CATEGORIES
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
