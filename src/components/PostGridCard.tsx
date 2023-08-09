'use client';

import { SimplePost } from '@/model/posts';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useState } from 'react';
import ModalContainer from './ui/ModalContainer';
import PostDetail from './PostDetail';

type Props = {
  post: SimplePost;
  priority: boolean;
};

export default function PostGridCard({ post, priority }: Props) {
  const { data: session } = useSession();
  const [openModal, setOpenModal] = useState(false);
  const { image, username } = post;

  //로그인한 사용자일 경우에만 포스트 보여주기
  const handleOpenPost = () => {
    if (!session) {
      return signIn();
    }
    setOpenModal(true);
  };

  const handleCloseDetail = () => setOpenModal(false);

  return (
    <>
      <div className='relative w-full aspect-square hover:brightness-95 cursor-pointer'>
        <Image
          src={image}
          alt={`photo by ${username}`}
          fill
          sizes='650px'
          className='object-cover'
          onClick={handleOpenPost}
          priority={priority}
        />
      </div>
      {openModal && (
        <ModalContainer onClose={handleCloseDetail}>
          <PostDetail post={post} />
        </ModalContainer>
      )}
    </>
  );
}
