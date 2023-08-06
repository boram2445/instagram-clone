'use client';

import Image from 'next/image';
import { useState } from 'react';
import { SimplePost } from '@/model/posts';
import Avatar from './ui/Avatar';
import CommentForm from './CommentForm';
import ActionBar from './ActionBar';
import PostDetail from './PostDetail';
import ModalContainer from './ui/ModalContainer';
import PostUserAvatar from './PostUserAvatar';

export default function PostCard({ post }: { post: SimplePost }) {
  const [openModal, setOpenModal] = useState(false);
  const { userImage, username, image, createdAt, likes, text } = post;

  const handleCloseDetail = () => setOpenModal(false);

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
        <ActionBar
          likes={likes}
          createdAt={createdAt}
          username={username}
          text={text}
        />
        <CommentForm />
      </article>
      {openModal && (
        <ModalContainer onClose={handleCloseDetail}>
          <PostDetail post={post} />
        </ModalContainer>
      )}
    </>
  );
}
