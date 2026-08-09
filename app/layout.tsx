import type React from 'react'
import { Nunito_Sans } from 'next/font/google'
import { THEME_STORAGE_KEY } from '@/lib/theme'
import './globals.css'

const nunitoSans = Nunito_Sans({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-nunito-sans',
})

const themeInitializer = `
  (() => {
    const root = document.documentElement;
    let mode = 'light';

    try {
      const savedMode = window.localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});
      mode = savedMode === 'light' || savedMode === 'dark'
        ? savedMode
        : window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light';
    } catch {
      mode = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }

    root.classList.toggle('dark', mode === 'dark');
    root.dataset.theme = mode;
    root.style.colorScheme = mode;
  })();
`

type FontProperties = React.CSSProperties &
  Record<
    | '--font-body'
    | '--font-display'
    | '--font-mono'
    | '--font-manrope'
    | '--font-space-grotesk'
    | '--font-jetbrains-mono',
    string
  >

const fontProperties: FontProperties = {
  '--font-body': 'var(--font-nunito-sans)',
  '--font-display': 'var(--font-nunito-sans)',
  '--font-mono': 'var(--font-nunito-sans)',
  '--font-manrope': 'var(--font-nunito-sans)',
  '--font-space-grotesk': 'var(--font-fredoka)',
  '--font-jetbrains-mono': 'var(--font-nunito-sans)',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <link rel='manifest' href='/manifest.json' />
        <link rel='icon' href='/brand-mark.svg' type='image/svg+xml' />
        <link rel='apple-touch-icon' href='/icon-192x192.png' />
        <meta
          name='theme-color'
          media='(prefers-color-scheme: light)'
          content='#f3f3ef'
        />
        <meta
          name='theme-color'
          media='(prefers-color-scheme: dark)'
          content='#121210'
        />
        <script dangerouslySetInnerHTML={{ __html: themeInitializer }} />
      </head>
      <body
        className={`${nunitoSans.className} ${nunitoSans.variable} bg-background text-foreground antialiased`}
        style={fontProperties}
      >
        {children}
      </body>
    </html>
  )
}
