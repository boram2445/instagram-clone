'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HomeIcon,
  HomeFillIcon,
  PlusIcon,
  PlusFillIcon,
  SearchIcon,
  SearchFillIcon,
} from './ui/icons';
import ColorButton from './ui/ColorButton';
import { signIn, signOut, useSession } from 'next-auth/react';
import Avatar from './ui/Avatar';

const menu = [
  {
    href: '/',
    icon: <HomeIcon />,
    clickedIcon: <HomeFillIcon />,
  },
  {
    href: '/search',
    icon: <SearchIcon />,
    clickedIcon: <SearchFillIcon />,
  },
  {
    href: '/new',
    icon: <PlusIcon />,
    clickedIcon: <PlusFillIcon />,
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <header className='sticky top-0 py-3 px-8 border-b border-gray-200 bg-white'>
      <div className='max-w-screen-xl mx-auto flex justify-between items-center'>
        <Link href='/'>
          <h1 className='text-2xl font-bold cursor-pointer'>Instagram</h1>
        </Link>
        <nav className='flex gap-4'>
          <ul className='flex items-center gap-4 text-2xl'>
            {menu.map(({ href, icon, clickedIcon }) => (
              <li key={href}>
                <Link href={href}>
                  {pathname === href ? clickedIcon : icon}
                </Link>
              </li>
            ))}
            {user && (
              <li>
                <Link href={`/user/${user.name}`}>
                  <Avatar image={user.image} />
                </Link>
              </li>
            )}
            <li>
              <ColorButton
                text={session ? 'Sign Out' : 'Sign In'}
                onClick={session ? signOut : signIn}
              />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
