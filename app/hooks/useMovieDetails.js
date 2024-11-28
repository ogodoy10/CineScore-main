import { useState, useEffect } from 'react';
import { getMovieById } from '../services/movieService';
import Movie from '../models/Movie';

const useMovieDetails = (movieId) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieData = await getMovieById(movieId);
        setMovie(new Movie(movieData)); // Cria uma instância de Movie para manipular mais facilmente os dados
      } catch (err) {
        console.error('Erro ao carregar detalhes do filme:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (movieId) {
      fetchMovieDetails();
    }
  }, [movieId]);

  return { movie, loading, error };
};

export default useMovieDetails;
