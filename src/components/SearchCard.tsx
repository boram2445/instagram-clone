import { SearchUser } from '@/model/user';
import Link from 'next/link';
import Avatar from './ui/Avatar';

export default function SearchCard({ user }: { user: SearchUser }) {
  const { username, name, image, followers, following } = user;

  return (
    <Link
      href={`/user/${username}`}
      className='mx-auto max-w-[550px] py-2 px-3 flex items-center gap-2 border bg-white border-gray-200 shadow-sm hover:bg-neutral-50'
    >
      <Avatar size='big' highlight={false} image={image} />
      <div className='leading-5'>
        <p className='font-bold'>{username}</p>
        <p className='text-gray-700'>{name}</p>
        <p className='text-gray-700 text-sm'>
          {followers} followers {following} following
        </p>
      </div>
    </Link>
  );
}
