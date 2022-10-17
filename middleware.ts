// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextRequest, NextResponse } from 'next/server';

import { ACCESS_TOKEN_KEY } from 'common/constant/cookies';
import { ROUTES } from 'common/constant/routes';

export async function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;
  const accessToken = req.cookies.get(ACCESS_TOKEN_KEY);
  const privateRoutes = Object.values(ROUTES.PRIVATE);
  const publicWithoutTokenRoutes = Object.values(ROUTES.PUBLIC_REQUIRED_TOKEN);

  if (!accessToken) {
    const isPrivate =
      privateRoutes.includes(pathname) ||
      privateRoutes.find(route => route !== '/' && route.includes(pathname.split('/')[1]));
    if (isPrivate) return NextResponse.redirect(`${origin}${ROUTES.PUBLIC_REQUIRED_TOKEN.LOGIN}`);
  } else {
    if (publicWithoutTokenRoutes.includes(pathname))
      return NextResponse.redirect(`${origin}${ROUTES.PRIVATE.DATASETS}`);
  }
}

export const config = {
  matcher: ['/', '/login', '/reset-password', '/jobs/(.*)'],
};
