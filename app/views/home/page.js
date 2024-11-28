// Home.js
"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import BannerCarousel from '../../components/Carrossel/Banner/CarrosselBanner';
import Top10Carousel from '../../components/Carrossel/Top 10/CarrosselTop10';
import GenreSection from '../../components/GenreSection/GenreSection';
import useGenresWithMovies from '../../hooks/useGenresWithMovies';
import useLatestMovies from '../../hooks/useLatestMovies';
import useTop10Movies from '../../hooks/useTop10Movies';
import useGenres from '../../hooks/useGenres';
import styles from './Home.module.css';
import Auth from '../authentication/Auth';

const Home = () => {
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);

  const openAuthModal = () => setAuthModalOpen(true);
  const closeAuthModal = () => setAuthModalOpen(false);

  useEffect(() => {
    if (isAuthModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isAuthModalOpen]);

  const { genresWithMovies, loading, error } = useGenresWithMovies();
  const { latestMovies, error: latestMoviesError } = useLatestMovies();
  const { top10Movies, error: top10MoviesError } = useTop10Movies();
  const { genres, loading: genresLoading, error: genresError } = useGenres();

  return (
    <div className={styles.container}>
      {isAuthModalOpen && <Auth onClose={closeAuthModal} />}

      <main className={styles.main}>
        <div className={styles.section1}>
          <Navbar openAuthModal={openAuthModal} /> {/* Adicionando o novo componente */}
        </div>

        {/* Carrossel de Destaque */}
        <div className={styles.section2}>
          <BannerCarousel banners={latestMovies} />
          {latestMoviesError && <div>Erro ao carregar filmes em destaque: {latestMoviesError}</div>}
        </div>

        {/* Carrossel Top 10 */}
        <div className={styles.section3}>
          <h1 className={styles.title}>Top 10</h1>
          <Top10Carousel className={styles.carrossel} movies={top10Movies} genres={genres} />
          {top10MoviesError && <div>Erro ao carregar Top 10 filmes: {top10MoviesError}</div>}
        </div>

        {/* Seções por Gênero */}
        {loading ? (
          <div>Carregando gêneros...</div>
        ) : (
          genresWithMovies.map(({ genre, movies }) => (
            <GenreSection key={genre.id} genre={genre} movies={movies} genres={genres} />
          ))
        )}
        {error && <div>Erro ao carregar gêneros e filmes: {error}</div>}
      </main>
    </div>
  );
};

export default Home;
