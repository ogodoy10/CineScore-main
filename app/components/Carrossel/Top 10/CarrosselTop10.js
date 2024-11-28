// components/Carrossel/Top10Carousel.js
import React, { useRef, useState } from "react";
import styles from './CarrosselTop10.module.css';
import { register } from 'swiper/element/bundle';
import { Swiper, SwiperSlide } from 'swiper/react';
import Top10MovieCard from '../../Card/Card Top 10/MovieCardTop10';

register();
import 'swiper/css';

const Top10Carousel = ({ movies }) => {
  const extendedMovies = [...movies];
  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handleSlideChange = () => {
    if (swiperRef.current) {
      setIsBeginning(swiperRef.current.swiper.isBeginning);
      setIsEnd(swiperRef.current.swiper.isEnd);
    }
  };

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.carouselWrapper}>
        {!isBeginning && (
          <button
            className={styles.customPrevButton}
            onClick={() => swiperRef.current.swiper.slidePrev()}
          >
            {"<"}
          </button>
        )}
        <Swiper
          ref={swiperRef}
          slidesPerView={4}
          slidesPerGroup={3}
          speed={1000}
          onSlideChange={handleSlideChange}
          className={styles.swiper}
        >
          {extendedMovies.map((movie, index) => (
            <SwiperSlide key={movie.id}>
              <Top10MovieCard movie={movie} rank={index + 1} />
            </SwiperSlide>
          ))}
        </Swiper>
        {!isEnd && (
          <button
            className={styles.customNextButton}
            onClick={() => swiperRef.current.swiper.slideNext()}
          >
            {">"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Top10Carousel;
