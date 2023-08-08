import { ChangeEvent, FormEvent, useState } from 'react';
import { signIn } from 'next-auth/react';
import { SmileIcon } from './ui/icons';
import useMe from '@/hooks/useMe';

type Props = {
  onPostCommet: (comment: string) => void;
};

export default function CommentForm({ onPostCommet }: Props) {
  const { user } = useMe();

  const [commentText, setCommentText] = useState('');

  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (commentText === '') return;
    if (!user) {
      signIn();
      return;
    }
    onPostCommet(commentText);
    setCommentText('');
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCommentText(e.target.value);
  };

  return (
    <form
      onSubmit={handleOnSubmit}
      className='flex items-center border-t border-neutral-300 p-3'
    >
      <SmileIcon />
      <input
        className='w-full ml-2 border-none outline-none'
        type='text'
        placeholder='Add a comment...'
        onChange={handleOnChange}
        value={commentText}
        required
      />
      <button
        disabled={commentText === ''}
        className='font-bold text-orange-500 ml-2 disabled:opacity-60'
      >
        Post
      </button>
    </form>
  );
}
