'use server';

import { signOut } from '@workos-inc/authkit-nextjs';

export async function logout() {
  await signOut({
    returnTo: 'http://localhost:3000', // Correct key for v2.x
  });
}
