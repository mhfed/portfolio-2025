"use client"

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { usePathname } from '@/i18n/routing';
import { useRouter } from '@/i18n/routing';
import { routing } from '@/i18n/routing';

export function useLocale() {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Get locale from params (from [locale] segment)
  const locale = (params?.locale as string) || routing.defaultLocale;

  const setLocale = (newLocale: 'en' | 'vi') => {
    if (locale === newLocale) return;
    
    setIsLoading(true);
    // Use next-intl's router to navigate to the same path with new locale
    router.replace(pathname, { locale: newLocale });
    
    // Reset loading state after navigation
    setTimeout(() => setIsLoading(false), 500);
  };

  return { locale, setLocale, isLoading };
}
