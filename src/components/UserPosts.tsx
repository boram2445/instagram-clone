'use client';

import { ProfileUser } from '@/model/user';

import { useState } from 'react';
import { BookmarkIcon, HeartIcon, PostIcon } from './ui/icons';
import PostGrid from './PostGrid';
import { CacheKeysContext } from '@/context/CacheKeysContext';

type Props = {
  user: ProfileUser;
};

const tabs = [
  { type: 'posts', icon: <PostIcon /> },
  { type: 'saved', icon: <BookmarkIcon className='w-4 h-4' /> },
  { type: 'liked', icon: <HeartIcon className='w-4 h-4' /> },
];

export default function UserPosts({ user: { username } }: Props) {
  const [tab, setTab] = useState(tabs[0].type);

  return (
    <section>
      <ul className='flex justify-center uppercase'>
        {tabs.map(({ type, icon }, index) => (
          <li
            key={index}
            className={`cursor-pointer flex gap-3 items-center mx-12 p-4 border-gray-600 ${
              type === tab && 'font-bold border-t'
            } `}
            onClick={() => setTab(type)}
          >
            <button>{icon}</button>
            <span className='hidden md:inline'>{type}</span>
          </li>
        ))}
      </ul>
      <CacheKeysContext.Provider
        value={{ postsKey: `/api/users/${username}/${tab}` }}
      >
        <PostGrid />
      </CacheKeysContext.Provider>
    </section>
  );
}
