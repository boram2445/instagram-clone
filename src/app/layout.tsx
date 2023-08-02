import './globals.css';
import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';

import AuthContext from '../context/AuthContext';
import Navbar from '@/components/Navbar';

const openSans = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={openSans.className}>
        <AuthContext>
          <Navbar />
          <div className='max-w-screen-xl mx-auto py-8 px-5'>{children}</div>
        </AuthContext>
      </body>
    </html>
  );
}
