// src/app/actions/authActions.ts
'use server';

import { getWorkOS } from '@workos-inc/authkit-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { decodeJwt } from 'jose';

export async function logout() {
  const session = cookies().get('wos-session')?.value;

  if (session) {
    try {
      const decodedToken = decodeJwt(session);
      const sessionId = decodedToken.sid as string | undefined;

      if (sessionId) {
        const workos = getWorkOS();
        const logoutUrl = workos.userManagement.getLogoutUrl({
          sessionId: sessionId,
        });

        cookies().delete('my-app-session');
        redirect(logoutUrl); // Redirect to WorkOS logout
      } else {
        console.error('Session ID (sid claim) not found.');
        redirect('/'); // Redirect to homepage if no sessionId
      }
    } catch (error) {
      console.error('Error decoding WorkOS session cookie:', error);
      cookies().delete('wos-session'); // Clear potentially invalid cookie
      redirect('/'); // Redirect to homepage on error
    }
  } else {
    redirect('/'); // Redirect to homepage if no session cookie
  }
}