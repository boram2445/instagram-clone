'use client';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

export default function MultiCarousel({
  children,
}: {
  children: React.ReactNode;
}) {
  const responsive = {
    desktop: {
      breakpoint: { max: 4000, min: 576 },
      items: 7,
    },
    mobile: {
      breakpoint: { max: 576, min: 0 },
      items: 5,
    },
  };

  return (
    <Carousel responsive={responsive} className='w-full h-full'>
      {children}
    </Carousel>
  );
}
