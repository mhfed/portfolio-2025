import { getTranslations } from 'next-intl/server'

interface FooterProps {
  locale: string
}

export async function Footer({ locale }: FooterProps) {
  const tContact = await getTranslations('hero.contact')

  return (
    <>
      {/* Footer */}
      <footer className='w-full max-w-[1200px] mx-auto mt-8 md:mt-12 px-6 py-8 border-t-2 border-foreground flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-12'>
        <div className='flex flex-col gap-1'>
          <h2 className='text-xl font-bold uppercase'>Minh Hieu © {new Date().getFullYear()}</h2>
          <p className='mono-text text-xs opacity-50'>BUILT_WITH_PRECISION_AND_PASSION</p>
        </div>
        <div className='flex flex-wrap gap-4 md:gap-6 mono-text text-sm'>
          <a className='hover:text-primary transition-colors' href='https://github.com/mhfed' target='_blank' rel='noopener noreferrer'>GITHUB</a>
          <a className='hover:text-primary transition-colors' href='https://linkedin.com/in/mhfed' target='_blank' rel='noopener noreferrer'>LINKEDIN</a>
          <a className='hover:text-primary transition-colors' href='https://twitter.com/mhfed' target='_blank' rel='noopener noreferrer'>TWITTER</a>
          <a className='hover:text-primary transition-colors' href={`mailto:${tContact('email')}`}>E-MAIL</a>
        </div>
        <div className='flex items-center gap-2'>
          <span className='text-xs mono-text'>LATEST_SYNC:</span>
          <span className='text-xs mono-text font-bold bg-green-500/20 text-green-600 dark:text-green-400 px-2 py-1'>SUCCESSFUL</span>
        </div>
      </footer>
    </>
  )
}
