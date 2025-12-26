'use client'

import { useActionState } from 'react'
import {
  updateExperienceAction,
  type UpdateExperienceResult,
} from '@/actions/experience-actions'
import { LocaleTabs } from '@/components/admin/locale-tabs'

interface EditExperienceFormProps {
  experience: {
    id: number
    company: string
    companyEn: string | null
    companyVi: string | null
    position: string
    positionEn: string | null
    positionVi: string | null
    period: string
    location: string | null
    locationEn: string | null
    locationVi: string | null
    description: string
    descriptionEn: string | null
    descriptionVi: string | null
    skills: string[] | null
    orderIndex: number | null
  }
}

export function EditExperienceForm({ experience }: EditExperienceFormProps) {
  const [state, formAction] = useActionState<UpdateExperienceResult, FormData>(
    updateExperienceAction,
    { success: true }
  )

  return (
    <>
      {state.error && (
        <div className='mb-6 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-destructive'>
          <p className='font-semibold'>Error</p>
          <p className='text-sm'>{state.error}</p>
        </div>
      )}

      <form action={formAction} className='space-y-6'>
        <input type='hidden' name='id' value={experience.id} />

        {/* Locale Tabs for Text Fields */}
        <LocaleTabs>
          {(activeTab) => (
            <div className='space-y-6'>
              {/* Company */}
              <div>
                <label
                  htmlFor={`company_${activeTab}`}
                  className='mb-3 block text-sm font-semibold text-foreground'
                >
                  Company ({activeTab === 'en' ? 'English' : 'Tiếng Việt'}){' '}
                  <span className='text-destructive'>*</span>
                </label>
                <input
                  type='text'
                  id={`company_${activeTab}`}
                  name={`company_${activeTab}`}
                  defaultValue={
                    activeTab === 'en'
                      ? experience.companyEn || experience.company || ''
                      : experience.companyVi || experience.company || ''
                  }
                  className='w-full rounded-md border border-border/30 bg-background px-4 py-3 text-foreground placeholder-foreground/50 focus:border-primary focus:outline-none transition-colors'
                  placeholder={
                    activeTab === 'en' ? 'Company name' : 'Tên công ty'
                  }
                />
              </div>

              {/* Position */}
              <div>
                <label
                  htmlFor={`position_${activeTab}`}
                  className='mb-3 block text-sm font-semibold text-foreground'
                >
                  Position ({activeTab === 'en' ? 'English' : 'Tiếng Việt'}){' '}
                  <span className='text-destructive'>*</span>
                </label>
                <input
                  type='text'
                  id={`position_${activeTab}`}
                  name={`position_${activeTab}`}
                  defaultValue={
                    activeTab === 'en'
                      ? experience.positionEn || experience.position || ''
                      : experience.positionVi || experience.position || ''
                  }
                  className='w-full rounded-md border border-border/30 bg-background px-4 py-3 text-foreground placeholder-foreground/50 focus:border-primary focus:outline-none transition-colors'
                  placeholder={
                    activeTab === 'en'
                      ? 'Frontend Developer'
                      : 'Lập trình viên Frontend'
                  }
                />
              </div>

              {/* Location */}
              <div>
                <label
                  htmlFor={`location_${activeTab}`}
                  className='mb-3 block text-sm font-semibold text-foreground'
                >
                  Location ({activeTab === 'en' ? 'English' : 'Tiếng Việt'})
                </label>
                <input
                  type='text'
                  id={`location_${activeTab}`}
                  name={`location_${activeTab}`}
                  defaultValue={
                    activeTab === 'en'
                      ? experience.locationEn || experience.location || ''
                      : experience.locationVi || experience.location || ''
                  }
                  className='w-full rounded-md border border-border/30 bg-background px-4 py-3 text-foreground placeholder-foreground/50 focus:border-primary focus:outline-none transition-colors'
                  placeholder={
                    activeTab === 'en' ? 'Ha Noi, Viet Nam' : 'Hà Nội, Việt Nam'
                  }
                />
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor={`description_${activeTab}`}
                  className='mb-3 block text-sm font-semibold text-foreground'
                >
                  Description ({activeTab === 'en' ? 'English' : 'Tiếng Việt'}){' '}
                  <span className='text-destructive'>*</span>
                </label>
                <textarea
                  id={`description_${activeTab}`}
                  name={`description_${activeTab}`}
                  rows={6}
                  defaultValue={
                    activeTab === 'en'
                      ? experience.descriptionEn || experience.description || ''
                      : experience.descriptionVi || experience.description || ''
                  }
                  className='w-full resize-y rounded-none border border-border/30 bg-background px-4 py-3 text-foreground placeholder-foreground/50 focus:border-primary focus:outline-none transition-colors'
                  placeholder={
                    activeTab === 'en'
                      ? 'Describe your responsibilities, impact, and key contributions...'
                      : 'Mô tả trách nhiệm, tác động và đóng góp chính của bạn...'
                  }
                />
              </div>
            </div>
          )}
        </LocaleTabs>

        {/* Period */}
        <div>
          <label
            htmlFor='period'
            className='mb-3 block text-sm font-semibold text-foreground'
          >
            Period <span className='text-destructive'>*</span>
          </label>
          <input
            type='text'
            id='period'
            name='period'
            required
            defaultValue={experience.period}
            className='w-full rounded-md border border-border/30 bg-background px-4 py-3 text-foreground placeholder-foreground/50 focus:border-primary focus:outline-none transition-colors'
            placeholder='8/2022 - 11/2023'
          />
        </div>

        <div>
          <label
            htmlFor='skills'
            className='mb-3 block text-sm font-semibold text-foreground'
          >
            Skills / Technologies (comma-separated)
          </label>
          <input
            type='text'
            id='skills'
            name='skills'
            defaultValue={
              experience.skills && experience.skills.length > 0
                ? experience.skills.join(', ')
                : ''
            }
            className='w-full rounded-md border border-border/30 bg-background px-4 py-3 text-foreground placeholder-foreground/50 focus:border-primary focus:outline-none transition-colors'
            placeholder='React, TypeScript, Next.js'
          />
          <p className='mt-2 text-sm text-muted-foreground'>
            Separate multiple skills with commas.
          </p>
        </div>

        <div>
          <label
            htmlFor='orderIndex'
            className='mb-3 block text-sm font-semibold text-foreground'
          >
            Order index
          </label>
          <input
            type='number'
            id='orderIndex'
            name='orderIndex'
            defaultValue={
              typeof experience.orderIndex === 'number'
                ? experience.orderIndex
                : ''
            }
            className='w-full rounded-md border border-border/30 bg-background px-4 py-3 text-foreground placeholder-foreground/50 focus:border-primary focus:outline-none transition-colors'
            placeholder='Lower numbers appear higher in the list'
          />
        </div>

        <div className='flex gap-4 pt-4'>
          <button
            type='submit'
            className='px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold transition-all'
          >
            Update experience
          </button>
          <a
            href='/admin/experiences'
            className='px-6 py-3 bg-background hover:bg-primary/10 border border-border/30 rounded-md text-foreground font-semibold transition-all text-center'
          >
            Cancel
          </a>
        </div>
      </form>
    </>
  )
}
