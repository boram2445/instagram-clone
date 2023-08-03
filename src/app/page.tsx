import FollowingBar from '@/components/FollowingBar';
import PostList from '@/components/PostList';
import SideBar from '@/components/SideBar';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    redirect('/auth/signin');
  }

  return (
    <section className='flex flex-col md:flex-row'>
      <div className='grow'>
        <FollowingBar />
        <PostList />
      </div>
      <div className='basis-1/4'>
        <SideBar user={user} />
      </div>
    </section>
  );
}
