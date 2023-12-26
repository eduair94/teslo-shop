'use client';
// Import Swiper React components
import { Swiper as SwiperObject } from 'swiper';
import { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import React, { FC, useState } from 'react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import { ProductImage } from '@/components';
import './slideshow.css';

interface Props {
  images: string[];
  title: string;
  className?: string;
}

export const ProductSlideShow: FC<Props> = ({ images, title, className }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();
  if (!images.length) images = [''];

  return (
    <div id="product-slideshow" className={className}>
      <Swiper
        style={
          {
            '--swiper-navigation-color': '#fff',
            '--swiper-pagination-color': '#fff',
          } as React.CSSProperties
        }
        spaceBetween={10}
        navigation={true}
        autoplay={{
          delay: 2000,
        }}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <ProductImage
              width={1024}
              height={800}
              src={image}
              alt={title}
              className="rounded-lg object-fill"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <ProductImage
              width={300}
              height={300}
              src={image}
              alt={title}
              className="rounded-lg object-fill"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
