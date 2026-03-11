import { getTranslations } from 'next-intl/server'
import { SectionTitle } from './section-title'

export async function AboutSection() {
  const t = await getTranslations('about')
  const tTech = await getTranslations('technologies')

  const techCategories = [
    { key: 'frontend', icon: '>_' },
    { key: 'stateManagement', icon: '{}' },
    { key: 'uiLibraries', icon: '◐' },
    { key: 'mobile', icon: '📱' },
    { key: 'apis', icon: '⇄' },
    { key: 'tools', icon: '⚙' },
  ]

  return (
    <section id='about' className='w-full max-w-[1200px] mx-auto px-6'>
      <div className='flex items-center justify-between border-b-2 border-foreground/10 pb-2 mb-8'>
        <h2 className='text-2xl font-bold mono-text'>/root/about</h2>
      </div>
      <div className='space-y-8'>
        <p className='text-base md:text-lg text-muted-foreground leading-relaxed'>
          {t('description1')}
        </p>

        {/* Tech Stack Grid - Neo-brutalist cards */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          {techCategories.map((cat) => (
            <div
              key={cat.key}
              className='group border-2 border-foreground p-5 hover:bg-primary hover:text-white transition-all'
            >
              <span className='mono-text text-2xl mb-3 block text-primary group-hover:text-white transition-colors'>
                {cat.icon}
              </span>
              <h3 className='font-bold uppercase mb-1'>{tTech(`${cat.key}.title`)}</h3>
              <p className='text-sm opacity-70 mono-text'>{tTech(`${cat.key}.description`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
