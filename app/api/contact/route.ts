import { NextResponse } from 'next/server'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate the request body
    const validatedData = contactSchema.parse(body)
    
    // Here you can integrate with an email service like:
    // - Resend: https://resend.com
    // - SendGrid: https://sendgrid.com
    // - Formspree: https://formspree.io
    // - Or use nodemailer with SMTP
    
    // For now, we'll log it and return success
    // In production, replace this with actual email sending logic
    console.log('Contact form submission:', validatedData)
    
    // Example with Resend (uncomment and configure):
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({
    //   from: 'onboarding@resend.dev',
    //   to: 'nmhieu04091999@gmail.com',
    //   subject: `New contact from ${validatedData.name}`,
    //   html: `<p>From: ${validatedData.email}</p><p>${validatedData.message}</p>`,
    // })
    
    return NextResponse.json(
      { message: 'Message sent successfully!' },
      { status: 200 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      )
    }
    
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    )
  }
}

