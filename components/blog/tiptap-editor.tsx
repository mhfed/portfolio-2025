'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import {
  Bold,
  Italic,
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
} from 'lucide-react'
import { useCallback, useEffect } from 'react'
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
          'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[300px] px-4 py-3',
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
      </div>

      {/* Editor Content */}
      <EditorContent
        editor={editor}
        className='prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert max-w-none'
      />
    </div>
  )
}
