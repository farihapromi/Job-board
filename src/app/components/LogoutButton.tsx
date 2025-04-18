'use client'; // This ensures the component is treated as a Client Component

import { useCallback } from 'react';
import { logout } from './actions/authActions'; // Ensure the correct import path

export default function LogoutButton() {
  const handleLogout = useCallback(async () => {
    try {
      await logout(); // Trigger logout
    } catch (error) {
      console.error('Error during logout (client component):', error);
    }
  }, []);

  return (
    <button
      onClick={handleLogout} // Trigger the logout function on button click
      className='rounded-md bg-gray-200 py-1 px-2 sm:py-2 sm:px-4'
    >
      Logout
    </button>
  );
}
