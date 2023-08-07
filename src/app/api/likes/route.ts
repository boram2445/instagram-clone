import { dislikePost, likePost } from '@/service/posts';
import { authOptions } from '../auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(reqest: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response('Authentication Error', { status: 401 });
  }

  //request로 받아온 body 부분을 가져온다 - post id와 like가 true인지 false인지
  const { id, like } = await reqest.json();

  if (!id || like === undefined) {
    return new Response('Bad Request', { status: 400 });
  }

  const request = like ? likePost : dislikePost;

  return request(id, user.id) //
    .then((res) => NextResponse.json(res))
    .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
}
