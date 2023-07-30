type Props = {
  text: string;
  onClick: () => void;
};

export default function ColorButton({ text, onClick }: Props) {
  return (
    <div className='p-1 rounded-md bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500'>
      <button
        onClick={onClick}
        className='flex px-2 py-0.5 h-full w-full items-center justify-center rounded-md bg-white text-lg font-semibold hover:opacity-90 transition-all'
      >
        {text}
      </button>
    </div>
  );
}
