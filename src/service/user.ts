import { client } from './sanity';

//user 데이타 타입
type OAuthUser = {
  id: string;
  email: string;
  name: string;
  image?: string | null;
  username: string;
};

export async function addUser({ id, username, email, image, name }: OAuthUser) {
  return client.createIfNotExists({
    _id: id, //전달받은 id로 id생성
    _type: 'user', //user라는 스키마 타입에 추가
    username,
    email,
    name,
    image,
    following: [],
    followers: [],
    bookmarks: [],
  });
}

export async function getUserByUsername(username: string) {
  return client.fetch(
    `*[_type == "user" && username == "${username}"][0]{
      ...,
      "id":_id,
      following[]->{username,image},
      followers[]->{username,image},
      "bookmarks":bookmarks[]->_id
    }`
  );
}
