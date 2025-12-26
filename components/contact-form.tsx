'use client'

import type React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTranslations } from 'next-intl'
import { useToast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000),
})

type ContactFormData = z.infer<typeof contactFormSchema>

export function ContactForm() {
  const t = useTranslations('collaborate')
  const { toast } = useToast()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to send message')
      }

      toast({
        variant: 'success',
        title: t('form.messageSent'),
        description: "I'll get back to you soon!",
      })

      reset()
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description:
          error instanceof Error
            ? error.message
            : 'Failed to send message. Please try again.',
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
      <div className='grid md:grid-cols-2 gap-6'>
        <div className='space-y-2'>
          <Label htmlFor='name'>{t('form.yourName')}</Label>
          <Input
            type='text'
            id='name'
            {...register('name')}
            variant={errors.name ? 'error' : 'default'}
            placeholder={t('form.namePlaceholder')}
          />
          {errors.name && (
            <p className='text-sm text-destructive'>{errors.name.message}</p>
          )}
        </div>

        <div className='space-y-2'>
          <Label htmlFor='email'>{t('form.emailAddress')}</Label>
          <Input
            type='email'
            id='email'
            {...register('email')}
            variant={errors.email ? 'error' : 'default'}
            placeholder={t('form.emailPlaceholder')}
          />
          {errors.email && (
            <p className='text-sm text-destructive'>{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className='space-y-2'>
        <Label htmlFor='message'>{t('form.message')}</Label>
        <Textarea
          id='message'
          {...register('message')}
          variant={errors.message ? 'error' : 'default'}
          placeholder={t('form.messagePlaceholder')}
          rows={5}
        />
        {errors.message && (
          <p className='text-sm text-destructive'>{errors.message.message}</p>
        )}
      </div>

      <Button
        type='submit'
        disabled={isSubmitting}
        loading={isSubmitting}
        className='w-full'
      >
        {t('form.sendMessage')}
      </Button>
    </form>
  )
}
