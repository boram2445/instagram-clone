import { getServerSession } from 'next-auth';
import { getProviders } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Signin from '@/components/Signin';

type Props = {
  searchParams: {
    callbackUrl: string;
  };
};

export default async function SigninPage({
  searchParams: { callbackUrl },
}: Props) {
  //세션에 대한 정보 가져옴
  const session = await getServerSession(authOptions);

  //세션이 있는 경우
  if (session) {
    redirect('/');
  }

  const providers = (await getProviders()) ?? {}; //null을 반환하면 {} 이걸 사용해라

  return (
    <section className='flex justify-center mt-24'>
      <Signin providers={providers} callbackUrl={callbackUrl ?? '/'} />
    </section>
  );
}
