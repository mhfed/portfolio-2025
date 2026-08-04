import type React from 'react'
import { Geist, Geist_Mono } from 'next/font/google'
import { THEME_STORAGE_KEY } from '@/lib/theme'
import './globals.css'

const geistSans = Geist({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-geist-sans',
})

const geistMono = Geist_Mono({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-geist-mono',
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
  '--font-body': 'var(--font-geist-sans)',
  '--font-display': 'var(--font-geist-sans)',
  '--font-mono': 'var(--font-geist-mono)',
  '--font-manrope': 'var(--font-geist-sans)',
  '--font-space-grotesk': 'var(--font-geist-sans)',
  '--font-jetbrains-mono': 'var(--font-geist-mono)',
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
        className={`${geistSans.className} ${geistSans.variable} ${geistMono.variable} bg-background text-foreground antialiased`}
        style={fontProperties}
      >
        {children}
      </body>
    </html>
  )
}
