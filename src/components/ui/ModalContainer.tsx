import { createPortal } from 'react-dom';

type Props = {
  children: React.ReactNode;
  onClose: () => void;
};

export default function ModalContainer({ children, onClose }: Props) {
  //서버사이드 렌더링이 가능하기 때문에, 서버에서는 처리 안하도록 조건문 추가
  if (typeof window === 'undefined') {
    return null;
  }

  //외부 영역 클릭시 닫히도록
  const handleClickContainer = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      {createPortal(
        <div
          onClick={handleClickContainer}
          className='fixed top-0 right-0 left-0 bottom-0 flex items-center justify-center bg-black bg-opacity-30 z-50 '
        >
          {children}
        </div>,
        document.body
      )}
    </>
  );
}
