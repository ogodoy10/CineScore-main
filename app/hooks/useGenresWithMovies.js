import { useState, useEffect } from 'react';
import { getAllGenres } from '../services/GenreService';
import { getMoviesByGenre } from '../services/movieService';
import Genre from '../models/Genre';
import Movie from '../models/Movie';

const useGenresWithMovies = () => {
  const [genresWithMovies, setGenresWithMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGenresAndMovies = async () => {
      try {
        const genresData = await getAllGenres();
        const genresList = genresData.map(genreData => new Genre(genreData));

        const genresWithMoviesData = await Promise.all(
          genresList.map(async (genre) => {
            const moviesData = await getMoviesByGenre(genre.id);
            const moviesList = moviesData.map(movieData => new Movie(movieData));
            return {
              genre,
              movies: moviesList,
            };
          })
        );

        setGenresWithMovies(genresWithMoviesData);
      } catch (err) {
        console.error('Erro ao carregar gêneros e seus filmes:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGenresAndMovies();
  }, []);

  return { genresWithMovies, loading, error };
};

export default useGenresWithMovies;
