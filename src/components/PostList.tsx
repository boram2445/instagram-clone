'use client';

import { ClipLoader } from 'react-spinners';
import PostCard from './PostCard';
import usePosts from '@/hooks/usePosts';

export default function PostList() {
  const { posts, isLoading: loading, error } = usePosts();

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
