import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';
import NewPost from '@/components/NewPost';

export const metadata: Metadata = {
  title: 'New Post',
  description: 'Create a new post',
};

export default async function NewPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    redirect('/auth/signin');
  }

  return <NewPost user={user} />;
}
