import './globals.css';
import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';

import AuthContext from '../context/AuthContext';
import Navbar from '@/components/Navbar';
import SWRConfigContext from '@/context/SWRConfigContext';

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
          <main className=' max-w-[850px] mx-auto py-8'>
            <SWRConfigContext>{children}</SWRConfigContext>
          </main>
        </AuthContext>
      </body>
    </html>
  );
}
