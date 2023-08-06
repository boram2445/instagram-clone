import UserInfoCard from '@/components/UserInfoCard';
import { getUserForProfile } from '@/service/user';
import { notFound } from 'next/navigation';

type Props = {
  params: {
    slug: string;
  };
};

export default async function UserPage({ params: { slug } }: Props) {
  const user = await getUserForProfile(slug);

  if (!user) notFound();

  return (
    <>
      <UserInfoCard user={user} />
    </>
  );
}
