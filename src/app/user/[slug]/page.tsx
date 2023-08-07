import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import { getUserForProfile } from '@/service/user';
import UserInfoCard from '@/components/UserInfoCard';
import UserPosts from '@/components/UserPosts';

type Props = {
  params: {
    slug: string;
  };
};

const getUser = cache(async (username: string) => getUserForProfile(username));

export default async function UserPage({ params: { slug } }: Props) {
  const user = await getUser(slug);

  if (!user) notFound();

  return (
    <>
      <UserInfoCard user={user} />
      <UserPosts user={user} />
    </>
  );
}

export async function generateMetadata({
  params: { slug },
}: Props): Promise<Metadata> {
  const user = await getUser(slug);

  return {
    title: `${user?.name} (@${user?.username}) · Instantgram Photos`,
    description: `${user?.name}'s all Instantgram posts`,
  };
}
