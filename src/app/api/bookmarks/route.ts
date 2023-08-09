import { NextRequest, NextResponse } from 'next/server';
import { addbookmarkPost, removeBookmarkPost } from '@/service/posts';
import { withSessionUser } from '@/util/session';

export async function PUT(req: NextRequest) {
  return withSessionUser(async (user) => {
    const { id, bookmarked } = await req.json();

    if (!id || bookmarked == null) {
      return new Response('Bad Request', { status: 400 });
    }

    const request = bookmarked ? addbookmarkPost : removeBookmarkPost;

    return request(user.id, id)
      .then((res) => NextResponse.json(res))
      .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
  });
}
