import { useSession } from 'next-auth/react';
import Avatar from './ui/Avatar';
import { User } from '@/model/user';

type Props = {
  user: User;
};

export default function SideBar({ user: { name, username, image } }: Props) {
  return (
    <>
      <div className='flex gap-4 items-center'>
        {image && <Avatar image={image} size='big' highlight={false} />}
        <div>
          <p className='font-bold'>{username}</p>
          <p>{name}</p>
        </div>
      </div>
      <p className='my-5 text-gray-700'>
        About · Help · Press · API · Jobs · Privacy · Terms · Location ·
        Language
      </p>
      <p className='text-gray-500'>ⓒCopyright INSTANTGRAM from METAL</p>
    </>
  );
}
