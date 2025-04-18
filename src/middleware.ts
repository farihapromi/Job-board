// middleware.ts
import { authkitMiddleware } from '@workos-inc/authkit-nextjs';

export default authkitMiddleware({
  middlewareAuth: {
    enabled: true,
    unauthenticatedPaths: ['/'],
  },
  redirectUri: process.env.WORKOS_REDIRECT_URI,
});

export const config = {
  matcher: [
    /*
    '/',
    '/new-listing',
    '/new-listing/:orgId*',
    '/new-company',
    '/jobs/:orgId*',
    '/jobs/edit/:jobId*',
    '/show/:jobId*',
    */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};