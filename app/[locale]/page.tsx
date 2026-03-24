import { Header } from '@/components/header'
import { HeroSection } from '@/components/hero-section'
import { AboutSection } from '@/components/about-section'
import { WorkExperienceSection } from '@/components/work-experience-section'
import { ProjectsSection } from '@/components/projects-section'
import { BlogSection } from '@/components/blog-section'
import { Footer } from '@/components/footer'
import { ScrollToTop } from '@/components/scroll-to-top'
import { FloatingCTA } from '@/components/floating-cta'
import { getLocale } from 'next-intl/server'
import {
  BookText,
  FolderOpen,
  LayoutDashboard,
  Send,
  SquareTerminal,
  UserRound,
} from 'lucide-react'

export default async function Home() {
  const locale = await getLocale()
  const sideLinks = [
    { label: 'root', href: '#home-top', icon: LayoutDashboard },
    { label: 'projects', href: '#projects', icon: FolderOpen },
    { label: 'logs', href: '#experience', icon: SquareTerminal },
    { label: 'profile', href: '#about', icon: UserRound },
    { label: 'blog', href: '#blog', icon: BookText },
  ]

  return (
    <main className='w-full pb-8'>
      <Header />

      <div className='mx-auto max-w-[1600px] px-4 md:px-6 lg:px-8'>
        <div className='lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-8'>
          <aside className='hidden lg:block'>
            <div className='sticky top-[calc(var(--header-height)+24px)] space-y-4'>
              <div className='terminal-panel px-5 py-6'>
                <div className='mb-4 flex items-center gap-3'>
                  <span className='h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_18px_var(--primary)]' />
                  <span className='font-mono text-[10px] uppercase tracking-[0.3em] text-primary'>
                    node_v25
                  </span>
                </div>
                <p className='font-mono text-[10px] uppercase tracking-[0.24em] text-foreground/55'>
                  Status: optimal
                </p>
              </div>

              <nav className='terminal-panel p-3'>
                <div className='space-y-1'>
                  {sideLinks.map((item) => {
                    const Icon = item.icon

                    return (
                      <a
                        key={item.href}
                        href={item.href}
                        className='flex items-center gap-3 rounded-2xl px-3 py-3 font-mono text-[11px] uppercase tracking-[0.24em] text-foreground/68 transition-all duration-300 hover:bg-primary/10 hover:text-primary'
                      >
                        <Icon className='h-4 w-4' />
                        {item.label}
                      </a>
                    )
                  })}
                </div>
              </nav>

              <a
                href='#collaborate'
                className='flex items-center justify-center gap-2 rounded-2xl border border-primary/20 bg-primary px-4 py-3 font-mono text-[11px] uppercase tracking-[0.24em] text-primary-foreground transition-transform duration-300 hover:scale-[1.01]'
              >
                <Send className='h-4 w-4' />
                initialize_cmd
              </a>
            </div>
          </aside>

          <div className='min-w-0 space-y-6 lg:space-y-8'>
            <HeroSection />
            <ProjectsSection />
            <WorkExperienceSection />
            <AboutSection />
            <BlogSection />
            <Footer locale={locale} />
          </div>
        </div>
      </div>

      <FloatingCTA />
      <ScrollToTop />
    </main>
  )
}
