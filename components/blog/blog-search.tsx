'use client'

import { useState, useEffect } from 'react'
import { Command } from 'cmdk'
import { useRouter } from 'next/navigation'
import { useLocale } from '@/hooks/use-locale'
import { searchPosts } from '@/actions/post-actions'
import { Search, FileText } from 'lucide-react'

interface BlogSearchProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function BlogSearch({ open, onOpenChange }: BlogSearchProps) {
  const [search, setSearch] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const router = useRouter()
  const { locale } = useLocale()

  useEffect(() => {
    if (!open) {
      setSearch('')
      setResults([])
      return
    }
  }, [open])

  useEffect(() => {
    if (search.length < 2) {
      setResults([])
      return
    }

    const timeoutId = setTimeout(async () => {
      setIsSearching(true)
      try {
        const posts = await searchPosts(search, locale)
        setResults(posts)
      } catch (error) {
        console.error('Error searching posts:', error)
        setResults([])
      } finally {
        setIsSearching(false)
      }
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [search, locale])

  const handleSelect = (slug: string) => {
    router.push(`/${locale}/blog/${slug}`)
    onOpenChange(false)
  }

  if (!open) return null

  return (
    <div className='fixed inset-0 z-50 flex items-start justify-center pt-[20vh] px-4'>
      <div
        className='fixed inset-0 bg-black/50 backdrop-blur-sm'
        onClick={() => onOpenChange(false)}
      />
      <Command className='relative z-50 w-full max-w-2xl rounded-lg border border-border bg-background shadow-lg'>
        <div className='flex items-center border-b border-border px-4'>
          <Search className='mr-2 h-4 w-4 shrink-0 opacity-50' />
          <Command.Input
            value={search}
            onValueChange={setSearch}
            placeholder='Search posts...'
            className='flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50'
            autoFocus
          />
        </div>
        <Command.List className='max-h-[300px] overflow-y-auto p-2'>
          {isSearching && (
            <div className='py-6 text-center text-sm text-muted-foreground'>
              Searching...
            </div>
          )}
          {!isSearching && results.length === 0 && search.length >= 2 && (
            <div className='py-6 text-center text-sm text-muted-foreground'>
              No posts found.
            </div>
          )}
          {!isSearching && search.length < 2 && (
            <div className='py-6 text-center text-sm text-muted-foreground'>
              Type at least 2 characters to search...
            </div>
          )}
          <Command.Empty>No results found.</Command.Empty>
          {results.map((post) => {
            const title =
              locale === 'vi'
                ? post.titleVi || post.titleEn || post.title
                : post.titleEn || post.titleVi || post.title

            return (
              <Command.Item
                key={post.id}
                value={post.slug}
                onSelect={() => handleSelect(post.slug)}
                className='flex items-center gap-3 rounded-md px-3 py-2 text-sm cursor-pointer hover:bg-accent'
              >
                <FileText className='h-4 w-4 text-muted-foreground' />
                <div className='flex-1'>
                  <div className='font-medium'>{title}</div>
                  {post.excerpt && (
                    <div className='text-xs text-muted-foreground line-clamp-1'>
                      {post.excerpt}
                    </div>
                  )}
                </div>
              </Command.Item>
            )
          })}
        </Command.List>
      </Command>
    </div>
  )
}
