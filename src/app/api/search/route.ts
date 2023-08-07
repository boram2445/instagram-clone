import { searchUser } from '@/service/search';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  return searchUser().then((data) => NextResponse.json(data));
}
