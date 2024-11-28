import { useState, useEffect } from 'react';
import { getMoviesByGenre } from '../services/movieService';
import Movie from '../models/Movie';

const useMoviesByGenre = (genreId) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!genreId) return;

    const fetchMovies = async () => {
      try {
        const data = await getMoviesByGenre(genreId);
        const moviesList = data.map(movieData => new Movie(movieData));
        setMovies(moviesList);
      } catch (err) {
        console.error(`Erro ao carregar filmes do gênero ${genreId}:`, err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [genreId]);

  return { movies, loading, error };
};

export default useMoviesByGenre;
