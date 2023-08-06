import { BookmarkIcon, HeartIcon } from './ui/icons';
import { parseDate } from '@/util/date';

type Props = {
  likes: string[];
  username?: String;
  text?: string;
  createdAt: string;
};

export default function ActionBar({ likes, username, text, createdAt }: Props) {
  return (
    <>
      <div className='flex justify-between mt-2 px-4'>
        <HeartIcon />
        <BookmarkIcon />
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
