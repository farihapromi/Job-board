'use server';

import { getSignInUrl } from '@workos-inc/authkit-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function logout() {
  // Delete the WorkOS session cookie
  cookies().delete('wos-session');

  // Generate the sign-in URL
  const signInUrl = await getSignInUrl({
    redirectUri: process.env.NEXT_PUBLIC_APP_URL || '/',
  });

  // Redirect to WorkOS's login page
  redirect(signInUrl);
}
