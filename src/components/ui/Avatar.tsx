type AvartarSize = 'small' | 'medium' | 'big' | 'max';

type Props = {
  image?: string | null;
  size?: AvartarSize;
  highlight?: boolean;
};

export default function Avatar({
  image,
  size = 'small',
  highlight = true,
}: Props) {
  return (
    <div
      className={`${getContainerStyle(size, highlight)} ${getSizeStyle(size)}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt='user profile'
        src={image ?? undefined}
        className='bg-white p-0.5 h-full w-full rounded-full object-cover'
        referrerPolicy='no-referrer' //구글 이미지 url이 x박스로 표기되는 경우가 있음.이것을 막기 위함
      />
    </div>
  );
}

function getContainerStyle(size: AvartarSize, highlight: boolean): string {
  const baseStyle = 'rounded-full flex justify-center items-center';
  const highlightStyle = highlight
    ? 'p-0.5 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500'
    : '';
  return `${baseStyle} ${highlightStyle}`;
}

function getSizeStyle(size: AvartarSize): string {
  switch (size) {
    case 'small':
      return 'w-10 h-10';
    case 'medium':
      return 'w-12 h-12';
    case 'big':
      return 'w-14 h-14';
    case 'max':
      return 'w-[100px] h-[100px]';
  }
}
