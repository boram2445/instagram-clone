import { NextResponse } from 'next/server';

import { getLikedPostsOf, getPostsOf, getSavedPostsOf } from '@/service/posts';

type Context = {
  params: {
    slug: string[];
  };
};

export async function GET(_: Request, context: Context) {
  const { slug } = context.params;

  //잘못된 경로일 경우
  if (!slug || !Array.isArray(slug) || slug.length < 2) {
    return new NextResponse('Bad Reqest', { status: 400 });
  }

  const [username, query] = slug;

  //함수 참조값으로 쿼리 값에 따라서 선택만 해두었다.
  let request = getPostsOf;
  if (query === 'saved') {
    request = getSavedPostsOf;
  } else if (query === 'liked') {
    request = getLikedPostsOf;
  }

  return await request(username).then((data) => NextResponse.json(data));
}
