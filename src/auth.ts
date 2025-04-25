// src/auth.ts
import {
   
    getSignInUrl,
  
  } from '@workos-inc/authkit-nextjs';
  
  // Cookie customization — used by WorkOS internally, not passed to withAuth
  export const getCookieOptions = () => ({
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });
  

  
  export { getSignInUrl };
  