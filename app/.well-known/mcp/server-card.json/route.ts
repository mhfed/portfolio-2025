import { NextRequest, NextResponse } from 'next/server'
import { getBaseUrl } from '@/lib/utils'

export async function GET(request: NextRequest) {
  const baseUrl = getBaseUrl(request)

  const data = {
    serverInfo: {
      name: 'Nguyen Minh Hieu Portfolio MCP Server',
      version: '1.0.0',
    },
    endpoint: `${baseUrl}/api/mcp`,
    capabilities: {
      tools: {
        'get-portfolio-data': {
          description:
            "Get Hieu's work experience, projects, and skills details.",
          inputSchema: {
            type: 'object',
            properties: {
              category: {
                type: 'string',
                enum: ['projects', 'experience', 'skills', 'all'],
                default: 'all',
              },
            },
          },
        },
      },
      resources: {},
      prompts: {},
    },
  }

  return NextResponse.json(data)
}
