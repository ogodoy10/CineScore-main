import { useState, useRef } from "react";
import MovieModal from "../Movie Card/Modal/MovieModal"; // Importa o MovieModal
import styles from "./MovieCard.module.css";

const MovieCard = ({
  id, // Adicionado para passar o ID do filme
  title,
  genre,
  rating,
  imageUrl,
  synopsis,
  releaseDate,
  isFirstVisible,
  isLastVisible,
  isSecondLastVisible,
  setIsFirstCardActive, // Callback para sinalizar o estado do primeiro card
  setIsLastCardActive, // Callback para sinalizar o estado do último card
}) => {
  const [active, setActive] = useState(false); // Controle de ampliação
  const [remove, setRemove] = useState(true); // Controle de visibilidade do conteúdo adicional
  const [isModalOpen, setIsModalOpen] = useState(false); // Controle do estado do modal
  const cardRef = useRef(null); // Referência do card para calcular posição
  const timeoutRef = useRef(0); // Gerencia o atraso da ampliação

  const truncateText = (text, maxLength) => {
    if (!text) return "Sinopse não disponível.";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const onMouseEnter = () => {
    clearTimeout(timeoutRef.current); // Limpa qualquer timeout ativo
    timeoutRef.current = setTimeout(() => {
      setActive(true); // Ativa a ampliação
      setRemove(false); // Exibe o conteúdo adicional
      if (isFirstVisible) {
        setIsFirstCardActive(true); // Marca o primeiro card como ativo
      }
      if (isLastVisible) {
        setIsLastCardActive(true); // Marca o último card como ativo
      }
    }, 500); // Atraso de 0.5 segundos antes de expandir
  };

  const onMouseLeave = () => {
    clearTimeout(timeoutRef.current); // Cancela o timeout ativo
    setActive(false); // Desativa a ampliação
    setRemove(true); // Esconde o conteúdo adicional
    if (isFirstVisible) {
      setIsFirstCardActive(false); // Desativa o estado do primeiro card
    }
    if (isLastVisible) {
      setIsLastCardActive(false); // Desativa o estado do último card
    }
    if (cardRef.current) {
      cardRef.current.style.left = ""; // Reseta o `left` ao fechar
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div
        ref={cardRef}
        className={`${styles.movieCard} ${active ? styles.expanded : ""} ${
          isFirstVisible
            ? styles.firstCard
            : isLastVisible
            ? styles.lastCard
            : isSecondLastVisible
            ? styles.secondLastCard
            : ""
        }`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {!remove && (
          <div className={styles.expandedContent}>
            <div
              className={styles.imageContainer}
              style={{ backgroundImage: `url(${imageUrl})` }}
            ></div>
            <div className={styles.detailsContainer}>
              <h3 className={styles.movieTitle}>{title}</h3>
              <p className={styles.movieDetails}>
                <span>{releaseDate || "Data desconhecida"}</span> |{" "}
                <span>{genre || "Gênero Desconhecido"}</span>
              </p>
              <p className={styles.movieSynopsis}>
                {truncateText(synopsis, 220)}
              </p>
              <button
                className={styles.viewMoreButton}
                onClick={() => openModal()}
              >
                Ver mais
              </button>
              <div className={styles.rating}>{rating || 0}</div>
            </div>
          </div>
        )}

        {!active && (
          <div className={styles.collapsedContent}>
            <div
              className={styles.imageContainer}
              style={{ backgroundImage: `url(${imageUrl})` }}
            ></div>
            <div className={styles.info}>
              <h3>{title}</h3>
              <div className={styles.details}>
                <span>★ {rating}</span>
                <span className={styles.separator}> | </span>
                <span>{genre || "Gênero Desconhecido"}</span>
              </div>
            </div>
          </div>
        )}
      </div>
      {isModalOpen && <MovieModal movieId={id} onClose={closeModal} />}
    </>
  );
};

export default MovieCard;
