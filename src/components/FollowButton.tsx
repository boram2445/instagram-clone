'use client';

import { HomeUser, ProfileUser } from '@/model/user';
import useSWR from 'swr';

type Prop = { user: ProfileUser };

export default function FollowButton({ user }: Prop) {
  const { data: loggedInUser } = useSWR<HomeUser>('/api/me');

  const showButton = loggedInUser && loggedInUser.username !== user.username;
  const following =
    loggedInUser &&
    loggedInUser.following.find((item) => item.username === user.username);

  const text = following ? 'Unfollow' : 'Follow';

  return (
    <>
      {showButton && (
        <button
          onClick={() => {}}
          className={`py-0.5 px-3 ${
            following ? 'bg-orange-500' : 'bg-green-500'
          } rounded-full text-white hover:brightness-95`}
        >
          {text}
        </button>
      )}
    </>
  );
}
