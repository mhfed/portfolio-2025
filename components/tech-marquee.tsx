import { cn } from '@/lib/utils'
import { Marquee } from './ui/marquee'
import StackIcon, { IconName } from 'tech-stack-icons'
import { Database, Smartphone, FileCode } from 'lucide-react'
import { ComponentType } from 'react'

interface TechItem {
  name: string
  iconName?: IconName
  IconComponent?: ComponentType<{ className?: string }>
}

const technologies: TechItem[] = [
  { name: 'React', iconName: 'react' },
  { name: 'Next.js', iconName: 'nextjs' },
  { name: 'TypeScript', iconName: 'typescript' },
  { name: 'JavaScript', IconComponent: FileCode },
  { name: 'Tailwind CSS', iconName: 'tailwindcss' },
  { name: 'Node.js', iconName: 'nodejs' },
  { name: 'Redux', iconName: 'redux' },
  { name: 'React Native', IconComponent: Smartphone },
  { name: 'HTML', iconName: 'html5' },
  { name: 'CSS', iconName: 'css3' },
  { name: 'Git', iconName: 'git' },
  { name: 'Vercel', iconName: 'vercel' },
  { name: 'PostgreSQL', iconName: 'postgresql' },
  { name: 'Drizzle', IconComponent: Database },
]

const firstRow = technologies.slice(0, Math.ceil(technologies.length / 2))
const secondRow = technologies.slice(Math.ceil(technologies.length / 2))

const TechCard = ({ name, iconName, IconComponent }: TechItem) => {
  return (
    <div
      className={cn(
        'group relative flex shrink-0 cursor-pointer flex-row items-center gap-3 border-r border-white/10 px-5 py-4 transition-all duration-300 md:px-7',
        'text-foreground/72 hover:text-foreground'
      )}
    >
      <div className='flex h-5 w-5 shrink-0 items-center justify-center text-primary/78 transition-transform duration-300 group-hover:translate-y-[-1px] group-hover:text-primary'>
        {IconComponent ? (
          <IconComponent className='h-full w-full' />
        ) : iconName ? (
          <StackIcon name={iconName as IconName} className='w-full h-full' />
        ) : null}
      </div>
      <span className='whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.24em]'>
        {name}
      </span>
    </div>
  )
}

export function TechMarquee() {
  return (
    <div className='relative flex w-full flex-col items-center justify-center overflow-hidden py-3 md:py-4'>
      <Marquee pauseOnHover className='p-0 [--duration:24s] [--gap:0rem]'>
        {firstRow.map((tech) => (
          <TechCard key={tech.name} {...tech} />
        ))}
      </Marquee>
      <Marquee
        reverse
        pauseOnHover
        className='border-t border-white/10 p-0 [--duration:26s] [--gap:0rem]'
      >
        {secondRow.map((tech) => (
          <TechCard key={tech.name} {...tech} />
        ))}
      </Marquee>
    </div>
  )
}
