'use client';

import Link from 'next/link';
import Avatar from './ui/Avatar';
import { PropagateLoader } from 'react-spinners';
import MultiCarousel from './MultiCarousel';
import useMe from '@/hooks/useMe';

export default function FollowingBar() {
  const { user, isLoading, error } = useMe();
  const users = user?.following;

  return (
    <section className='min-h-[90px] p-4 flex justify-center items-center shadow-sm shadow-neutral-300 mb-4 rounded-lg overflow-x-auto'>
      {isLoading ? (
        <PropagateLoader size={8} color='red' />
      ) : (
        (!users || users.length === 0) && <p>{`You don't have following`}</p>
      )}
      {users && users.length > 0 && (
        <MultiCarousel>
          {users.map(({ image, username }) => (
            <Link
              href={`/user/${username}`}
              className='flex flex-col items-center w-16'
              key={username}
            >
              <Avatar image={image} size='big' />
              <p className='w-full text-center text-sm truncate'>{username}</p>
            </Link>
          ))}
        </MultiCarousel>
      )}
    </section>
  );
}
