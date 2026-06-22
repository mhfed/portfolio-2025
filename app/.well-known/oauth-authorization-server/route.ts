import { NextRequest, NextResponse } from 'next/server'
import { getBaseUrl } from '@/lib/utils'

export async function GET(request: NextRequest) {
  const baseUrl = getBaseUrl(request)

  const data = {
    issuer: baseUrl,
    authorization_endpoint: `${baseUrl}/oauth/authorize`,
    token_endpoint: `${baseUrl}/oauth/token`,
    jwks_uri: `${baseUrl}/oauth/jwks`,
    grant_types_supported: ['client_credentials'],
    response_types_supported: ['code'],
    agent_auth: {
      skill: `${baseUrl}/.well-known/agent-skills/portfolio-query/SKILL.md`,
      register_uri: `${baseUrl}/api/agent/register`,
      identity_types_supported: ['anonymous'],
      anonymous: {
        credential_types_supported: ['api_key'],
        claim_uri: `${baseUrl}/api/agent/claim`,
      },
    },
  }

  return NextResponse.json(data)
}
