import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define public routes that do not require authentication
const publicRoutes = ['/', '/auth/login', '/auth/signup', '/pricing', '/contact'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public routes
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Check for token in cookies (or use localStorage if using client-side only)
  const token = request.cookies.get('token');

  if (!token) {
    // Redirect to signup if not authenticated
    const signupUrl = new URL('/auth/signup', request.url);
    return NextResponse.redirect(signupUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|static|favicon.ico).*)'],
};
