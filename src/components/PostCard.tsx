'use client';

import Image from 'next/image';
import { useState } from 'react';
import { SimplePost } from '@/model/posts';
import CommentForm from './CommentForm';
import ActionBar from './ActionBar';
import PostDetail from './PostDetail';
import ModalContainer from './ui/ModalContainer';
import PostUserAvatar from './PostUserAvatar';
import usePosts from '@/hooks/usePosts';

export default function PostCard({ post }: { post: SimplePost }) {
  const [openModal, setOpenModal] = useState(false);
  const { userImage, username, image, text, comments } = post;
  const { postComment } = usePosts();

  const handleCloseDetail = () => setOpenModal(false);
  const handlePostComment = (comment: string) => {
    postComment(post, comment);
  };

  return (
    <>
      <article className='rounded-lg shadow-md border border-gray-200'>
        <PostUserAvatar image={userImage} username={username} />
        <Image
          onClick={() => setOpenModal(true)}
          src={image}
          alt={`photo by ${username}`}
          width={400}
          height={400}
          className='w-full object-cover aspect-square'
        />
        <ActionBar post={post}>
          <>
            {
              <p>
                <span className='font-bold mr-1'>{username}</span>
                {text}
              </p>
            }
            {comments > 1 && (
              <button
                onClick={() => setOpenModal(true)}
                className='block text-orange-500 font-semibold hover:underline cursor-pointer'
              >
                View all {comments} comments
              </button>
            )}
          </>
        </ActionBar>
        <CommentForm onPostCommet={handlePostComment} />
      </article>
      {openModal && (
        <ModalContainer onClose={handleCloseDetail}>
          <PostDetail post={post} />
        </ModalContainer>
      )}
    </>
  );
}
