import { dislikePost, likePost } from '@/service/posts';
import { NextRequest, NextResponse } from 'next/server';
import { withSessionUser } from '@/util/session';

export async function PUT(req: NextRequest) {
  return withSessionUser(async (user) => {
    //request로 받아온 body 부분을 가져온다 - post id와 like가 true인지 false인지
    const { id, like } = await req.json();

    if (!id || like === undefined) {
      return new Response('Bad Request', { status: 400 });
    }

    const request = like ? likePost : dislikePost;

    return request(id, user.id) //
      .then((res) => NextResponse.json(res))
      .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
  });
}
