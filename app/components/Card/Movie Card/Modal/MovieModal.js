import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styles from "./MovieModal.module.css";
import { getMovieById } from "../../../../services/movieService";
import Comments from "./Comments/Comments";

const MovieModal = ({ movieId, onClose }) => {
    const [movieData, setMovieData] = useState(null);

    useEffect(() => {
        document.documentElement.style.overflow = "hidden";
        return () => {
            document.documentElement.style.overflow = "";
        };
    }, []);

    useEffect(() => {
        const fetchMovieData = async () => {
            try {
                const data = await getMovieById(movieId);
                setMovieData(data);
            } catch (error) {
                console.error("Erro ao buscar os dados do filme:", error);
            }
        };

        fetchMovieData();
    }, [movieId]);

    if (!movieData) {
        return ReactDOM.createPortal(
            <div className={styles.loader}>Carregando...</div>,
            document.getElementById("modal-root")
        );
    }

    return ReactDOM.createPortal(
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                {/* Botão de Fechar */}
                <button className={styles.closeButton} onClick={onClose}>
                    ✕
                </button>

                {/* Fundo Blur */}
                <div
                    className={styles.background}
                    style={{
                        backgroundImage: `url(${movieData.imageUrl})`,
                    }}
                ></div>
                {/* Div para o scrollableContent */}
                <div className={styles.scrollableContent}>

                    {/* Imagem do filme */}


                    {/* Div com o degradê contendo todas as informações */}
                    <div className={styles.detailsContainer}>
                        <div className={styles.imageContainer}>
                            <img
                                src={movieData.imageUrl}
                                alt={movieData.name}
                                className={styles.movieImage}
                            />
                        </div>
                        <div>
                            <h1 className={styles.detailsTitle}>{movieData.name}</h1>
                            <div className={styles.ratingSection}>
                                <span className={styles.averageRating}>★ {movieData.rating}</span>
                                <div className={styles.userRating}>
                                    ★ ★ ★ ★ ★
                                </div>
                            </div>

                        </div>

                        <div className={styles.synopsis}>
                            <h2>Sinopse</h2>
                            <p>{movieData.synopsis || "Sinopse não disponível."}</p>
                        </div>
                        <div className={styles.additionalDetails}>
                            <h2>Detalhes</h2>
                            <p>
                                <strong>Gêneros:</strong> {movieData.primaryGenre}
                                {movieData.otherGenres?.length > 0 &&
                                    `, ${movieData.otherGenres.join(", ")}`}
                            </p>
                            <p>
                                <strong>Elenco:</strong> {movieData.actors?.join(", ") || "Não disponível"}
                            </p>
                            <p>
                                <strong>Diretor:</strong> {movieData.director || "Não disponível"}
                            </p>
                            <p>
                                <strong>Lançamento:</strong> {movieData.releaseDate || "Não disponível"}
                            </p>
                        </div>
                        {/* Seção de Comentários */}
                        <Comments movieId={movieId} />
                    </div>
                </div>
            </div>
        </div>,
        document.getElementById("modal-root")
    );
};

export default MovieModal;
