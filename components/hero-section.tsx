import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import { Terminal, Database, Cloud, Wrench, Smartphone, Server, CodeXml, Code2Icon, CodeIcon } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface TechCategory {
  label: string
  description: string
  Icon: LucideIcon
}

const techCategories: TechCategory[] = [
  { label: 'Frontend', description: 'React, Next.js, TypeScript', Icon: Terminal },
  { label: 'Backend', description: 'Node.js, Go, Python', Icon: Database },
  { label: 'Cloud', description: 'AWS, Docker, Vercel', Icon: Cloud },
  { label: 'Tools', description: 'Git, Neovim, Tmux', Icon: Wrench },
  { label: 'Mobile', description: 'React Native, Flutter', Icon: Smartphone },
  { label: 'Database', description: 'PostgreSQL, Redis', Icon: Server },
]

const recentActivity = [
  { text: "Shipped new feature on 'coolmate'", dim: false },
  { text: "Resolved perf issue — LCP -40%", dim: false },
  { text: 'Updated portfolio v3.0', dim: true },
]

export async function HeroSection() {
  const t = await getTranslations('hero')

  return (
    <section id='about' className='w-full max-w-[1200px] mx-auto px-6 py-12'>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24'>
        {/* Left column - Hero + Tech Stack */}
        <div className='lg:col-span-8 flex flex-col gap-8'>
          {/* Hero Card */}
          <div className='bg-card border-2 border-foreground p-8 shadow-neo-dark dark:shadow-neo relative overflow-hidden'>
            <div className='absolute top-2 right-2 md:top-4 md:right-4 p-2 opacity-10'>
              <CodeIcon size={68} />
            </div>
            <div className='relative z-10'>
              <span className='mono-text text-primary font-bold mb-4 block'>// GREETING_SEQUENCE</span>
              <h1 className='text-5xl md:text-6xl font-bold mb-6 tracking-tighter uppercase leading-[0.9]'>
                {t('front')} <br /> <span className='text-primary'>{t('middle')} {t('end')}</span>
              </h1>
              <p className='text-xl max-w-2xl text-muted-foreground leading-relaxed mb-8'>
                Creative Developer &amp; Technical Architect specialized in building high-performance
                web systems with a focus on{' '}
                <span className='underline decoration-primary decoration-4 underline-offset-4'>
                  modular architecture
                </span>{' '}
                and user experience.
              </p>
              <div className='flex flex-wrap gap-4'>
                <a
                  href={`mailto:${t('contact.email')}`}
                  className='bg-primary text-white px-8 py-3 font-bold mono-text shadow-neo-dark transition-all hover:-translate-y-1'
                >
                  INITIATE_CONTACT
                </a>
                <div className='flex items-center gap-2 px-4 py-3 border-2 border-foreground font-bold mono-text text-sm'>
                  <span className='w-2 h-2 rounded-full bg-green-500 animate-pulse'></span>
                  AVAILABLE_FOR_PROJECTS
                </div>
              </div>
            </div>
          </div>

          {/* Tech Stack Grid */}
          <div id='stack' className='flex flex-col gap-4'>
            <div className='flex items-center justify-between border-b-2 border-foreground/10 pb-2'>
              <h2 className='text-2xl font-bold mono-text'>/root/tech-stack</h2>
              <span className='text-xs mono-text text-muted-foreground'>6 items found</span>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              {techCategories.map((cat) => (
                <div
                  key={cat.label}
                  className='group border-2 border-foreground p-5 hover:bg-primary hover:text-white transition-all'
                >
                  <cat.Icon className='mb-3 w-6 h-6 text-primary group-hover:text-white transition-colors' />
                  <h3 className='font-bold uppercase mb-1'>{cat.label}</h3>
                  <p className='text-sm opacity-70 mono-text'>{cat.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column - Profile & Activity */}
        <aside className='lg:col-span-4 flex flex-col gap-8'>
          {/* Profile Card */}
          <div className='border-2 border-foreground bg-background dark:bg-card p-6 shadow-neo-dark dark:shadow-neo'>
            <div className='aspect-square bg-muted mb-6 border-2 border-foreground overflow-hidden grayscale contrast-125'>
              <Image
                src='https://res.cloudinary.com/dt3epooyc/image/upload/v1769702375/portfolio/yddxvjkmf3cceyw5ijwo.jpg'
                alt='Profile of Minh Hieu'
                width={400}
                height={400}
                priority={true}
                className='w-full h-full object-cover object-top'
              />
            </div>
            <div className='flex flex-col gap-4'>
              <div className='border-l-4 border-primary pl-4'>
                <p className='text-xs mono-text uppercase text-muted-foreground'>Location</p>
                <p className='font-bold'>Vietnam, Earth</p>
              </div>
              <div className='border-l-4 border-primary pl-4'>
                <p className='text-xs mono-text uppercase text-muted-foreground'>Experience</p>
                <p className='font-bold'>6+ Years Coding</p>
              </div>
              <div className='border-l-4 border-primary pl-4'>
                <p className='text-xs mono-text uppercase text-muted-foreground'>Specialty</p>
                <p className='font-bold'>System Architecture</p>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className='border-2 border-foreground p-6 flex flex-col gap-4'>
            <h3 className='font-bold mono-text border-b border-foreground/10 pb-2'>/logs/recent_activity</h3>
            <ul className='text-sm flex flex-col gap-3 mono-text'>
              {recentActivity.map((item, i) => (
                <li key={i} className={`flex gap-2 ${item.dim ? 'opacity-50' : ''}`}>
                  <span className='text-primary'>&gt;&gt;&gt;</span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </section>
  )
}
