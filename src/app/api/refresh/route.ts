import { getCookieValue } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined");
}

export async function GET(request: NextRequest) {
  try {
    // This is the refresh token stored by our Next.js login route
    const refreshToken = request.cookies.get("refresh_token")?.value;
    const csrfToken = request.cookies.get("csrf_token")?.value;

    if (!refreshToken) {
      return NextResponse.json(
        {
          message: "Session expired. Please log in again.",
        },
        {
          status: 401,
        },
      );
    }

    // Send the refresh token to the backend using the cookie name
    // the backend expects: refreshToken
    const response = await fetch(`${API_URL}/v1/auth/refresh`, {
      method: "POST",
      headers: {
        Cookie: [
          `refreshToken=${refreshToken}`,
          ...(csrfToken ? [`csrfToken=${csrfToken}`] : []),
        ].join("; "),
        ...(csrfToken
          ? {
              "X-CSRF-Token": csrfToken,
            }
          : {}),
      },
    });
    const backendCookies = response.headers.getSetCookie();

    const data = await response.json();

    if (!response.ok) {
      console.error("REFRESH FAILED:", {
        status: response.status,
        message: data.message,
      });

      const loginUrl = new URL("/login", request.url);

      const nextResponse = NextResponse.redirect(loginUrl);

      nextResponse.cookies.delete("access_token");
      nextResponse.cookies.delete("refresh_token");
      nextResponse.cookies.delete("csrf_token");

      return nextResponse;
    }

    const redirectPath = request.nextUrl.searchParams.get("redirect") ?? "/";

    const nextResponse = NextResponse.redirect(
      new URL(redirectPath, request.url),
    );

    // Set the new access token
    nextResponse.cookies.set({
      name: "access_token",
      value: data.accessToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: data.expiresIn,
    });

    // Check whether the backend rotated the refresh token
    const refreshCookie = backendCookies.find((cookie) =>
      cookie.startsWith("refreshToken="),
    );

    const newRefreshToken = getCookieValue(refreshCookie);

    if (newRefreshToken) {
      nextResponse.cookies.set({
        name: "refresh_token",
        value: newRefreshToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });
    }

    return nextResponse;
  } catch (error) {
    console.error("REFRESH ROUTE ERROR:", error);

    return NextResponse.redirect(new URL("/login", request.url));
  }
}
