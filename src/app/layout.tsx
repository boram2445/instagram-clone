import './globals.css';
import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import AuthContext from '../context/AuthContext';
import Navbar from '@/components/Navbar';
import SWRConfigContext from '@/context/SWRConfigContext';

const openSans = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Instantgram',
    template: 'Instantgram | %s',
  },
  description: 'Instantgram Photos',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`${openSans.className} bg-neutral-50 flex flex-col`}>
        <AuthContext>
          <header className='sticky top-0 py-3 px-8 z-10 bg-white border-b border-gray-200 '>
            <Navbar />
          </header>
          <main className='max-w-[850px] w-full mx-auto flex flex-col grow py-5 px-5 md:px-2 flex-1'>
            <SWRConfigContext>{children}</SWRConfigContext>
          </main>
        </AuthContext>
      </body>
    </html>
  );
}
