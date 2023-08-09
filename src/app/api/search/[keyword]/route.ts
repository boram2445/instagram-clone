import { searchUser } from '@/service/search';
import { NextResponse } from 'next/server';

type Context = {
  params: {
    keyword: string;
  };
};

export async function GET(_: Request, context: Context) {
  return searchUser(context.params.keyword).then((data) =>
    NextResponse.json(data)
  );
}
