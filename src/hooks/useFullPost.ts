import { Comment, FullPost } from '@/model/posts';
import useSWR from 'swr';

async function addComment(postId: string, comment: string) {
  return fetch('/api/comment', {
    method: 'POST',
    body: JSON.stringify({ id: postId, comment }),
  }).then((res) => res.json());
}

export default function useFullPost(postId: string) {
  const {
    data: post,
    isLoading,
    error,
    mutate,
  } = useSWR<FullPost>(`/api/posts/${postId}`);

  const postComment = (comment: Comment) => {
    if (!post) return;

    const newComments = {
      ...post,
      comments: [...post.comments, comment],
    };

    return mutate(addComment(post.id, comment.comment), {
      optimisticData: newComments,
      populateCache: false,
      revalidate: false,
      rollbackOnError: true,
    });
  };

  return { post, isLoading, error, postComment };
}
