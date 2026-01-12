'use client'

import { useEffect, useRef, useMemo } from 'react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import { Table } from '@tiptap/extension-table'
import { TableRow } from '@tiptap/extension-table-row'
import { TableHeader } from '@tiptap/extension-table-header'
import { TableCell } from '@tiptap/extension-table-cell'
import { renderToHTMLString } from '@tiptap/static-renderer/pm/html-string'

interface BlogContentProps {
  content: any
}

export function BlogContent({ content }: BlogContentProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  const extensions = useMemo(
    () => [
      StarterKit.configure({
        codeBlock: { HTMLAttributes: { class: 'blog-pre' } },
      }),
      Link.configure({ HTMLAttributes: { class: 'blog-link' } }),
      Image.configure({ HTMLAttributes: { class: 'blog-image' } }),
      // KHAI BÁO THÊM Ở ĐÂY ĐỂ RENDERER HIỂU CẤU TRÚC BẢNG
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: 'blog-table',
        },
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    []
  )

  const renderContent = (input: any): string => {
    if (!input) return ''
    let docContent = input
    if (typeof input === 'string') {
      try {
        docContent = JSON.parse(input)
      } catch {
        return input
      }
    }
    try {
      return renderToHTMLString({
        extensions: extensions as any,
        content:
          docContent.type === 'doc'
            ? docContent
            : {
                type: 'doc',
                content: Array.isArray(docContent) ? docContent : [docContent],
              },
      })
    } catch (error) {
      return ''
    }
  }

  useEffect(() => {
    if (contentRef.current && content) {
      contentRef.current.innerHTML = renderContent(content)
    }
  }, [content, extensions])

  return (
    <article
      ref={contentRef}
      /* Quan trọng: Sử dụng prose kết hợp với các biến CSS của bạn */
      className='blog-content prose prose-lg  prose-slate dark:prose-invert max-w-none 
                 prose-headings:text-foreground prose-p:text-foreground/90
                 prose-strong:text-foreground prose-code:text-primary
                 prose-pre:bg-card prose-pre:border prose-pre:border-border'
    />
  )
}
