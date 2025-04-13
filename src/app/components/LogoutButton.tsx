'use client';


import { logout } from './actions/Logout';

export default function LogoutButton() {
  return (
    <form action={logout}>
      <button
        type="submit"
        className="rounded-md bg-gray-200 py-1 px-2 sm:py-2 sm:px-4"
      >
        Logout
      </button>
    </form>
  );
}
