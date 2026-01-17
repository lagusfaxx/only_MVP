import { NextRequest, NextResponse } from "next/server";
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const sessionToken = request.cookies.get('sessionToken')?.value;
  if (['/dashboard', '/admin'].some(r => pathname.startsWith(r))) {
    if (!sessionToken) return NextResponse.redirect(new URL('/login', request.url));
  }
  return NextResponse.next();
}
export const config = { matcher: ['/((?!_next|public).*)'] };
