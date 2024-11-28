import React, { useRef, useState } from "react";
import styles from "./GenreSection.module.css";
import { register } from "swiper/element/bundle";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieCard from "../Card/Movie Card/MovieCard";

register();
import "swiper/css";

const GenreSection = ({ genre, movies }) => {
  const swiperRef = useRef(null);
  const [visibleIndices, setVisibleIndices] = useState([]);
  const [isFirstCardActive, setIsFirstCardActive] = useState(false); // Estado para o primeiro card
  const [isLastCardActive, setIsLastCardActive] = useState(false); // Estado para o último card

  const handleSlideChange = () => {
    if (swiperRef.current) {
      const swiper = swiperRef.current.swiper;
      const slidesPerView = Math.floor(swiper.params.slidesPerView || 6); // Número de slides visíveis
      const realIndex = swiper.realIndex; // Índice real para lidar com o loop
      const visibleSlides = Array.from(
        { length: slidesPerView },
        (_, i) => (realIndex + i) % movies.length // Garante que o índice respeite o loop
      );
      setVisibleIndices(visibleSlides); // Atualiza os índices visíveis
    }
  };

  return (
    <div className={styles.section}>
      <h2 className={styles.title}>{genre.name}</h2>
      <div className={styles.carousel}>
        <Swiper
          ref={swiperRef}
          slidesPerView={6.13}
          slidesPerGroup={5}
          loop={true}
          speed={1000}
          onSlideChange={handleSlideChange}
          onSwiper={handleSlideChange} // Atualiza na inicialização
          className={styles.swiper}
        >
          {/* Botão "Anterior" */}
          <button
            className={`${styles.customPrevButton} ${isFirstCardActive ? styles.hidden : ""
              }`}
            onClick={() => swiperRef.current.swiper.slidePrev()}
          >
            {"<"}
          </button>

          {/* Slides dos filmes */}
          {movies.map((movie, index) => {
            const isFirstVisible = visibleIndices[0] === index; // Primeiro card visível
            const isSecondLastVisible = visibleIndices.at(-2) === index; // Penúltimo card visível
            const isLastVisible = visibleIndices.at(-1) === index; // Último card visível

            return (
              <SwiperSlide className={styles.swiperSlide} key={index}>
                <MovieCard
                  id={movie.id}
                  title={movie.name}
                  genre={movie.primaryGenre}
                  rating={movie.rating}
                  imageUrl={movie.imageUrl}
                  synopsis={movie.synopsis} // Passa a sinopse
                  releaseDate={movie.releaseDate}
                  isFirstVisible={isFirstVisible}
                  isLastVisible={isLastVisible}
                  isSecondLastVisible={isSecondLastVisible}
                  setIsFirstCardActive={setIsFirstCardActive} // Callback para esconder o botão esquerdo
                  setIsLastCardActive={setIsLastCardActive} // Callback para esconder o botão direito
                />
              </SwiperSlide>
            );
          })}

          {/* Botão "Próximo" */}
          <button
            className={`${styles.customNextButton} ${isLastCardActive ? styles.hidden : ""
              }`}
            onClick={() => swiperRef.current.swiper.slideNext()}
          >
            {">"}
          </button>
        </Swiper>
      </div>
    </div>
  );
};

export default GenreSection;
