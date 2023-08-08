import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { addbookmarkPost, removeBookmarkPost } from '@/service/posts';

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response('Authentication error', { status: 401 });
  }

  const { id, bookmarked } = await req.json();

  if (!id || bookmarked === undefined) {
    return new Response('Bad Request', { status: 400 });
  }

  const request = bookmarked ? addbookmarkPost : removeBookmarkPost;

  return request(user.id, id)
    .then((res) => NextResponse.json(res))
    .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
}
