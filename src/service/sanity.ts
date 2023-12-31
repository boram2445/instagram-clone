import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  useCdn: false, //동적인 데이타가 주로 들어있으니까 cdn에 캐시하지 않을것이다
  apiVersion: '2023-08-02', //최신 api를 사용하기 위해 현재 날짜를 적어야 한다
  token: process.env.SANITY_SECRET_TOKEN, //데이터를 읽기만 하면 토큰을 사용안해도 되지만, 데이타를 수정하려면 필요하다
});

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source).width(800).url();
}

//myProjectId.api.sanity.io/v2021-06-07/assets/images/myDataset
export const assetURL = `https://${process.env.SANITY_PROJECT_ID}.api.sanity.io/v2023-08-02/assets/images/${process.env.SANITY_DATASET}`;
