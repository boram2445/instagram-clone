'use client';
import useSWR from 'swr';
import { ProfileUser } from '@/model/user';
import { FormEvent, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import SearchCard from './SearchCard';
import useDebounce from '@/hooks/useDebounce';

export default function UserSearch() {
  const [keyword, setKeyword] = useState('');
  const debouncedKeyword = useDebounce(keyword, 1000);
  const {
    data: users,
    error,
    isLoading: loading,
  } = useSWR<ProfileUser[]>(`/api/search/${debouncedKeyword}`);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(() => e.target.value);
  };

  return (
    <section className='w-full flex flex-col items-center'>
      <form
        onSubmit={handleSubmit}
        className='w-full max-w-[600px] mx-auto mb-5'
      >
        <input
          autoFocus
          type='text'
          placeholder='Search for a username or name'
          value={keyword}
          onChange={handleOnChange}
          className='w-full p-2 border border-gray-300 shadow-sm'
        />
      </form>
      {error && <p>무언가가 잘못되었음😭</p>}
      {loading && <ClipLoader color='pink' />}
      {!loading && !error && users?.length === 0 && <p>찾는 사용자가 없음</p>}
      {users && (
        <ul className='w-full'>
          {users?.map((user, index) => (
            <li key={index} className='mb-2'>
              <SearchCard user={user} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
