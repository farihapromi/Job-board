import { withAuth } from '@workos-inc/authkit-nextjs';

import { signOut, getSignInUrl } from '@workos-inc/authkit-nextjs';

import { signIn } from '@workos-inc/authkit-nextjs';

import Link from 'next/link';

import { logout } from './actions/authActions';

export default async function Header() {
  const { user } = await withAuth();
  const signInUrl = await getSignInUrl();

  return (
    <header>
      <div className='container flex items-center justify-between mx-auto my-4'>
        <Link
          href={'/'}
          className='font-bold text-xl py-2 px-2 smLpy-4 sm:px-4 bg-blue-500 text-white rounded-md'
        >
          Job Board
        </Link>
        <nav className='flex gap-2'>
          {!user && (
            <Link
              className='rounded-md bg-gray-500 py-1 px-2 sm:py-2 sm:px-4 text-white'
              href={signInUrl}
            >
              Login
            </Link>
          )}

          {/* {user && <LogoutButton />} */}
          {user && (
            <form
              action={async () => {
                'use server';
                //await logout();

                await signOut();
              }}
            >
              <button
                type='submit'
                className='rounded-md bg-gray-200 py-1 px-2 sm:py-2 sm:px-4'
              >
                Logout
              </button>
            </form>
          )}
          <Link
            className='rounded-md py-1 px-2 sm:py-2 sm:px-4 bg-blue-600 text-white'
            href={'/new-listing'}
          >
            Post a job
          </Link>
        </nav>
      </div>
    </header>
  );
}
