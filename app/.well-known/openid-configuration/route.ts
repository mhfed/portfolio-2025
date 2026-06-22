import { NextRequest, NextResponse } from 'next/server'
import { getBaseUrl } from '@/lib/utils'

export async function GET(request: NextRequest) {
  const baseUrl = getBaseUrl(request)

  const data = {
    issuer: baseUrl,
    authorization_endpoint: `${baseUrl}/oauth/authorize`,
    token_endpoint: `${baseUrl}/oauth/token`,
    jwks_uri: `${baseUrl}/oauth/jwks`,
    userinfo_endpoint: `${baseUrl}/oauth/userinfo`,
    scopes_supported: ['openid', 'profile', 'email'],
    response_types_supported: ['code', 'token', 'id_token'],
    grant_types_supported: ['authorization_code', 'client_credentials'],
    subject_types_supported: ['public'],
    id_token_signing_alg_values_supported: ['RS256'],
  }

  return NextResponse.json(data)
}
