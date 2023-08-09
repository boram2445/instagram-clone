import { addCommentPost } from '@/service/posts';
import { NextRequest, NextResponse } from 'next/server';
import { withSessionUser } from '@/util/session';

export async function POST(req: NextRequest) {
  return withSessionUser(async (user) => {
    const { id, comment } = await req.json(); //postId, comment

    if (!id || comment == null) {
      return new Response('Bad Request', { status: 400 });
    }

    return addCommentPost(user.id, id, comment) //
      .then((res) => NextResponse.json(res))
      .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
  });
}
