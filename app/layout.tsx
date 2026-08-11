import localFont from 'next/font/local'
import type React from 'react'
import { THEME_STORAGE_KEY } from '@/lib/theme'
import './globals.css'
import '@/styles/brilio-refresh.css'

const urbanist = localFont({
  src: '../public/fonts/urbanist-variable.ttf',
  display: 'swap',
  variable: '--font-urbanist',
  weight: '100 900',
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
  '--font-body': 'var(--font-urbanist), "Avenir Next", sans-serif',
  '--font-display': 'var(--font-urbanist), "Avenir Next", sans-serif',
  '--font-mono': '"SFMono-Regular", Consolas, monospace',
  '--font-manrope': 'var(--font-urbanist), "Avenir Next", sans-serif',
  '--font-space-grotesk': 'var(--font-urbanist), "Avenir Next", sans-serif',
  '--font-jetbrains-mono': '"SFMono-Regular", Consolas, monospace',
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
        className={`${urbanist.variable} bg-background text-foreground antialiased`}
        style={fontProperties}
      >
        {children}
      </body>
    </html>
  )
}
