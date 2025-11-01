import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const geist = Geist({ subsets: ["latin"] })
const geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Nguyen Minh Hieu - Frontend Developer Portfolio",
  description: "Frontend Developer with 5+ years of experience in React.js, Next.js, TypeScript. Specialized in building modern web applications with clean code and exceptional user experiences.",
  keywords: [
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "Web Developer",
    "React.js",
    "Next.js",
    "JavaScript",
    "Portfolio",
    "Nguyen Minh Hieu"
  ],
  authors: [{ name: "Nguyen Minh Hieu" }],
  creator: "Nguyen Minh Hieu",
  openGraph: {
    type: "website",
    title: "Nguyen Minh Hieu - Frontend Developer Portfolio",
    description: "Frontend Developer with 5+ years of experience in React.js, Next.js, TypeScript",
    siteName: "Nguyen Minh Hieu Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nguyen Minh Hieu - Frontend Developer",
    description: "Frontend Developer with 5+ years of experience in React.js, Next.js, TypeScript",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geist.className} bg-background text-foreground`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
