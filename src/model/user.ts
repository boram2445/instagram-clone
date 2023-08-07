//세션상에서 얻을수 있는 사용자 정보
export type AuthUser = {
  id: string;
  name: string;
  username: string;
  email: string;
  image?: string;
};

//User타입에서 특정 타입만 pick해서 사용할 수 있다.
export type SimpleUser = Pick<AuthUser, 'username' | 'image'>;

export type HomeUser = AuthUser & {
  following: SimpleUser[];
  followers: SimpleUser[];
  bookmarks: string[];
};

export type SearchUser = AuthUser & {
  following: number;
  followers: number;
};

export type ProfileUser = SearchUser & {
  posts: number;
};
