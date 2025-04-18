// app/layout.tsx

import { AuthKitProvider } from '@workos-inc/authkit-nextjs/components';

import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

import Header from './components/Header';
import Footer from './components/Footer';
import '@radix-ui/themes/styles.css';

// Load custom fonts
const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen flex flex-col`}
      >
        <Header />
        <AuthKitProvider
          clientId={process.env.WORKOS_CLIENT_ID}
          appUrl={process.env.NEXT_PUBLIC_APP_URL} // Ensure this is set
        >
          <main className='flex-grow py-4 px-6 container mx-auto'>
            {children}
          </main>
        </AuthKitProvider>

        <Footer />
      </body>
    </html>
  );
}
