"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation"; // Para lidar com os parâmetros de pesquisa
import MovieCard from "../../components/Card/Movie Card/MovieCard"; // Importe o componente do card
import styles from "./Filmes.module.css";
import { searchMoviesByName } from "../../services/movieService"; // Função para buscar filmes

const FilmesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const searchParams = useSearchParams(); // Hook do Next.js
  const query = searchParams.get("query") || ""; // Pega o parâmetro `query` da URL

  useEffect(() => {
    if (query) {
      setLoading(true);
      searchMoviesByName(query)
        .then((data) => {
          setMovies(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Erro ao buscar filmes:", err);
          setError("Erro ao buscar filmes.");
          setLoading(false);
        });
    } else {
      setMovies([]);
      setLoading(false);
    }
  }, [query]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Resultados da Pesquisa</h1>
      {loading ? (
        <p className={styles.message}>Carregando...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : movies.length === 0 ? (
        <p className={styles.noResults}>Nenhum filme encontrado.</p>
      ) : (
        <div className={styles.grid}>
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              title={movie.name}
              genre={movie.primaryGenreName}
              rating={movie.rating}
              imageUrl={movie.imageUrl}
              synopsis={movie.synopsis}
              otherGenres={movie.otherGenreNames}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FilmesPage;
