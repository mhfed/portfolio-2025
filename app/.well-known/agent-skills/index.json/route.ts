import { NextRequest, NextResponse } from 'next/server'
import { getBaseUrl } from '@/lib/utils'

export async function GET(request: NextRequest) {
  const baseUrl = getBaseUrl(request)

  const data = {
    $schema: 'https://schemas.agentskills.io/discovery/0.2.0/schema.json',
    skills: [
      {
        name: 'portfolio-query',
        type: 'skill-md',
        description: "Get Hieu's work experiences, projects, and skills",
        url: `${baseUrl}/.well-known/agent-skills/portfolio-query/SKILL.md`,
      },
    ],
  }

  return NextResponse.json(data)
}
