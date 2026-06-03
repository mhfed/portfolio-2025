import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'
import { NextRequest, NextResponse } from 'next/server'

const intlMiddleware = createMiddleware(routing)

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Force the root path to the English homepage.
  if (pathname === '/') {
    const newUrl = request.nextUrl.clone()
    newUrl.pathname = '/en'
    return NextResponse.redirect(newUrl)
  }

  // Continue with next-intl middleware for other routes
  return intlMiddleware(request)
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/_next`, or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
