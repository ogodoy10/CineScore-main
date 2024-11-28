import React from "react";
import styles from './CarrosselBanner.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import CardBanner from '../../Card/Banner/CardBanner';

const CarrosselBanner = ({ banners }) => {
  return (
    <div className={styles.carouselContainer}>
      <Swiper
        className={styles.swiper}
        slidesPerView={1}
        speed={1000}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={index}>
            <CardBanner movie={banner} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CarrosselBanner;
