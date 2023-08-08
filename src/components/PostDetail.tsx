import { FullPost, SimplePost } from '@/model/posts';
import Image from 'next/image';
import ActionBar from './ActionBar';
import CommentForm from './CommentForm';
import Comment from './Comment';
import useSWR from 'swr';
import PostUserAvatar from './PostUserAvatar';
import useFullPost from '@/hooks/useFullPost';
import useMe from '@/hooks/useMe';

export default function PostDetail({ post }: { post: SimplePost }) {
  const { userImage, username, image } = post;
  const { post: data, postComment } = useFullPost(post.id);
  const { user } = useMe();
  const comments = data?.comments;

  const handlePostComment = (comment: string) => {
    user &&
      postComment({
        comment,
        username: user.username,
        image: user.image || '',
      });
  };

  return (
    <section className='flex w-5/6 h-3/5 bg-white'>
      <div className='relative basis-3/5'>
        <Image
          src={image}
          alt={`photo by ${username}`}
          priority
          fill
          className='650px object-cover'
        />
      </div>
      <div className='w-full basis-2/5 flex flex-col'>
        <div className='flex-1'>
          <PostUserAvatar image={userImage} username={username} />
          <ul className='p-3 border-t border-gray-300 overflow-y-auto'>
            {comments?.map(({ image, username, comment }, index) => (
              <li key={index} className='mb-1'>
                <Comment image={image} username={username} text={comment} />
              </li>
            ))}
          </ul>
        </div>
        <div>
          <ActionBar post={post} />
          <CommentForm onPostCommet={handlePostComment} />
        </div>
      </div>
    </section>
  );
}
