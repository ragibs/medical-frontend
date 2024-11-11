import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("medappapi_access_token")?.value;

  const userCookie = request.cookies.get("medappapi_user")?.value;

  if (!accessToken) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  let userRole: string | null = null;
  if (userCookie) {
    try {
      const user = JSON.parse(userCookie);
      userRole = user.role;
    } catch (error) {
      console.error("Failed to parse user cookie:", error);
    }
  }

  if (!userRole) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  const pathname = request.nextUrl.pathname;

  if (
    userRole === "PATIENT" &&
    [
      "/addadmin",
      "/adddoctor",
      "/addpatient",
      "/viewappointments",
      "/addappointment",
    ].some((path) => pathname.startsWith(path))
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (
    userRole === "DOCTOR" &&
    ["/adddoctor", "/addpatient", "/addappointment", "/book"].some((path) =>
      pathname.startsWith(path)
    )
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (userRole === "ADMIN" && pathname.startsWith("/book")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/addadmin/:path*",
    "/adddoctor/:path*",
    "/addpatient/:path*",
    "/viewappointments/:path*",
    "/addappointments/:path*",
    "/book/:path*",
  ],
};
