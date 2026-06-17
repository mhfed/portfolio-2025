import type React from 'react'
import {
  Inter_Tight,
  JetBrains_Mono,
  Space_Grotesk,
  Manrope,
} from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { Toaster } from '@/components/ui/toaster'

const interTight = Inter_Tight({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-inter-tight',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-space-grotesk',
})

const manrope = Manrope({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-manrope',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <link rel='manifest' href='/manifest.json' />
        <link rel='apple-touch-icon' href='/icon-192x192.png' />
        <meta name='theme-color' content='#07110c' />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const savedTheme = localStorage.getItem('theme');
                const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                const activeTheme = savedTheme || systemTheme;
                document.documentElement.classList.toggle('dark', activeTheme === 'dark');

                const savedAccent = localStorage.getItem('accent-theme') || 'cobalt';
                document.documentElement.dataset.accentTheme = savedAccent;
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body
        className={`${interTight.className} ${interTight.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} ${manrope.variable} bg-background text-foreground antialiased`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  )
}
