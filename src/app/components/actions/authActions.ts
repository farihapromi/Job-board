// src/app/actions/authActions.ts
'use server';

import { getWorkOS } from '@workos-inc/authkit-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function logout() {
  // Delete the WorkOS session cookie
  cookies().delete('wos-session');

  // Generate the sign-in URL from WorkOS
  const workos = getWorkOS();
  const signInUrl = await workos.auth.getSignInUrl({
    redirectUri: process.env.NEXT_PUBLIC_APP_URL || '/',
  });

  // Redirect to WorkOS's login page
  redirect(signInUrl);
}
