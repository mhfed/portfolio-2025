'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { deleteExperience } from '@/actions/experience-actions'

interface DeleteExperienceButtonProps {
  experienceId: number
}

export function DeleteExperienceButton({
  experienceId,
}: DeleteExperienceButtonProps) {
  const [isPending, startTransition] = useTransition()
  const [showConfirm, setShowConfirm] = useState(false)
  const router = useRouter()

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteExperience(experienceId)
      if (result.success) {
        router.refresh()
      } else {
        alert(result.error || 'Failed to delete experience')
      }
    })
  }

  if (showConfirm) {
    return (
      <div className='flex gap-2'>
        <button
          onClick={handleDelete}
          disabled={isPending}
          className='px-4 py-2 bg-destructive text-destructive-foreground hover:bg-destructive/90 font-semibold rounded-md transition-all disabled:opacity-50'
        >
          {isPending ? 'Deleting...' : 'Confirm'}
        </button>
        <button
          onClick={() => setShowConfirm(false)}
          disabled={isPending}
          className='px-4 py-2 bg-background hover:bg-primary/10 border border-border/30 text-foreground font-semibold rounded-md transition-all disabled:opacity-50'
        >
          Cancel
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={() => setShowConfirm(true)}
      className='px-4 py-2 bg-background hover:bg-destructive/10 border border-destructive/30 text-destructive font-semibold rounded-md transition-all'
    >
      Delete
    </button>
  )
}
