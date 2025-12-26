import { ProjectForm } from './project-form'

export default function AddProjectPage() {
  return (
    <div className='mx-auto w-full max-w-2xl space-y-6'>
      <div>
        <h2 className='text-lg font-semibold text-foreground'>
          Add new project
        </h2>
        <p className='text-sm text-muted-foreground'>
          Fill in the details below to publish a new portfolio project.
        </p>
      </div>
      <ProjectForm />
    </div>
  )
}
