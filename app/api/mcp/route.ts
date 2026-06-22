import { NextRequest, NextResponse } from 'next/server'
import enMessages from '@/messages/en.json'
import viMessages from '@/messages/vi.json'
import zhTWMessages from '@/messages/zh-TW.json'
import { skillGroups } from '@/data/skills'

type MessagesType = typeof enMessages

const messagesMap: Record<string, MessagesType> = {
  en: enMessages,
  vi: viMessages as unknown as MessagesType,
  'zh-TW': zhTWMessages as unknown as MessagesType,
}

interface MCPRequest {
  jsonrpc: string
  id?: number | string
  method: string
  params?: Record<string, unknown>
}

interface MCPTool {
  name: string
  description: string
  inputSchema: {
    type: string
    properties: Record<string, unknown>
    required?: string[]
  }
}

function getPortfolioData(category: string, locale: string) {
  const messages = messagesMap[locale] || enMessages

  const data: Record<string, unknown> = {}

  if (category === 'all' || category === 'experience') {
    data.experience = messages.experience.list.map((exp) => ({
      company: exp.company,
      position: exp.position,
      period: exp.period,
      location: exp.location,
      description: exp.description,
      skills: exp.skills,
    }))
  }

  if (category === 'all' || category === 'projects') {
    data.projects = messages.projects.list.map((proj) => ({
      title: proj.title,
      year: proj.year,
      description: proj.description,
      details: proj.details,
      liveUrl: proj.liveUrl,
      githubUrl: proj.githubUrl,
      techStack: proj.techStack,
    }))
  }

  if (category === 'all' || category === 'skills') {
    data.skills = skillGroups.map((group) => ({
      category: group.label,
      signal: group.signal,
      skills: group.skills,
    }))
  }

  return data
}

const tools: MCPTool[] = [
  {
    name: 'get-portfolio-data',
    description: "Get Hieu's work experience, projects, and skills details.",
    inputSchema: {
      type: 'object',
      properties: {
        category: {
          type: 'string',
          enum: ['projects', 'experience', 'skills', 'all'],
          description: 'The category of information to retrieve.',
        },
        locale: {
          type: 'string',
          enum: ['en', 'vi', 'zh-TW'],
          description: 'Language locale for the response.',
        },
      },
    },
  },
]

function handleInitialize(id: number | string | undefined) {
  return {
    jsonrpc: '2.0',
    id,
    result: {
      protocolVersion: '2025-03-26',
      capabilities: {
        tools: {},
      },
      serverInfo: {
        name: 'Nguyen Minh Hieu Portfolio MCP Server',
        version: '1.0.0',
      },
    },
  }
}

function handleToolsList(id: number | string | undefined) {
  return {
    jsonrpc: '2.0',
    id,
    result: { tools },
  }
}

function handleToolsCall(
  id: number | string | undefined,
  params: Record<string, unknown>
) {
  const args = (params.arguments as Record<string, unknown>) || {}
  const category = (args.category as string) || 'all'
  const locale = (args.locale as string) || 'en'

  const data = getPortfolioData(category, locale)

  return {
    jsonrpc: '2.0',
    id,
    result: {
      content: [
        {
          type: 'text',
          text: JSON.stringify(data, null, 2),
        },
      ],
    },
  }
}

export async function POST(request: NextRequest) {
  let body: MCPRequest
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { jsonrpc: '2.0', error: { code: -32700, message: 'Parse error' } },
      { status: 400 }
    )
  }

  let response: Record<string, unknown>

  switch (body.method) {
    case 'initialize':
      response = handleInitialize(body.id)
      break
    case 'tools/list':
      response = handleToolsList(body.id)
      break
    case 'tools/call':
      response = handleToolsCall(body.id, body.params || {})
      break
    default:
      response = {
        jsonrpc: '2.0',
        id: body.id,
        error: { code: -32601, message: `Method not found: ${body.method}` },
      }
      break
  }

  return NextResponse.json(response)
}
