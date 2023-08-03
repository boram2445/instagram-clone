type Props = {
  image?: string | null;
  size?: 'small' | 'big';
  highlight?: boolean;
};

export default function Avatar({
  image,
  size = 'small',
  highlight = true,
}: Props) {
  return (
    <div className={getContainerStyle(size, highlight)}>
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

function getContainerStyle(size: string, highlight: boolean): string {
  const baseStyle = 'rounded-full';
  const highlightStyle = highlight
    ? 'p-0.5 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500'
    : '';
  const sizeStyle = size === 'small' ? 'w-9 h-9' : 'w-14 h-14';
  return `${baseStyle} ${highlightStyle} ${sizeStyle}`;
}
