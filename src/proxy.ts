import { NextRequest, NextResponse } from "next/server";

const AUTH_ROUTES = [
  "/login",
  "/signup",
  "/forgot-password",
  "/reset-password",
];

const DEFAULT_AUTHENTICATED_ROUTE = "/";
const LOGIN_ROUTE = "/login";

function isAuthRoute(pathname: string) {
  return AUTH_ROUTES.some(
    (route) =>
      pathname === route ||
      pathname.startsWith(`${route}/`),
  );
}

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const accessToken = request.cookies.get("access_token")?.value;
  const refreshToken = request.cookies.get("refresh_token")?.value;

  const isAuthenticated = Boolean(accessToken);
  const isAuth = isAuthRoute(pathname);

  // User has an access token and tries to visit an auth page
  if (isAuthenticated && isAuth) {
    return NextResponse.redirect(
      new URL(DEFAULT_AUTHENTICATED_ROUTE, request.url),
    );
  }

  // User has no access token and tries to access a protected route
  if (!isAuthenticated && !isAuth) {
    // They still have a refresh token, so try refreshing their session
    if (refreshToken) {
      const refreshUrl = new URL("/api/refresh", request.url);

      // Save the original page, including query parameters
      refreshUrl.searchParams.set(
        "redirect",
        `${pathname}${search}`,
      );

      return NextResponse.redirect(refreshUrl);
    }

    // No access token and no refresh token — log in again
    return NextResponse.redirect(
      new URL(LOGIN_ROUTE, request.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all routes except:
     * - API routes
     * - Next.js static files
     * - Next.js image optimization files
     * - favicon
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
