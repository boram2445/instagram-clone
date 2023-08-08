import useSWR from 'swr';
import { HomeUser } from '@/model/user';
import { useCallback } from 'react';

async function updateBookmark(postId: string, bookmarked: boolean) {
  return fetch('/api/bookmarks', {
    method: 'PUT',
    body: JSON.stringify({ id: postId, bookmarked }),
  }).then((res) => res.json());
}

async function updateFollow(targetId: string, follow: boolean) {
  return fetch('/api/follow', {
    method: 'PUT',
    body: JSON.stringify({ id: targetId, isFollow: follow }),
  }).then((res) => res.json());
}

export default function useMe() {
  const { data: user, error, isLoading, mutate } = useSWR<HomeUser>('/api/me');

  const setBookmark = useCallback(
    (postId: string, bookmark: boolean) => {
      if (!user) return;
      const bookmarks = user.bookmarks;
      const newUser = {
        ...user,
        bookmarks: bookmark
          ? [...bookmarks, postId]
          : bookmarks.filter((b) => b !== postId),
      };

      return mutate(updateBookmark(postId, bookmark), {
        optimisticData: newUser,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      });
    },
    [user, mutate]
  );

  //user뿐만아니라, 팔로잉한 user의 데이터도 변경했기때문에, optimisticData를 사용하지 않고
  //그냥 변경되었다고 알려줄 것이다.
  const toggleFollow = useCallback(
    (targetId: string, follow: boolean) => {
      return mutate(updateFollow(targetId, follow), { populateCache: false });
    },
    [mutate]
  );

  return { user, error, isLoading, setBookmark, toggleFollow };
}
