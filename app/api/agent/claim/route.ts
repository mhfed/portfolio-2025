import { NextRequest, NextResponse } from 'next/server'
import { getBaseUrl } from '@/lib/utils'

/**
 * Anonymous agent claim endpoint.
 * Returns a temporary credential token for unauthenticated agent registration.
 */
export async function GET(request: NextRequest) {
  const baseUrl = getBaseUrl(request)

  // Generate a pseudo-random credential token
  const timestamp = Date.now().toString(36)
  const random = crypto.randomUUID().replace(/-/g, '').slice(0, 16)
  const credentialToken = `anon_${timestamp}_${random}`

  return NextResponse.json({
    credential_token: credentialToken,
    expires_in: 300,
    register_uri: `${baseUrl}/api/agent/register`,
  })
}
