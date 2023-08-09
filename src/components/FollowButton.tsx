'use client';

import useMe from '@/hooks/useMe';
import { ProfileUser } from '@/model/user';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { PulseLoader } from 'react-spinners';

type Prop = { user: ProfileUser };

export default function FollowButton({ user }: Prop) {
  const { user: loggedInUser, toggleFollow } = useMe();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const isUpdating = isPending || isFetching;

  const showButton = loggedInUser && loggedInUser.username !== user.username;
  const following =
    loggedInUser &&
    loggedInUser.following.find((item) => item.username === user.username);

  const text = following ? 'Unfollow' : 'Follow';
  const handleFollow = async () => {
    setIsFetching(true);
    await toggleFollow(user.id, !Boolean(following));
    setIsFetching(false);
    startTransition(() => {
      //팔로우 정보가 처리되면, 페이지를 리프레시해라
      router.refresh();
    });
  };

  return (
    <>
      {showButton && (
        <div className='relative'>
          {isUpdating && (
            <div className='absolute inset-0 flex justify-center items-center'>
              <PulseLoader size={6} />
            </div>
          )}
          <button
            disabled={isUpdating}
            onClick={handleFollow}
            className={`py-0.5 px-3 ${
              following ? 'bg-orange-500' : 'bg-green-500'
            } rounded-full text-white hover:brightness-95 disabled:opacity-70`}
          >
            {text}
          </button>
        </div>
      )}
    </>
  );
}
