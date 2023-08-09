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
    title: 'Home',
  },
  {
    href: '/search',
    icon: <SearchIcon />,
    clickedIcon: <SearchFillIcon />,
    title: 'Search',
  },
  {
    href: '/new',
    icon: <PlusIcon />,
    clickedIcon: <PlusFillIcon />,
    title: 'New',
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className=' mx-auto max-w-screen-lg flex justify-between items-center'>
      <Link href='/' aria-label='Home'>
        <h1 className='text-2xl font-bold cursor-pointer'>Instagram</h1>
      </Link>
      <nav className='flex gap-4'>
        <ul className='flex items-center gap-4 text-2xl'>
          {menu.map(({ href, icon, clickedIcon, title }) => (
            <li key={href}>
              <Link href={href} aria-label={title}>
                {pathname === href ? clickedIcon : icon}
              </Link>
            </li>
          ))}
          {user && (
            <li>
              <Link href={`/user/${user.username}`}>
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
  );
}
