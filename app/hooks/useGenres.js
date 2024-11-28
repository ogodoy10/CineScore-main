import { useState, useEffect } from 'react';
import { getAllGenres } from '../services/GenreService';
import Genre from '../models/Genre';

const useGenres = () => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const data = await getAllGenres();
        const genresList = data.map(genreData => new Genre(genreData));
        setGenres(genresList);
      } catch (err) {
        console.error('Erro ao carregar gêneros:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  return { genres, loading, error };
};

export default useGenres;
