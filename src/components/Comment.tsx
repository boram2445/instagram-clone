import Avatar from './ui/Avatar';

type Props = {
  image: string;
  username: string;
  text: string;
};

export default function Comment({ image, username, text }: Props) {
  return (
    <div className='flex items-center gap-1'>
      <Avatar size='small' image={image} />
      <span className='text-gray-900 font-bold ml-1'>{username}</span>
      <span className='flex-1'>{text}</span>
    </div>
  );
}
