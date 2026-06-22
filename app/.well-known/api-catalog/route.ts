import { NextRequest, NextResponse } from 'next/server'
import { getBaseUrl } from '@/lib/utils'

export async function GET(request: NextRequest) {
  const baseUrl = getBaseUrl(request)

  const data = {
    linkset: [
      {
        anchor: `${baseUrl}/api/markdown-portfolio`,
        'service-desc': {
          href: `${baseUrl}/api/openapi.json`,
          type: 'application/json',
        },
        'service-doc': {
          href: `${baseUrl}/auth.md`,
          type: 'text/markdown',
        },
      },
    ],
  }

  return new NextResponse(JSON.stringify(data), {
    headers: {
      'Content-Type':
        'application/linkset+json; profile="https://www.rfc-editor.org/info/rfc9727"',
    },
  })
}
