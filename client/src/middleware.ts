import { getUserInfo } from "./lib/auth";
import { NextResponse, NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("ID")?.value;
  const publicRoutes = ["/", "/signIn"];
  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (isPublicRoute) {
    if (token) {
      const success = await getUserInfo(token, role);
      if (success) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    }
    return NextResponse.next();
  }

  // For protected routes, check authentication
  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const success = await getUserInfo(token, role);
  if (!success) {
    // Optionally delete the invalid token
    // response.cookies.delete("token");
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
