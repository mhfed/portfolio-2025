'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Typography from '@tiptap/extension-typography'
import Underline from '@tiptap/extension-underline'
import { Table } from '@tiptap/extension-table'
import { TableRow } from '@tiptap/extension-table-row'
import { TableHeader } from '@tiptap/extension-table-header'
import { TableCell } from '@tiptap/extension-table-cell'
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  Code,
  Link as LinkIcon,
  Image as ImageIcon,
  Terminal,
  Maximize,
  Minimize,
} from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface TipTapEditorProps {
  content?: any
  onChange?: (content: any) => void
  placeholder?: string
  locale?: string
  className?: string
}

export function TipTapEditor({
  content,
  onChange,
  placeholder = 'Start writing...',
  locale,
  className,
}: TipTapEditorProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        codeBlock: {
          HTMLAttributes: {
            class: 'rounded-md bg-muted p-4 font-mono text-sm',
          },
        },
      }),
      Typography,
      Underline,
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: 'border-collapse table-auto w-full',
        },
      }),
      TableRow,
      TableHeader,
      TableCell,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary underline hover:text-primary/80',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-lg max-w-full h-auto',
        },
      }),
    ],
    content: content || null,
    editorProps: {
      attributes: {
        class:
          'blog-content prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:text-foreground prose-p:text-foreground/90 prose-strong:text-foreground prose-code:text-primary prose-pre:bg-card prose-pre:border prose-pre:border-border',
        'data-placeholder': placeholder,
      },
    },
    onUpdate: ({ editor }) => {
      if (onChange) {
        onChange(editor.getJSON())
      }
    },
  })

  // Update content when prop changes
  useEffect(() => {
    if (editor && content) {
      const currentContent = editor.getJSON()
      if (JSON.stringify(currentContent) !== JSON.stringify(content)) {
        editor.commands.setContent(content)
      }
    }
  }, [content, editor])

  // Handle ESC key to exit fullscreen
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isFullscreen])

  const setLink = useCallback(() => {
    if (!editor) return

    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    if (url === null) {
      return
    }

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }, [editor])

  const addImage = useCallback(() => {
    if (!editor) return

    const url = window.prompt('Image URL')

    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }, [editor])

  if (!editor) {
    return (
      <div className='flex items-center justify-center min-h-[300px] border border-border/30 rounded-md bg-background'>
        <p className='text-sm text-muted-foreground'>Loading editor...</p>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'border border-border/30 rounded-md bg-background overflow-hidden',
        isFullscreen && 'fixed inset-0 z-50 rounded-none flex flex-col',
        className
      )}
    >
      {/* Toolbar */}
      <div className='flex flex-wrap items-center gap-1 p-2 border-b border-border/30 bg-muted/30'>
        {/* Text Formatting */}
        <button
          type='button'
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={cn(
            'p-2 rounded-md transition-colors',
            editor.isActive('bold')
              ? 'bg-primary text-primary-foreground'
              : 'hover:bg-accent text-foreground/70'
          )}
          title='Bold'
        >
          <Bold className='h-4 w-4' />
        </button>

        <button
          type='button'
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={cn(
            'p-2 rounded-md transition-colors',
            editor.isActive('italic')
              ? 'bg-primary text-primary-foreground'
              : 'hover:bg-accent text-foreground/70'
          )}
          title='Italic'
        >
          <Italic className='h-4 w-4' />
        </button>

        <button
          type='button'
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          disabled={!editor.can().chain().focus().toggleUnderline().run()}
          className={cn(
            'p-2 rounded-md transition-colors',
            editor.isActive('underline')
              ? 'bg-primary text-primary-foreground'
              : 'hover:bg-accent text-foreground/70'
          )}
          title='Underline'
        >
          <UnderlineIcon className='h-4 w-4' />
        </button>

        <div className='w-px h-6 bg-border/30 mx-1' />

        {/* Headings */}
        <button
          type='button'
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={cn(
            'p-2 rounded-md transition-colors',
            editor.isActive('heading', { level: 1 })
              ? 'bg-primary text-primary-foreground'
              : 'hover:bg-accent text-foreground/70'
          )}
          title='Heading 1'
        >
          <Heading1 className='h-4 w-4' />
        </button>

        <button
          type='button'
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={cn(
            'p-2 rounded-md transition-colors',
            editor.isActive('heading', { level: 2 })
              ? 'bg-primary text-primary-foreground'
              : 'hover:bg-accent text-foreground/70'
          )}
          title='Heading 2'
        >
          <Heading2 className='h-4 w-4' />
        </button>

        <button
          type='button'
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={cn(
            'p-2 rounded-md transition-colors',
            editor.isActive('heading', { level: 3 })
              ? 'bg-primary text-primary-foreground'
              : 'hover:bg-accent text-foreground/70'
          )}
          title='Heading 3'
        >
          <Heading3 className='h-4 w-4' />
        </button>

        <div className='w-px h-6 bg-border/30 mx-1' />

        {/* Lists */}
        <button
          type='button'
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={cn(
            'p-2 rounded-md transition-colors',
            editor.isActive('bulletList')
              ? 'bg-primary text-primary-foreground'
              : 'hover:bg-accent text-foreground/70'
          )}
          title='Bullet List'
        >
          <List className='h-4 w-4' />
        </button>

        <button
          type='button'
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={cn(
            'p-2 rounded-md transition-colors',
            editor.isActive('orderedList')
              ? 'bg-primary text-primary-foreground'
              : 'hover:bg-accent text-foreground/70'
          )}
          title='Ordered List'
        >
          <ListOrdered className='h-4 w-4' />
        </button>

        <div className='w-px h-6 bg-border/30 mx-1' />

        {/* Other */}
        <button
          type='button'
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={cn(
            'p-2 rounded-md transition-colors',
            editor.isActive('blockquote')
              ? 'bg-primary text-primary-foreground'
              : 'hover:bg-accent text-foreground/70'
          )}
          title='Blockquote'
        >
          <Quote className='h-4 w-4' />
        </button>

        <button
          type='button'
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          className={cn(
            'p-2 rounded-md transition-colors',
            editor.isActive('code')
              ? 'bg-primary text-primary-foreground'
              : 'hover:bg-accent text-foreground/70'
          )}
          title='Inline Code'
        >
          <Code className='h-4 w-4' />
        </button>

        <button
          type='button'
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={cn(
            'p-2 rounded-md transition-colors',
            editor.isActive('codeBlock')
              ? 'bg-primary text-primary-foreground'
              : 'hover:bg-accent text-foreground/70'
          )}
          title='Code Block'
        >
          <Terminal className='h-4 w-4' />
        </button>

        <div className='w-px h-6 bg-border/30 mx-1' />

        {/* Links & Images */}
        <button
          type='button'
          onClick={setLink}
          className={cn(
            'p-2 rounded-md transition-colors',
            editor.isActive('link')
              ? 'bg-primary text-primary-foreground'
              : 'hover:bg-accent text-foreground/70'
          )}
          title='Add Link'
        >
          <LinkIcon className='h-4 w-4' />
        </button>

        <button
          type='button'
          onClick={addImage}
          className='p-2 rounded-md transition-colors hover:bg-accent text-foreground/70'
          title='Add Image'
        >
          <ImageIcon className='h-4 w-4' />
        </button>

        <div className='w-px h-6 bg-border/30 mx-1' />

        {/* Fullscreen Toggle */}
        <button
          type='button'
          onClick={() => setIsFullscreen(!isFullscreen)}
          className={cn(
            'p-2 rounded-md transition-colors',
            isFullscreen
              ? 'bg-primary text-primary-foreground'
              : 'hover:bg-accent text-foreground/70'
          )}
          title={isFullscreen ? 'Exit Fullscreen (ESC)' : 'Fullscreen'}
        >
          {isFullscreen ? (
            <Minimize className='h-4 w-4' />
          ) : (
            <Maximize className='h-4 w-4' />
          )}
        </button>
      </div>

      {/* Editor Content */}
      <EditorContent
        editor={editor}
        className={cn(
          'prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert max-w-none',
          isFullscreen && 'flex-1 overflow-auto'
        )}
      />
    </div>
  )
}
