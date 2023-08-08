import { SimplePost } from '@/model/posts';
import Image from 'next/image';
import ActionBar from './ActionBar';
import Comment from './Comment';
import PostUserAvatar from './PostUserAvatar';
import useFullPost from '@/hooks/useFullPost';

export default function PostDetail({ post }: { post: SimplePost }) {
  const { userImage, username, image } = post;
  const { post: data, postComment } = useFullPost(post.id);
  const comments = data?.comments;

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
        <PostUserAvatar image={userImage} username={username} />
        <ul className='h-full p-3 border-t border-gray-300 overflow-y-auto'>
          {comments?.map(({ image, username, comment }, index) => (
            <li key={index} className='mb-1'>
              <Comment image={image} username={username} text={comment} />
            </li>
          ))}
        </ul>
        <ActionBar post={post} onComment={postComment} />
      </div>
    </section>
  );
}
