import createMiddleware from 'next-intl/middleware';
import { routing } from './src/i18n/routing';
import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if this is an admin route (e.g. /it/admin/... or /en/admin/...)
  const adminPattern = /^\/(it|en)\/admin(\/(?!login).*)?$/;
  const isAdminRoute = adminPattern.test(pathname);

  if (isAdminRoute) {
    // Build a response to pass cookies into
    let response = NextResponse.next({ request });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      // Extract locale from path
      const locale = pathname.split('/')[1] ?? 'it';
      const loginUrl = new URL(`/${locale}/admin/login`, request.url);
      loginUrl.searchParams.set('redirectTo', pathname);
      return NextResponse.redirect(loginUrl);
    }

    return response;
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/',
    '/(it|en)/:path*',
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};
