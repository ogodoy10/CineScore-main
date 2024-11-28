import React, { useState, useRef, useEffect } from "react";
import styles from "./CardBanner.module.css"

const Banner = ({ movie }) => {
  const [expanded, setExpanded] = useState(false); // Defina o limite de caracteres desejado
  const characterLimit = 650;

  // Função para alternar entre expandir ou reduzir o texto
  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  // Lógica para truncar o texto e adicionar reticências apenas quando o limite for atingido
  const truncatedSynopsis = movie.synopsis.length > characterLimit && !expanded
    ? `${movie.synopsis.slice(0, characterLimit)}...`
    : movie.synopsis;

  return (
    <div className={styles.bannerContainer}>
      <div className={styles.movieContainer}>
        <div className={styles.imageContainer} style={{ backgroundImage: `url(${movie.imageUrl})` }}></div>
        <div className={styles.textContainer}>
          <h2 className={styles.name}>{movie.name}</h2>
          <p className={styles.synopsis}>{truncatedSynopsis}</p>
          <div className={styles.ratingContainer}>
            <span className={styles.rating}>⭐ {movie.rating}</span>
            <button className={styles.classifyButton}>
              Classificar Filme
            </button>
          </div>
        </div>
      </div>
      <div className={styles.imageBackground} style={{ backgroundImage: `url(${movie.imageUrl})` }}/>
    </div>
  );
};

export default Banner;