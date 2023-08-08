import useSWR from 'swr';
import { HomeUser } from '@/model/user';

async function updateBookmark(postId: string, bookmarked: boolean) {
  return fetch('/api/bookmarks', {
    method: 'PUT',
    body: JSON.stringify({ id: postId, bookmarked }),
  }).then((res) => res.json());
}

export default function useMe() {
  const { data: user, error, isLoading, mutate } = useSWR<HomeUser>('/api/me');

  const setBookmark = (postId: string, bookmark: boolean) => {
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
  };

  return { user, error, isLoading, setBookmark };
}
