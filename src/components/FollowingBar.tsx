'use client';

import { DetailUser } from '@/model/user';
import { PropagateLoader } from 'react-spinners';
import useSWR from 'swr';

//4.클라이언트 컴포넌트에서 followings의 정보를 UI에 보여줌
// (image,username)

export default function FollowingBar() {
  const { data, error, isLoading: loading } = useSWR<DetailUser>('/api/me');
  const users = data?.following;

  console.log(data);
  return (
    <section>
      {loading ? (
        <PropagateLoader size={8} color='red' />
      ) : (
        (!users || users.length === 0) && <p>{`You don't have following`}</p>
      )}
    </section>
  );
}
