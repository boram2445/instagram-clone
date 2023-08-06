import { ProfileUser } from '@/model/user';
import Avatar from './ui/Avatar';
import FollowButton from './FollowButton';

type Props = {
  user: ProfileUser;
};
export default function UserInfoCard({ user }: Props) {
  const { username, name, image, posts, followers, following } = user;
  const info = [
    { name: 'posts', number: posts },
    { name: 'followers', number: followers },
    { name: 'following', number: following },
  ];

  return (
    <section className='py-6 px-3 w-full mx-auto flex flex-col md:flex-row items-center justify-center gap-2 md:gap-7 border-b border-neutral-200'>
      <Avatar image={image} size='max' />
      <div className='flex flex-col gap-2 '>
        <div className='flex flex-col md:flex-row items-center justify-between'>
          <h1 className='font-semibold'>{username}</h1>
          <FollowButton user={user} />
        </div>
        <ul className='flex gap-2'>
          {info.map(({ name, number }, index) => (
            <li key={index}>
              <span className='font-semibold mr-1'>{number}</span>
              {name}
            </li>
          ))}
        </ul>
        <p className='font-bold text-center md:text-start'>{name}</p>
      </div>
    </section>
  );
}
