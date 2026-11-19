import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined");
}

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("access_token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "No active access token" },
        { status: 401 },
      );
    }

    const backendResponse = await fetch(`${API_URL}/v1/auth/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await backendResponse.json().catch(() => null);

    if (backendResponse.status !== 200) {
      return NextResponse.json(
        result ?? { message: "Logout failed" },
        { status: backendResponse.status },
      );
    }

    const response = NextResponse.json(
      result ?? { message: "Logged out successfully" },
      { status: 200 },
    );
    response.cookies.delete("access_token");
    response.cookies.delete("refresh_token");
    response.cookies.delete("csrf_token");

    return response;
  } catch (error) {
    console.error("LOGOUT ROUTE ERROR:", error);

    return NextResponse.json(
      { message: "Unable to log out" },
      { status: 502 },
    );
  }
}
