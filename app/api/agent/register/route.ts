import { NextRequest, NextResponse } from 'next/server'

interface AgentRegistration {
  agent_name?: string
  agent_version?: string
  identity_assertion?: string
}

/**
 * Agent registration endpoint.
 * Registers an AI agent and returns an API key for authenticated access.
 */
export async function POST(request: NextRequest) {
  let body: AgentRegistration
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  if (!body.agent_name) {
    return NextResponse.json(
      { error: 'agent_name is required' },
      { status: 400 }
    )
  }

  // Generate an API key for the agent
  const timestamp = Date.now().toString(36)
  const random = crypto.randomUUID().replace(/-/g, '')
  const apiKey = `port_${timestamp}_${random}`

  return NextResponse.json({
    api_key: apiKey,
    agent_name: body.agent_name,
    agent_version: body.agent_version ?? 'unknown',
    identity: body.identity_assertion ?? 'anonymous',
    registered_at: new Date().toISOString(),
    message:
      'Agent registered successfully. Use the api_key in Authorization: Bearer <key> headers.',
  })
}
