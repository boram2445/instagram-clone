import { Comment, SimplePost } from '@/model/posts';
import { useCallback } from 'react';
import useSWR from 'swr';

async function updateLike(id: string, like: boolean) {
  return fetch('/api/likes', {
    method: 'PUT',
    body: JSON.stringify({ id, like }),
  }).then((res) => res.json());
}

async function addComment(postId: string, comment: string) {
  return fetch('/api/comment', {
    method: 'POST',
    body: JSON.stringify({ id: postId, comment }),
  }).then((res) => res.json());
}

export default function usePosts() {
  const {
    data: posts,
    isLoading,
    error,
    mutate,
  } = useSWR<SimplePost[]>('/api/posts');

  const setLike = useCallback(
    (post: SimplePost, username: string, like: boolean) => {
      //미리 업데이트할 UI 정보
      const newPost = {
        ...post,
        likes: like
          ? [...post.likes, username]
          : post.likes.filter((item) => item !== username),
      };
      const newPosts = posts?.map((p) => (p.id === post.id ? newPost : p));

      //fetch를 해서 like정보를 업데이트 할거다,
      //그런데 optimisticData에 설정한 것으로 UI를 미리 업데이트해주라
      return mutate(updateLike(post.id, like), {
        optimisticData: newPosts,
        populateCache: false, //로컬상에서먼저 업뎃한 캐시를 fetch에서 반환된 실제 데이터로 덮을꺼냐
        revalidate: false, //fetch하고 업데이트된 결과를 다시 받아올거냐? - 이미 업데이트 먼저 해뒀기 때문에 안할거당
        rollbackOnError: true, //만약, like 요청과정에서 문제가 생기면, optimisticData로 다시 돌아가줘
      });
    },
    [posts, mutate]
  );

  const postComment = useCallback(
    (post: SimplePost, comment: Comment) => {
      const newPost = {
        ...post,
        comments: post.comments + 1,
      };
      const newPosts = posts?.map((p) => (p.id === post.id ? newPost : p));

      return mutate(addComment(post.id, comment.comment), {
        optimisticData: newPosts,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      });
    },
    [mutate, posts]
  );

  return { posts, isLoading, error, setLike, postComment };
}
