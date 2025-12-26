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
        'relative flex flex-row items-center gap-3 px-4 py-3 cursor-pointer rounded-full border transition-all duration-300 shrink-0',
        // light styles
        'border-border/50 bg-background/50 hover:bg-background hover:border-primary/50',
        // dark styles
        'dark:border-border/50 dark:bg-background/30 dark:hover:bg-background/50 dark:hover:border-primary/50'
      )}
    >
      <div className='w-6 h-6 shrink-0 flex items-center justify-center'>
        {IconComponent ? (
          <IconComponent className='w-full h-full text-foreground/80' />
        ) : iconName ? (
          <StackIcon name={iconName as IconName} className='w-full h-full' />
        ) : null}
      </div>
      <span className='text-sm font-medium text-foreground/80 whitespace-nowrap'>
        {name}
      </span>
    </div>
  )
}

export function TechMarquee() {
  return (
    <div className='relative flex w-full flex-col items-center justify-center overflow-hidden py-8 '>
      <Marquee pauseOnHover className='[--duration:20s]'>
        {firstRow.map((tech) => (
          <TechCard key={tech.name} {...tech} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className='[--duration:20s]'>
        {secondRow.map((tech) => (
          <TechCard key={tech.name} {...tech} />
        ))}
      </Marquee>
      <div className='from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r'></div>
      <div className='from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l'></div>
    </div>
  )
}
