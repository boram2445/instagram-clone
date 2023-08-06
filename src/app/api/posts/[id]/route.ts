import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route';
import { getPost } from '@/service/posts';

type Context = {
  params: { id: string };
};
export async function GET(request: Request, context: Context) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response('Authentication Error', { status: 401 });
  }

  return await getPost(context.params.id).then((data) =>
    NextResponse.json(data)
  );
}
