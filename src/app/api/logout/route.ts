import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined");
}

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("access_token")?.value;

    if (token) {
      await fetch(`${API_URL}/v1/auth/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    const response = NextResponse.json({
      message: "Logged out successfully",
    });

    response.cookies.delete("access_token");
    response.cookies.delete("refresh_token");
    response.cookies.delete("csrf_token");

    return response;
  } catch (error) {
    console.error("LOGOUT ROUTE ERROR:", error);

    // Important: still clear the local cookie
    const response = NextResponse.json({
      message: "Logged out successfully",
    });

    response.cookies.delete("access_token");
    response.cookies.delete("refresh_token");
    response.cookies.delete("csrf_token");
    return response;
  }
}
