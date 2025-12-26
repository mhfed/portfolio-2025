import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'
import { NextRequest, NextResponse } from 'next/server'

const intlMiddleware = createMiddleware(routing)

function checkBasicAuth(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization')

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return false
  }

  const base64Credentials = authHeader.split(' ')[1]
  const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8')
  const [username, password] = credentials.split(':')

  const adminUser = process.env.ADMIN_USER
  const adminPassword = process.env.ADMIN_PASSWORD

  if (!adminUser || !adminPassword) {
    console.error(
      'ADMIN_USER or ADMIN_PASSWORD environment variables are not set'
    )
    return false
  }

  return username === adminUser && password === adminPassword
}

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Handle /admin routes - exclude from intl middleware
  if (pathname.startsWith('/admin')) {
    // Redirect /vi/admin or /en/admin to /admin
    if (pathname.match(/^\/(en|vi)\/admin/)) {
      const newUrl = request.nextUrl.clone()
      newUrl.pathname = pathname.replace(/^\/(en|vi)\//, '/')
      return NextResponse.redirect(newUrl)
    }

    // Apply basic auth for /admin routes
    if (!checkBasicAuth(request)) {
      return new NextResponse('Unauthorized', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Secure Area"',
        },
      })
    }

    // Skip intl middleware for /admin routes
    return NextResponse.next()
  }

  // Continue with next-intl middleware for other routes
  return intlMiddleware(request)
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/_next`, or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  // - … /admin routes are handled separately above
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
