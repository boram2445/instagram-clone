import { BsBookmarkFill } from 'react-icons/bs';

type Props = {
  className?: string;
};

export default function BookMarkFillIcon({ className }: Props) {
  return <BsBookmarkFill className={className || 'w-7 h-7'} />;
}
