'use client'

import { useState } from 'react'

export function ExpandableText({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className='mb-6'>
      <p className={`text-foreground/70 ${expanded ? '' : 'line-clamp-2'}`}>{text}</p>
      {!expanded && (
        <button
          onClick={() => setExpanded(true)}
          className='mt-1 mono-text text-xs text-primary font-bold hover:underline cursor-pointer'
        >
          VIEW_MORE &gt;&gt;&gt;
        </button>
      )}
    </div>
  )
}
