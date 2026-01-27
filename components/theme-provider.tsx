'use client'

import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'

interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const applyTheme = () => {
      const savedTheme = localStorage.getItem('theme')

      // Nếu không có theme được lưu, default là dark
      if (!savedTheme) {
        document.documentElement.classList.add('dark')
      } else {
        // Nếu có theme được set manually, sử dụng theme đó
        if (savedTheme === 'dark') {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      }
    }

    // Apply theme lần đầu
    applyTheme()
    setMounted(true)
  }, [])

  if (!mounted) return null

  return <>{children}</>
}
