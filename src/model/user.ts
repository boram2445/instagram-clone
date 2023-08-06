//세션상에서 얻을수 있는 사용자 정보
export type User = {
  name: string;
  username: string;
  email: string;
  image?: string;
};

//User타입에서 특정 타입만 pick해서 사용할 수 있다.
export type SimpleUser = Pick<User, 'username' | 'image'>;

export type DetailUser = User & {
  following: SimpleUser[];
  followers: SimpleUser[];
  bookmarks: string[];
};

export type ProfileUser = User & {
  following: number;
  followers: number;
};
