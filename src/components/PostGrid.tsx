import { ClipLoader } from 'react-spinners';
import PostGridCard from './PostGridCard';
import usePosts from '@/hooks/usePosts';

export default function PostGrid() {
  const { posts, isLoading, error } = usePosts();

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
