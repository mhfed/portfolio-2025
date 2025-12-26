import { getExperienceById } from '@/actions/experience-actions'
import { notFound } from 'next/navigation'
import { EditExperienceForm } from './edit-experience-form'

interface EditExperiencePageProps {
  params: Promise<{ id: string }>
}

export default async function EditExperiencePage({
  params,
}: EditExperiencePageProps) {
  const { id } = await params
  const experienceId = Number.parseInt(id, 10)

  if (Number.isNaN(experienceId)) {
    notFound()
  }

  const experience = await getExperienceById(experienceId)

  if (!experience) {
    notFound()
  }

  return (
    <div className='mx-auto w-full max-w-2xl space-y-6'>
      <div>
        <h2 className='text-lg font-semibold text-foreground'>
          Edit experience
        </h2>
        <p className='text-sm text-muted-foreground'>
          Update the information for this work experience entry.
        </p>
      </div>
      <EditExperienceForm
        experience={{
          id: experience.id,
          company: experience.company,
          companyEn: experience.companyEn,
          companyVi: experience.companyVi,
          position: experience.position,
          positionEn: experience.positionEn,
          positionVi: experience.positionVi,
          period: experience.period,
          location: experience.location,
          locationEn: experience.locationEn,
          locationVi: experience.locationVi,
          description: experience.description,
          descriptionEn: experience.descriptionEn,
          descriptionVi: experience.descriptionVi,
          skills: experience.skills,
          orderIndex: experience.orderIndex,
        }}
      />
    </div>
  )
}
