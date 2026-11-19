import { getCookieValue } from "@/lib/utils";
import { getClientRequestHeaders } from "@/lib/client-request-headers";
import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined");
}

export async function POST(request: Request) {
  try {
    if (!API_URL) {
      throw new Error("API_URL is not defined");
    }

    const body = await request.json();

    const { action, ...payload } = body;

    if (action !== "login" && action !== "signup") {
      return NextResponse.json(
        { message: "Invalid authentication action" },
        { status: 400 },
      );
    }

    const endpoint =
      action === "login" ? "/v1/auth/login" : "/v1/auth/email/verify";

    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getClientRequestHeaders(request),
      },
      body: JSON.stringify(payload),
    });

    const backendCookies = response.headers.getSetCookie();

    const refreshCookie = backendCookies.find((cookie) =>
      cookie.startsWith("refreshToken="),
    );

    const csrfCookie = backendCookies.find((cookie) =>
      cookie.startsWith("csrfToken="),
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          message: data.message ?? "Authentication failed",
          errors: data.errors,
        },
        {
          status: response.status,
        },
      );
    }

    const refreshToken = getCookieValue(refreshCookie);
    const csrfToken = getCookieValue(csrfCookie);

    const nextResponse = NextResponse.json({
      ...data,
      message: data.message
        ? data.message
        : action === "login"
          ? "Login successful"
          : "Signup successful, logging in",
    });

    // Access token — 15 minutes
    if (data.accessToken) {
      nextResponse.cookies.set({
        name: "access_token",
        value: data.accessToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: data.expiresIn,
      });
    }

    // Refresh token — 7 days
    if (refreshToken) {
      nextResponse.cookies.set({
        name: "refresh_token",
        value: refreshToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });
    }

    // CSRF token — JavaScript may need to read this
    if (csrfToken) {
      nextResponse.cookies.set({
        name: "csrf_token",
        value: csrfToken,
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });
    }

    return nextResponse;
  } catch (error) {
    console.error("AUTH ROUTE ERROR:", error);

    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Something went wrong",
      },
      {
        status: 500,
      },
    );
  }
}
