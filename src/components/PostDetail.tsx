import { FullPost, SimplePost } from '@/model/posts';
import Image from 'next/image';
import ActionBar from './ActionBar';
import CommentForm from './CommentForm';
import Avatar from './ui/Avatar';
import Comment from './Comment';
import useSWR from 'swr';
import PostUserAvatar from './PostUserAvatar';

export default function PostDetail({ post }: { post: SimplePost }) {
  const { userImage, username, image, createdAt, likes, text, id } = post;
  const { data } = useSWR<FullPost>(`/api/posts/${id}`);
  const comments = data?.comments;
  return (
    <section className='w-[400px] md:w-[900px] flex flex-col md:flex-row bg-white'>
      <Image
        src={image}
        alt={`photo by ${username}`}
        width={400}
        height={400}
        className='object-cover aspect-square basis-3/5'
      />
      <div className='basis-2/5 flex flex-col'>
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
          <ActionBar likes={likes} createdAt={createdAt} />
          <CommentForm />
        </div>
      </div>
    </section>
  );
}
