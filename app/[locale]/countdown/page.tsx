import { CountdownClient } from '@/components/countdown/countdown-client'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Lunar New Year Countdown | Portfolio',
  description: 'Countdown to Lunar New Year 2026',
}

export default function CountdownPage() {
  return (
    <div className=' mx-auto'>
      <CountdownClient />
    </div>
  )
}
