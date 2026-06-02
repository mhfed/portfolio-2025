import type React from 'react'
import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'
import { LenisProvider } from '@/components/providers/lenis-provider'
import { Preloader } from '@/components/preloader'
import { NoiseOverlay } from '@/components/ui/noise-overlay'
import { CustomCursor } from '@/components/ui/custom-cursor'

const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
  variable: '--font-inter',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
  weight: ['400', '500', '600', '700'],
})

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
  weight: ['400', '500', '600'],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' className='dark' suppressHydrationWarning>
      <head>
        <link rel='manifest' href='/manifest.json' />
        <link rel='apple-touch-icon' href='/icon-192x192.png' />
        <meta name='theme-color' content='#050505' />
      </head>
      <body
        className={`${inter.className} ${spaceGrotesk.variable} ${jetBrainsMono.variable} bg-background text-foreground`}
      >
        <LenisProvider>
          <Preloader />
          <NoiseOverlay />
          <CustomCursor />
          {children}
        </LenisProvider>
        <Toaster />
      </body>
    </html>
  )
}
