// middleware.ts
import { authkitMiddleware } from '@workos-inc/authkit-nextjs';


export default authkitMiddleware({
  middlewareAuth: {
    enabled: true,
    unauthenticatedPaths: ['/'],
  },
  redirectUri: process.env.NODE_ENV === 'production'
  ? 'https://job-application-eta-six.vercel.app/api/auth/callback'
  : 'http://localhost:3000/api/auth/callback'
   
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