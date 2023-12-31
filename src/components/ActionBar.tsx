import {
  BookmarkFillIcon,
  BookmarkIcon,
  HeartFillIcon,
  HeartIcon,
} from './ui/icons';
import usePosts from '@/hooks/usePosts';
import { parseDate } from '@/util/date';
import { Comment, SimplePost } from '@/model/posts';
import ToggleButton from './ui/ToggleButton';
import useMe from '@/hooks/useMe';
import CommentForm from './CommentForm';

type Props = {
  post: SimplePost;
  children?: React.ReactNode;
  onComment: (comment: Comment) => void;
};

export default function ActionBar({ post, children, onComment }: Props) {
  const { likes, createdAt } = post;
  const { user, setBookmark } = useMe();
  const { setLike } = usePosts();

  const liked = user ? likes.includes(user.username) : false;
  const bookmarked = user?.bookmarks.includes(post.id) ?? false;

  const handleLike = (like: boolean) => {
    user && setLike(post, user.username, like);
  };

  const handleBookmark = (bookmark: boolean) => {
    user && setBookmark(post.id, bookmark);
  };

  const handleComment = (comment: string) => {
    user &&
      onComment({ comment, username: user.username, image: user.image || '' });
  };
  return (
    <>
      <div className='flex justify-between mt-2 px-4'>
        <ToggleButton
          toggled={liked}
          onToggle={handleLike}
          onIcon={<HeartFillIcon />}
          offIcon={<HeartIcon />}
          title={liked ? 'unlike' : 'like'}
        />
        <ToggleButton
          toggled={bookmarked}
          onToggle={handleBookmark}
          onIcon={<BookmarkFillIcon />}
          offIcon={<BookmarkIcon />}
          title={bookmarked ? 'unbookmark' : 'bookmark'}
        />
      </div>
      <div className='px-4 py-1'>
        <p className='text-sm font-bold mb-2'>{`${likes?.length ?? 0} ${
          likes?.length > 1 ? 'likes' : 'like'
        }`}</p>
        {children}
        <small className='text-xs text-neutral-500 uppercase my-2'>
          {parseDate(createdAt)}
        </small>
      </div>
      <CommentForm onPostCommet={handleComment} />
    </>
  );
}
