import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  // defaultSession user type을 그대로 가져가면서 username type추가
  interface Session {
    user: {
      username: string;
    } & DefaultSession['user'];
  }
}
