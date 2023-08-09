import { follow, unfollow } from '@/service/user';
import { NextRequest, NextResponse } from 'next/server';
import { withSessionUser } from '@/util/session';

export async function PUT(req: NextRequest) {
  return withSessionUser(async (user) => {
    //팔로우할 유저정보, 팔로잉할건지 상태
    const { id: targetId, isFollow } = await req.json();

    console.log(targetId, isFollow);
    if (!targetId || isFollow === undefined) {
      return new Response('Bad Request', { status: 400 });
    }

    const request = isFollow ? follow : unfollow;

    //두개 같이 실행하고 픈데
    return request(user.id, targetId) //
      .then((res) => NextResponse.json(res))
      .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
  });
}
