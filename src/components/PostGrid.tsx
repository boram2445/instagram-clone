import useSWR from 'swr';

import { SimplePost } from '@/model/posts';
import { ClipLoader } from 'react-spinners';
import PostGridCard from './PostGridCard';

type Props = {
  username: string;
  query: string;
};

export default function PostGrid({ username, query }: Props) {
  const {
    data: posts,
    isLoading,
    error,
  } = useSWR<SimplePost[]>(`/api/users/${username}/${query}`);

  return (
    <div className='w-full text-center'>
      {isLoading && <ClipLoader color='pink' />}
      {!isLoading && !error && posts?.length === 0 && <p>포스트가 없습니다</p>}
      {posts && (
        <ul className='grid grid-cols-2 md:grid-cols-3 gap-4 py-4 px-8'>
          {posts.map((post, index) => (
            <li key={post.id}>
              <PostGridCard post={post} priority={index < 6} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
