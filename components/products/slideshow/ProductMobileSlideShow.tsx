'use client';
// Import Swiper React components
import { Autoplay, FreeMode, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import { FC } from 'react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import Image from 'next/image';
import './slideshow.css';

interface Props {
  images: string[];
  title: string;
  className?: string;
}

export const ProductMobileSlideShow: FC<Props> = ({
  images,
  title,
  className,
}) => {
  return (
    <div id="product-mobile-slideshow" className={className}>
      <Swiper
        autoplay={{
          delay: 2000,
        }}
        style={{
          width: '100vw',
          height: '500px',
        }}
        pagination
        modules={[FreeMode, Navigation, Autoplay, Pagination]}
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <Image
              width={1024}
              height={800}
              src={`/products/${image}`}
              alt={title}
              className="rounded-lg object-fill"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
