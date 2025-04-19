'use client';

import { getSignInUrl } from '@workos-inc/authkit-nextjs';

export default function LoginButton() {
  return (
    <button
      onClick={() =>
        getSignInUrl({
          loginHint: '', // optional
          // forceAuth not supported — AuthKit handles it internally
        })
      }
    >
      Login
    </button>
  );
}
