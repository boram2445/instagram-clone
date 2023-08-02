type Props = {
  text: string;
  onClick: () => void;
  size?: 'small' | 'big';
};

export default function ColorButton({ text, onClick, size = 'small' }: Props) {
  return (
    <div
      className={`rounded-md bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 
    ${size === 'big' ? 'p-[0.3rem]' : 'p-1'}
    `}
    >
      <button
        onClick={onClick}
        className={`flex h-full w-full items-center justify-center rounded-md bg-white text-lg font-semibold hover:opacity-90 transition-all
        ${size === 'big' ? 'p-4 text-2xl' : 'px-2 py-0.5 text-base'}
        `}
      >
        {text}
      </button>
    </div>
  );
}
