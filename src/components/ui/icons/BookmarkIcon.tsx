import { BsBookmark } from 'react-icons/bs';

type Props = {
  className?: string;
};

export default function BookMarkIcon({ className }: Props) {
  return <BsBookmark className={className || 'w-7 h-7'} />;
}
