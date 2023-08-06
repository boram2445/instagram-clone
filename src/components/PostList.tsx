'use client';

import { SimplePost } from '@/model/posts';
import { ClipLoader } from 'react-spinners';
import useSWR from 'swr';
import PostCard from './PostCard';

export default function PostList() {
  const {
    data: posts,
    error,
    isLoading: loading,
  } = useSWR<SimplePost[]>('/api/posts');

  return (
    <section>
      {loading && (
        <div className='text-center mt-8'>
          <ClipLoader color='pink' />
        </div>
      )}
      {posts && (
        <ul>
          {posts.map((post) => (
            <li key={post.id} className='mb-4'>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
