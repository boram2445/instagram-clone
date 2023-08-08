import { useState } from 'react';
import {
  BookmarkFillIcon,
  BookmarkIcon,
  HeartFillIcon,
  HeartIcon,
} from './ui/icons';
import usePosts from '@/hooks/usePosts';
import { parseDate } from '@/util/date';
import { SimplePost } from '@/model/posts';
import ToggleButton from './ui/ToggleButton';
import useMe from '@/hooks/useMe';

type Props = {
  post: SimplePost;
};

export default function ActionBar({ post }: Props) {
  const { likes, text, username, createdAt } = post;
  const { user, setBookmark } = useMe();
  const { setLike } = usePosts();

  const liked = user ? likes.includes(user.username) : false;
  const bookmarked = user?.bookmarks.includes(post.id) ?? false;

  const handleLike = (like: boolean) => {
    user && setLike(post, user.username, like);
  };

  const handleBookmark = (bookmark: boolean) => {
    user && setBookmark(post.id, bookmark);
  };
  return (
    <>
      <div className='flex justify-between mt-2 px-4'>
        <ToggleButton
          toggled={liked}
          onToggle={handleLike}
          onIcon={<HeartFillIcon />}
          offIcon={<HeartIcon />}
        />
        <ToggleButton
          toggled={bookmarked}
          onToggle={handleBookmark}
          onIcon={<BookmarkFillIcon />}
          offIcon={<BookmarkIcon />}
        />
      </div>
      <div className='px-4 py-1'>
        <p className='text-sm font-bold mb-2'>{`${likes?.length ?? 0} ${
          likes?.length > 1 ? 'likes' : 'like'
        }`}</p>
        {text && username && (
          <p>
            <span className='font-bold mr-1'>{username}</span>
            {text}
          </p>
        )}
        <small className='text-xs text-neutral-500 uppercase my-2'>
          {parseDate(createdAt)}
        </small>
      </div>
    </>
  );
}
