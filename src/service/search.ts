import { SearchUser } from '@/model/user';
import { client } from './sanity';

export async function searchUser(keyword?: string) {
  const query = keyword
    ? `&& (name match "*${keyword}*") || (username match "*${keyword}*")`
    : '';

  // keyword 똑같으면 덮인다.
  return client
    .fetch(
      `
        *[_type == "user" ${query}]{
            ...,
            "following":count(following), 
            "followers":count(followers),
        }
    `
    )
    .then((users: SearchUser[]) =>
      users.map((user) => ({
        ...user,
        following: user.following ?? 0,
        followers: user.followers ?? 0,
      }))
    );
}
