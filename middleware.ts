import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

function checkBasicAuth(request: NextRequest): boolean {
  const authHeader = request.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return false;
  }

  const base64Credentials = authHeader.split(" ")[1];
  const credentials = Buffer.from(base64Credentials, "base64").toString("utf-8");
  const [username, password] = credentials.split(":");

  const adminUser = process.env.ADMIN_USER;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminUser || !adminPassword) {
    console.error("ADMIN_USER or ADMIN_PASSWORD environment variables are not set");
    return false;
  }

  return username === adminUser && password === adminPassword;
}

export default function middleware(request: NextRequest) {
  // Check if the request is for /admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (!checkBasicAuth(request)) {
      return new NextResponse("Unauthorized", {
        status: 401,
        headers: {
          "WWW-Authenticate": 'Basic realm="Secure Area"',
        },
      });
    }
  }

  // Continue with next-intl middleware for other routes
  return intlMiddleware(request);
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/_next`, or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  // Note: /admin routes are now included in matcher to apply Basic Auth
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
