import { getCookieValue } from "@/lib/utils";
import { getClientRequestHeaders } from "@/lib/client-request-headers";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined");
}

async function handler(
  request: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;

  const cookieStore = await cookies();

  const accessToken = cookieStore.get("access_token")?.value;

  const incomingUrl = new URL(request.url);

  const targetUrl = `${API_URL}/${path.join("/")}${incomingUrl.search}`;

  const headers = new Headers(request.headers);

  headers.delete("host");
  headers.delete("content-length");
  headers.delete("accept-encoding");

  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  if (path.join("/") === "v1/auth/password/change") {
    for (const [name, value] of Object.entries(getClientRequestHeaders(request))) {
      headers.set(name, value);
    }
  }

  const body =
    request.method === "GET" || request.method === "HEAD"
      ? undefined
      : await request.arrayBuffer();

  const response = await fetch(targetUrl, {
    method: request.method,
    headers,
    body,
    cache: "no-store",
  });

  const isPasswordChange = path.join("/") === "v1/auth/password/change";
  const data = isPasswordChange
    ? ((await response
        .clone()
        .json()
        .catch(() => ({}))) as {
        accessToken?: string;
        refreshToken?: string;
        csrfToken?: string;
        expiresIn?: number;
      })
    : undefined;

  const responseHeaders = new Headers(response.headers);

  responseHeaders.delete("content-encoding");
  responseHeaders.delete("content-length");
  responseHeaders.delete("transfer-encoding");

  const nextResponse = new NextResponse(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: responseHeaders,
  });

  if (response.status === 401) {
    for (const name of ["access_token", "refresh_token", "csrf_token"]) {
      nextResponse.cookies.set({
        name,
        value: "",
        httpOnly: name !== "csrf_token",
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 0,
      });
    }
  }

  if (isPasswordChange && response.ok) {
    const backendCookies = response.headers.getSetCookie();

    const refreshCookie = backendCookies.find((cookie) =>
      cookie.startsWith("refreshToken="),
    );

    const csrfCookie = backendCookies.find((cookie) =>
      cookie.startsWith("csrfToken="),
    );

    const refreshToken =
      getCookieValue(refreshCookie) ?? data?.refreshToken;
    const csrfToken = getCookieValue(csrfCookie) ?? data?.csrfToken;

    // Access token — 15 minutes
    if (data?.accessToken) {
      nextResponse.cookies.set({
        name: "access_token",
        value: data.accessToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: data.expiresIn ?? 60 * 15,
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
  }

  return nextResponse;
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
