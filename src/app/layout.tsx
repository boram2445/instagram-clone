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
          <div className='min-h-full max-w-[850px] mx-auto'>
            <Navbar />
            <main className='py-5 px-5 md:px-0'>
              <SWRConfigContext>{children}</SWRConfigContext>
            </main>
          </div>
        </AuthContext>
      </body>
    </html>
  );
}
