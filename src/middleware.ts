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
    '/',
    '/new-listing',
    '/new-company',
    '/new-listing/:orgId*',
  
  ],
};
