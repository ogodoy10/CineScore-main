import { useState, useEffect } from 'react';
import { getAllMovies, getTop10Movies }from '../services/movieService';

const useMovies = () => {
  const [movies, setMovies] = useState([]);
  const [top10Movies, setTop10Movies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const moviesData = await getAllMovies();
        setMovies(moviesData);
      } catch (err) {
        setError('Erro ao buscar filmes');
      } finally {
        setLoading(false);
      }
    };

    const fetchTop10Movies = async () => {
      try {
        const top10Data = await getTop10Movies();
        setTop10Movies(top10Data);
      } catch (err) {
        setError('Erro ao buscar top 10 filmes');
      }
    };

    fetchMovies();
    fetchTop10Movies();
  }, []);

  return { movies, top10Movies, loading, error };
};

export default useMovies;
