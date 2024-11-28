// components/Card/Top10MovieCard.js
import React from 'react';
import styles from './MovieCardTop10.module.css'; 
import MovieCard from '../../Card/Movie Card/MovieCard';

const Top10MovieCard = ({ movie, rank }) => {
  return (
    <div className={styles.movieWrapper}>
      <span className={styles.rank}>{rank}</span>
      <MovieCard
        title={movie.name}
        genre={movie.primaryGenre}
        rating={movie.rating}
        imageUrl={movie.imageUrl}
        isTop10={true}
      />
    </div>
  );
};

export default Top10MovieCard;
