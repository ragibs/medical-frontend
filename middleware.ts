import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Fetch access token from cookies
  const accessToken = request.cookies.get("medappapi_access_token"); // Ensure this matches your actual cookie name

  // If no access token, redirect to the login page
  if (!accessToken) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  // Proceed to the requested route
  return NextResponse.next();
}

// Apply middleware to protected routes (e.g., dashboard, booking)
export const config = {
  matcher: ["/dashboard/:path*", "/book/:path*"], // Matches all sub-paths within /dashboard and /book
};
