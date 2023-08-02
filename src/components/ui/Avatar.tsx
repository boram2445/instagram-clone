type Props = {
  image?: string | null;
  size?: 'small' | 'big';
};

export default function Avatar({ image, size = 'small' }: Props) {
  return (
    <div
      className={` ${
        size === 'small' ? 'w-9 h-9' : 'w-14 h-14'
      } p-0.5 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt='user profile'
        src={image ?? undefined}
        className='flex h-full w-full items-center justify-center rounded-full '
        referrerPolicy='no-referrer' //구글 이미지 url이 x박스로 표기되는 경우가 있음.이것을 막기 위함
      />
    </div>
  );
}
