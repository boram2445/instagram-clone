'use client';

import PostUserAvatar from './PostUserAvatar';
import { AuthUser } from '@/model/user';
import { FilesIcon } from './ui/icons';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ClipLoader } from 'react-spinners';

type Props = {
  user: AuthUser;
};

export default function NewPost({ user }: Props) {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const textRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target?.files;
    if (files && files[0]) {
      setFile(files[0]); //파일 저장
    }
  };
  const handleDrag = (e: React.DragEvent) => {
    if (e.type === 'dragenter') {
      setDragging(true);
    } else if (e.type === 'dragleave') {
      setDragging(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    //파일을 드랍했을때 브라우저 내부적으로 해당 파일을 브라우저 페이지에서 열려고 하는 행동 취소
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    //드래깅할때 파일이있는지 확인
    const files = e.dataTransfer?.files;
    if (files && files[0]) {
      setFile(files[0]); //파일 저장
    }
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('text', textRef.current?.value ?? '');

    fetch('/api/posts', {
      method: 'POST',
      body: formData,
    })
      .then((res) => {
        if (!res.ok) {
          setError(`${res.status} ${res.statusText}`);
          return;
        }
        router.push('/');
      })
      .catch((err) => setError(err.toString()))
      .finally(() => setLoading(false));
  };

  return (
    <section className='flex flex-col items-center'>
      {loading && (
        <div className='absolute inset-0 z-20 text-center pt-[30%] bg-orange-200 bg-opacity-20'>
          <ClipLoader color='pink' />
        </div>
      )}
      {error && (
        <p className='w-full bg-red-100 text-red-600 text-center p-4 mb-4 font-bold'>
          {error}
        </p>
      )}
      <PostUserAvatar image={user.image ?? ''} username={user.username} />
      <form
        className='w-full max-w-[500px] flex flex-col gap-2'
        onSubmit={handleSubmit}
      >
        {/* input은 사용자에게 보이지 않도록 hidden처리 해준다 */}
        <input
          className='hidden'
          name='input'
          id='input-upload'
          type='file'
          accept='image/*'
          onChange={handleChange}
        />
        <label
          htmlFor='input-upload'
          className={`h-60 rounded-md flex flex-col items-center justify-center hover:bg-gray-200 hover:bg-opacity-90 ${
            !file && 'border border-dashed border-orange-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {/* 드래그 할때 배경화면 색상 변경하기 */}
          {dragging && (
            <div className='absolute inset-0 z-10 bg-orange-500/20 pointer-events-none'></div>
          )}
          {!file && (
            <>
              <FilesIcon />
              <p>Drag and Drop your image here or click</p>
            </>
          )}
          {/* file을 url로 만들어줌 */}
          {file && (
            <div className='relative w-full aspect-square'>
              <Image
                src={URL.createObjectURL(file)}
                alt='local file'
                fill
                sizes='650px'
                className='object-cover'
              />
            </div>
          )}
        </label>
        <textarea
          placeholder='Write a catption...'
          id='input-text'
          className='w-full p-2'
          required
          rows={5}
          ref={textRef}
        />
        <button className='block py-1 bg-orange-500 text-white w-full rounded-xl hover:brightness-90'>
          Publish
        </button>
      </form>
    </section>
  );
}
