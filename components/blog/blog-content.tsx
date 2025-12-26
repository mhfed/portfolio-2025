'use client'

import { useEffect, useRef } from 'react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import { renderToHTMLString } from '@tiptap/static-renderer/pm/html-string'

interface BlogContentProps {
  content: any // JSON content from TipTap editor
}

export function BlogContent({ content }: BlogContentProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  // Extensions must match the ones used in TipTapEditor
  const extensions = [
    StarterKit.configure({
      codeBlock: {
        HTMLAttributes: {
          class: 'rounded-md bg-muted p-4 font-mono text-sm',
        },
      },
    }),
    Link.configure({
      openOnClick: false,
      HTMLAttributes: {
        class: 'text-primary underline hover:text-primary/80',
      },
    }),
    Image.configure({
      HTMLAttributes: {
        class: 'rounded-lg max-w-full h-auto my-4',
      },
    }),
  ] as const

  const renderContent = (content: any): string => {
    if (!content) {
      return ''
    }

    // If content is a string, try to parse as JSON first
    if (typeof content === 'string') {
      // Check if it's a JSON string
      if (content.trim().startsWith('{') || content.trim().startsWith('[')) {
        try {
          const parsed = JSON.parse(content)
          return renderContent(parsed) // Recursively process parsed content
        } catch {
          // If parsing fails, treat as HTML string
          return content
        }
      }
      // Otherwise treat as HTML string
      return content
    }

    // If content is an object/array (JSON from TipTap editor)
    if (typeof content === 'object') {
      // Handle empty object
      if (Object.keys(content).length === 0) {
        return ''
      }

      // Ensure content has the correct TipTap doc structure
      let docContent = content
      if (content.type !== 'doc') {
        // If it's an array, wrap in doc structure
        if (Array.isArray(content)) {
          docContent = { type: 'doc', content }
        } else if (content.content) {
          // If it has nested content, wrap in doc structure
          docContent = {
            type: 'doc',
            content: Array.isArray(content.content)
              ? content.content
              : [content.content],
          }
        } else {
          // Try to render as-is, static renderer will handle it
          docContent = { type: 'doc', content: [content] }
        }
      }

      try {
        // Use TipTap's official static renderer
        return renderToHTMLString({
          extensions: extensions as any,
          content: docContent,
        })
      } catch (error) {
        console.error(
          'Error rendering content with TipTap static renderer:',
          error
        )
        return ''
      }
    }

    return ''
  }

  useEffect(() => {
    if (contentRef.current) {
      if (content) {
        try {
          const html = renderContent(content)
          if (html) {
            contentRef.current.innerHTML = html
          } else {
            contentRef.current.innerHTML =
              '<p class="text-muted-foreground italic">No content available.</p>'
          }
        } catch (error) {
          console.error('Error rendering content:', error)
          contentRef.current.innerHTML =
            '<p class="text-destructive">Error rendering content.</p>'
        }
      } else {
        contentRef.current.innerHTML =
          '<p class="text-muted-foreground italic">No content available.</p>'
      }
    }
  }, [content])

  return (
    <div
      ref={contentRef}
      className='blog-content'
      style={{
        lineHeight: '1.75',
      }}
    />
  )
}
